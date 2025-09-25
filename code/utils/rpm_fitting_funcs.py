import pymc as pm
import numpy as np
import pandas as pd


def get_theta_hier2(
    mu_g0,
    mu_h0,
    sigma_g0,
    sigma_h0,
    beta_g0,
    beta_h0,
    alpha0,
    delta_mu_g01,
    delta_mu_h01,
    delta_sigma_g01,
    delta_sigma_h01,
    delta_beta_g01,
    delta_beta_h01,
    time,
    congr,
    x1,
    sub_idx,
):
    # estimate theta - need time and congruency vector
    # transform to 0:1
    mu_g = pm.invlogit(mu_g0[sub_idx] + delta_mu_g01 * x1)
    mu_h = pm.invlogit(mu_h0[sub_idx] + delta_mu_h01 * x1)

    sigma_g = pm.invlogit(sigma_g0[sub_idx] + delta_sigma_g01 * x1)
    sigma_h = pm.invlogit(sigma_h0[sub_idx] + delta_sigma_h01 * x1)

    beta_g = pm.invlogit(beta_g0[sub_idx] + delta_beta_g01 * x1)
    beta_h = pm.invlogit(beta_h0[sub_idx] + delta_beta_h01 * x1)

    alpha = pm.invlogit(alpha0[sub_idx])

    # standardize time so can use invprobit function in pymc
    # no cumulative normal in pymc - only cumulative standard normal

    z_time_g = (time - mu_g) / sigma_g
    z_time_h = (time - mu_h) / sigma_h

    phi_g = pm.math.invprobit(z_time_g)  # Pr(g prep|time)
    phi_h = pm.math.invprobit(z_time_h)  # Pr(h prep|time)
    not_phi_g = 1 - phi_g  # Pr(g not prep|time)
    not_phi_h = 1 - phi_h  # Pr(h not prep|time)

    psi1 = not_phi_g * not_phi_h * alpha  # Pr(correct|h and g not prep)
    psi2 = pm.math.switch(
        congr > 0,  # Pr(correct|h prep, g not prep)
        not_phi_g * phi_h * beta_h,
        not_phi_g * phi_h * (1 - beta_h),
    )
    psi3 = phi_g * not_phi_h * beta_g  # Pr(correct|h not prep, g prep)
    psi4 = phi_g * phi_h * beta_g  # Pr(correct| h and g prep)

    theta = psi1 + psi2 + psi3 + psi4

    return theta


def fit_rpm2(dat_fit, cov="age_group0", draws=3000, tune=3000):
    sub_idxs, subjects = pd.factorize(dat_fit.participant)
    coords = {"subject": subjects, "obs_id": np.arange(len(sub_idxs))}

    with pm.Model(coords=coords) as rpm_h:
        # priors - from rpm stan code
        # get sub idxs
        sub_idx = pm.Data("sub_idx", sub_idxs, dims="obs_id")

        # group level means of interecepts and slopes
        mu_g_loc = pm.Normal("mu_g_loc", -1.0, 0.5)
        mu_h_loc = pm.Normal("mu_h_loc", -1.0, 0.5)
        sigma_g_loc = pm.Normal("sigma_g_loc", -2.0, 0.5)
        sigma_h_loc = pm.Normal("sigma_h_loc", -2.0, 0.5)
        beta_g_loc = pm.Normal("beta_g_loc", 2.0, 0.5)
        beta_h_loc = pm.Normal("beta_h_loc", 2.0, 0.5)
        alpha_loc = pm.Normal("alpha_loc", 0.0, 0.5)

        delta_mu_g_loc1 = pm.Normal("delta_mu_g_loc1", 0.0, 0.5)
        delta_mu_h_loc1 = pm.Normal("delta_mu_h_loc1", 0.0, 0.5)
        delta_sigma_g_loc1 = pm.Normal("delta_sigma_g_loc1", 0.0, 0.5)
        delta_sigma_h_loc1 = pm.Normal("delta_sigma_h_loc1", 0.0, 0.5)
        delta_beta_g_loc1 = pm.Normal("delta_beta_g_loc1", 0.0, 0.5)
        delta_beta_h_loc1 = pm.Normal("delta_beta_h_loc1", 0.0, 0.5)

        # group level sds of intercepts and slopes
        mu_g_scale = pm.HalfNormal("mu_g_scale", 0.5)
        mu_h_scale = pm.HalfNormal("mu_h_scale", 0.5)
        sigma_g_scale = pm.HalfNormal("sigma_g_scale", 0.5)
        sigma_h_scale = pm.HalfNormal("sigma_h_scale", 0.5)
        beta_g_scale = pm.HalfNormal("beta_g_scale", 0.5)
        beta_h_scale = pm.HalfNormal("beta_h_scale", 0.5)
        alpha_scale = pm.HalfNormal("alpha_scale", 0.5)

        # raw subject level priors on intercepts and slopes
        mu_g_raw = pm.Normal("mu_g_raw", 0.0, 1.0, dims="subject")
        mu_h_raw = pm.Normal("mu_h_raw", 0.0, 1.0, dims="subject")
        sigma_g_raw = pm.Normal("sigma_g_raw", 0.0, 1.0, dims="subject")
        sigma_h_raw = pm.Normal("sigma_h_raw", 0.0, 1.0, dims="subject")
        beta_g_raw = pm.Normal("beta_g_raw", 0.0, 1.0, dims="subject")
        beta_h_raw = pm.Normal("beta_h_raw", 0.0, 1.0, dims="subject")
        alpha_raw = pm.Normal("alpha_raw", 0.0, 1.0, dims="subject")

        # subject level priors on intercepts and slopes
        mu_g0 = pm.Deterministic("mu_g0", mu_g_raw * mu_g_scale + mu_g_loc, dims="subject")
        mu_h0 = pm.Deterministic("mu_h0", mu_h_raw * mu_h_scale + mu_h_loc, dims="subject")
        sigma_g0 = pm.Deterministic("sigma_g0", sigma_g_raw * sigma_g_scale + sigma_g_loc, dims="subject")
        sigma_h0 = pm.Deterministic("sigma_h0", sigma_h_raw * sigma_h_scale + sigma_h_loc, dims="subject")
        beta_g0 = pm.Deterministic("beta_g0", beta_g_raw * beta_g_scale + beta_g_loc, dims="subject")
        beta_h0 = pm.Deterministic("beta_h0", beta_h_raw * beta_h_scale + beta_h_loc, dims="subject")
        alpha0 = pm.Deterministic("alpha0", alpha_raw * alpha_scale + alpha_loc, dims="subject")

        # transformations
        theta = get_theta_hier2(
            mu_g0,
            mu_h0,
            sigma_g0,
            sigma_h0,
            beta_g0,
            beta_h0,
            alpha0,
            delta_mu_g_loc1,
            delta_mu_h_loc1,
            delta_sigma_g_loc1,
            delta_sigma_h_loc1,
            delta_beta_g_loc1,
            delta_beta_h_loc1,
            time=dat_fit["pt"].values,
            congr=dat_fit["congr"].values,
            x1=dat_fit[cov].values,
            sub_idx=sub_idx,
        )

        # likelihood
        y_obs = pm.Bernoulli("y_obs", theta, observed=dat_fit["accuracy"].values, dims="obs_id")

        fit = pm.sample(draws=draws, tune=tune, chains=4, target_accept=0.95)

    return fit


def get_theta_hier3(
    mu_g0,
    mu_h0,
    sigma_g0,
    sigma_h0,
    beta_g0,
    beta_h0,
    delta_mu_g01,
    delta_mu_h01,
    delta_sigma_g01,
    delta_sigma_h01,
    delta_beta_g01,
    delta_beta_h01,
    time,
    congr,
    x1,
    sub_idx,
):
    # estimate theta - need time and congruency vector
    # transform to 0:1
    mu_g = pm.invlogit(mu_g0[sub_idx] + delta_mu_g01 * x1)
    mu_h = pm.invlogit(mu_h0[sub_idx] + delta_mu_h01 * x1)

    sigma_g = pm.invlogit(sigma_g0[sub_idx] + delta_sigma_g01 * x1)
    sigma_h = pm.invlogit(sigma_h0[sub_idx] + delta_sigma_h01 * x1)

    beta_g = pm.invlogit(beta_g0[sub_idx] + delta_beta_g01 * x1)
    beta_h = pm.invlogit(beta_h0[sub_idx] + delta_beta_h01 * x1)

    alpha = 0.5

    # standardize time so can use invprobit function in pymc
    # no cumulative normal in pymc - only cumulative standard normal

    z_time_g = (time - mu_g) / sigma_g
    z_time_h = (time - mu_h) / sigma_h

    phi_g = pm.math.invprobit(z_time_g)  # Pr(g prep|time)
    phi_h = pm.math.invprobit(z_time_h)  # Pr(h prep|time)
    not_phi_g = 1 - phi_g  # Pr(g not prep|time)
    not_phi_h = 1 - phi_h  # Pr(h not prep|time)

    psi1 = not_phi_g * not_phi_h * alpha  # Pr(correct|h and g not prep)
    psi2 = pm.math.switch(
        congr > 0,  # Pr(correct|h prep, g not prep)
        not_phi_g * phi_h * beta_h,
        not_phi_g * phi_h * (1 - beta_h),
    )
    psi3 = phi_g * not_phi_h * beta_g  # Pr(correct|h not prep, g prep)
    psi4 = phi_g * phi_h * beta_g  # Pr(correct| h and g prep)

    theta = psi1 + psi2 + psi3 + psi4

    return theta


def fit_rpm3(dat_fit, cov="age_group0", draws=3000, tune=3000):
    sub_idxs, subjects = pd.factorize(dat_fit.participant)
    coords = {"subject": subjects, "obs_id": np.arange(len(sub_idxs))}

    with pm.Model(coords=coords) as rpm_h:
        # priors - from rpm stan code
        # get sub idxs
        sub_idx = pm.Data("sub_idx", sub_idxs, dims="obs_id")

        # group level means of interecepts and slopes
        mu_g_loc = pm.Normal("mu_g_loc", -1.0, 0.5)
        mu_h_loc = pm.Normal("mu_h_loc", -1.0, 0.5)
        sigma_g_loc = pm.Normal("sigma_g_loc", -2.0, 0.5)
        sigma_h_loc = pm.Normal("sigma_h_loc", -2.0, 0.5)
        beta_g_loc = pm.Normal("beta_g_loc", 2.0, 0.5)
        beta_h_loc = pm.Normal("beta_h_loc", 2.0, 0.5)

        delta_mu_g_loc1 = pm.Normal("delta_mu_g_loc1", 0.0, 0.5)
        delta_mu_h_loc1 = pm.Normal("delta_mu_h_loc1", 0.0, 0.5)
        delta_sigma_g_loc1 = pm.Normal("delta_sigma_g_loc1", 0.0, 0.5)
        delta_sigma_h_loc1 = pm.Normal("delta_sigma_h_loc1", 0.0, 0.5)
        delta_beta_g_loc1 = pm.Normal("delta_beta_g_loc1", 0.0, 0.5)
        delta_beta_h_loc1 = pm.Normal("delta_beta_h_loc1", 0.0, 0.5)

        # group level sds of intercepts and slopes
        mu_g_scale = pm.HalfNormal("mu_g_scale", 0.5)
        mu_h_scale = pm.HalfNormal("mu_h_scale", 0.5)
        sigma_g_scale = pm.HalfNormal("sigma_g_scale", 0.5)
        sigma_h_scale = pm.HalfNormal("sigma_h_scale", 0.5)
        beta_g_scale = pm.HalfNormal("beta_g_scale", 0.5)
        beta_h_scale = pm.HalfNormal("beta_h_scale", 0.5)

        # raw subject level priors on intercepts and slopes
        mu_g_raw = pm.Normal("mu_g_raw", 0.0, 1.0, dims="subject")
        mu_h_raw = pm.Normal("mu_h_raw", 0.0, 1.0, dims="subject")
        sigma_g_raw = pm.Normal("sigma_g_raw", 0.0, 1.0, dims="subject")
        sigma_h_raw = pm.Normal("sigma_h_raw", 0.0, 1.0, dims="subject")
        beta_g_raw = pm.Normal("beta_g_raw", 0.0, 1.0, dims="subject")
        beta_h_raw = pm.Normal("beta_h_raw", 0.0, 1.0, dims="subject")

        # subject level priors on intercepts and slopes
        mu_g0 = pm.Deterministic("mu_g0", mu_g_raw * mu_g_scale + mu_g_loc, dims="subject")
        mu_h0 = pm.Deterministic("mu_h0", mu_h_raw * mu_h_scale + mu_h_loc, dims="subject")
        sigma_g0 = pm.Deterministic("sigma_g0", sigma_g_raw * sigma_g_scale + sigma_g_loc, dims="subject")
        sigma_h0 = pm.Deterministic("sigma_h0", sigma_h_raw * sigma_h_scale + sigma_h_loc, dims="subject")
        beta_g0 = pm.Deterministic("beta_g0", beta_g_raw * beta_g_scale + beta_g_loc, dims="subject")
        beta_h0 = pm.Deterministic("beta_h0", beta_h_raw * beta_h_scale + beta_h_loc, dims="subject")

        # transformations
        theta = get_theta_hier3(
            mu_g0,
            mu_h0,
            sigma_g0,
            sigma_h0,
            beta_g0,
            beta_h0,
            delta_mu_g_loc1,
            delta_mu_h_loc1,
            delta_sigma_g_loc1,
            delta_sigma_h_loc1,
            delta_beta_g_loc1,
            delta_beta_h_loc1,
            time=dat_fit["pt"].values,
            congr=dat_fit["congr"].values,
            x1=dat_fit[cov].values,
            sub_idx=sub_idx,
        )

        # likelihood
        y_obs = pm.Bernoulli("y_obs", theta, observed=dat_fit["accuracy"].values, dims="obs_id")

        fit = pm.sample(draws=draws, tune=tune, chains=4, target_accept=0.95)

    return fit
