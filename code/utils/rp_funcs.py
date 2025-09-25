import arviz as az
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy import stats as st


def sw_smooth(dat, x, y, lb=0, ub=1000, width=100, sub=False, sub_col="participant", func="mean"):
    # dat should be pd dataframe
    # x should be PT
    # y usually accuracy but can be parameters
    # if sub==True: first smooth over each subject and then average over those
    # vincentizing

    # returns smoothed

    if sub:
        for j in dat[sub_col].unique():
            dat_sub = dat[dat[sub_col] == j]
            sw_sub = np.array([])
            for i in range(lb, ub + 1, 1):
                lower = i - (width / 2)
                upper = i + (width / 2)

                win = dat_sub.loc[(dat_sub[x] <= upper) & (dat_sub[x] >= lower)]

                sw_sub = np.append(sw_sub, win[y].mean())

            if j == dat[sub_col].unique()[0]:
                sw0 = sw_sub
            else:
                sw0 = np.column_stack((sw0, sw_sub))

        if func == "mean":
            sw = np.nanmean(sw0, axis=1)
        elif func == "sem":
            sw = np.nanstd(sw0, axis=1) / np.sqrt(len(dat[sub_col].unique()))
        else:
            return print("Specify mean or sem as a string for function to apply to sliding window")

    else:
        sw0 = np.array([])
        for i in range(lb, ub + 1, 1):
            lower = i - (width / 2)
            upper = i + (width / 2)

            win = dat.loc[(dat[x] <= upper) & (dat[x] >= lower)]

            if func == "mean":
                sw0 = np.append(sw0, win[y].mean())
            elif func == "sem":
                sw0 = np.append(sw0, win[y].sem())
            else:
                return print("Specify mean or sem as a string for function to apply to sliding window")
        sw = sw0

    return sw


def sw_smooth_sim(dat, width=100, func="mean"):
    # smooth over predicted values
    # input is 2d array (number of timepoints are the rows and simmed values are columns)
    # smooths over these predictions
    # better for comparing to smoothed behavior
    # output is smoothed values
    sw = np.array([])
    sw_lo = np.array([])
    sw_hi = np.array([])
    for i in range(len(dat)):
        if 0 <= i - (width / 2):
            lower = i - (width / 2)
        else:
            lower = 0

        if len(dat) >= i + (width / 2):
            upper = i + (width / 2)
        else:
            upper = len(dat)

        win = dat[int(lower) : int(upper),]

        if func == "mean":
            sw = np.append(sw, np.mean(win))
        elif func == "sem":
            sw = np.append(sw, np.std(win, ddof=1) / np.sqrt(np.size(win)))
        elif func == "sd":
            sw = np.append(sw, np.std(win, ddof=1))
        elif func == "CI":
            sw_lo = np.append(sw_lo, np.quantile(win, 0.025))
            sw_hi = np.append(sw_hi, np.quantile(win, 0.975))
        else:
            return print("Specify function as a string for function to apply to sliding window")

    if func == "CI":
        return sw_lo, sw_hi
    else:
        return sw


def sw_behav(dat, x="PT", y="accuracy", cond=[], values=[], lb=0, ub=1000, width=100, sub=False, sub_col="participant"):
    # runs sliding window on accuracy over time and returns dataframe for plotting different conditions
    # conditions are column names in df and values are the way they are split
    #   e.g. cond=['congr'], values=[0.5,-0.5]
    #   or for 2 cond: cond=['congr','age_group'] values=[[-0.5, 0.5], ['OA', 'YA']]

    plot_dict = {}

    # if plotting raw timecourse
    if len(cond) == 0:
        acc = sw_smooth(dat, x=x, y=y, lb=lb, ub=ub, width=width, sub=sub, sub_col=sub_col)
        acc_sem = sw_smooth(dat, x=x, y=y, lb=lb, ub=ub, width=width, sub=sub, sub_col=sub_col, func="sem")

        plot_dict["acc"] = acc
        plot_dict["acc (sem)"] = acc_sem

    # if comparing just congruency (or 1 condition)
    if len(cond) == 1:
        for i in values:
            dat10 = dat[dat[cond[0]] == i]
            acc = sw_smooth(dat10, x=x, y=y, lb=lb, ub=ub, width=width, sub=sub, sub_col=sub_col)
            acc_sem = sw_smooth(dat10, x=x, y=y, lb=lb, ub=ub, width=width, sub=sub, sub_col=sub_col, func="sem")

            label = cond[0] + "=" + str(i)
            label_sem = cond[0] + "=" + str(i) + " (sem)"

            plot_dict[label] = acc
            plot_dict[label_sem] = acc_sem

    # if comparing 2 conditions (can extend to more but this was just for what i wanted to plot)
    if len(cond) == 2:
        for i in values[0]:
            dat10 = dat[dat[cond[0]] == i]
            for j in values[1]:
                dat1 = dat10[dat10[cond[1]] == j]
                acc = sw_smooth(dat1, x=x, y=y, lb=lb, ub=ub, width=width, sub=sub, sub_col=sub_col)
                acc_sem = sw_smooth(dat1, x=x, y=y, lb=lb, ub=ub, width=width, sub=sub, sub_col=sub_col, func="sem")

                label = cond[0] + "=" + str(i) + " & " + cond[1] + "=" + str(j)
                label_sem = cond[0] + "=" + str(i) + " & " + cond[1] + "=" + str(j) + " (sem)"

                plot_dict[label] = acc
                plot_dict[label_sem] = acc_sem

    plot_dict["PT"] = list(range(lb, ub + 1))

    return pd.DataFrame(plot_dict)


def behav_plot(
    data,
    time="PT",
    cond=["congr=0.5", "congr=0.5 (sem)", "congr=-0.5", "congr=-0.5 (sem)"],
    color=["tab:blue", "tab:orange"],
    labels=["congruent", "incongruent"],
    band=True,
    alpha=1,
    ax=None,
):
    # plotting function for sliding window of behavior over time
    # takes pd dataframe from sw_con
    # time specifies time vector in df
    # cond specifies conditions as they are labeled in df
    #
    # color specifies color for each label
    # labels are the number of conditions and label for each line

    ax = ax or plt.gca()

    for i in range(len(labels)):
        ax.plot(data[time], data[cond[2 * i]], label=labels[i], color=color[i], alpha=alpha)
        if band:
            ax.plot(data[time], data[cond[2 * i]] - data[cond[2 * i + 1]], color=color[i], alpha=0.1)
            ax.plot(data[time], data[cond[2 * i]] + data[cond[2 * i + 1]], color=color[i], alpha=0.1)
            ax.fill_between(
                data[time],
                data[cond[2 * i]] - data[cond[2 * i + 1]],
                data[cond[2 * i]] + data[cond[2 * i + 1]],
                color=color[i],
                alpha=0.2,
            )

    # ax.set_xlabel('PT')
    ax.set_ylabel("accuracy")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.legend(fontsize="x-small")

    return ax


def sim_plot(t, mean_sim, lo_sim, hi_sim, label, color, alpha=1, linestyle="-", band=True, ax=None):
    # plot simmed smooth curve
    # from sw_smooth_sim

    # ax=ax or plt.gca()

    ax.plot(t, mean_sim, label=label, color=color, linestyle=linestyle, alpha=alpha)
    if band is True:
        ax.plot(t, lo_sim, color=color, alpha=alpha / 10)
        ax.plot(t, hi_sim, color=color, alpha=alpha / 10)
        ax.fill_between(t, lo_sim, hi_sim, color=color, alpha=alpha / 5)

    return ax


def behav_split(behav, cond="", values=[]):
    # cond should be string specifying whichever condition was passed to sw_behav
    # values should say how cond was split
    #   first should be the value coded as low in the model (x=-0.5), second should be high (x=0.5)
    #   should be the same cond as whatever was smoothed over
    # congruency has to be coded as I=-0.5, C=0.5
    # congruency has to be first cond in smoothed behavior

    lo_string = f"{cond}={values[0]}"
    hi_string = f"{cond}={values[1]}"

    behav_lo = behav[
        [
            f"congr=-0.5 & {lo_string}",
            f"congr=-0.5 & {lo_string} (sem)",
            f"congr=0.5 & {lo_string}",
            f"congr=0.5 & {lo_string} (sem)",
            "PT",
        ]
    ]
    behav_hi = behav[
        [
            f"congr=-0.5 & {hi_string}",
            f"congr=-0.5 & {hi_string} (sem)",
            f"congr=0.5 & {hi_string}",
            f"congr=0.5 & {hi_string} (sem)",
            "PT",
        ]
    ]

    return behav_lo, behav_hi


def behav_plot2(
    data,
    time="PT",
    cond=["congr=0.5", "congr=0.5 (sem)", "congr=-0.5", "congr=-0.5 (sem)"],
    color=["tab:blue", "tab:orange"],
    labels=["congruent", "incongruent"],
    ls="-",
    band=True,
    alpha=1,
    ax=None,
):
    # plotting function for sliding window of behavior over time
    # takes pd dataframe from sw_con
    # time specifies time vector in df
    # cond specifies conditions as they are labeled in df
    #
    # color specifies color for each label
    # labels are the number of conditions and label for each line

    for i in range(len(labels)):
        ax.plot(data[time], data[cond[2 * i]], label=labels[i], ls=ls, color=color[i], alpha=alpha)
        if band:
            ax.plot(data[time], data[cond[2 * i]] - data[cond[2 * i + 1]], color=color[i], alpha=0.1)
            ax.plot(data[time], data[cond[2 * i]] + data[cond[2 * i + 1]], color=color[i], alpha=0.1)
            ax.fill_between(
                data[time],
                data[cond[2 * i]] - data[cond[2 * i + 1]],
                data[cond[2 * i]] + data[cond[2 * i + 1]],
                color=color[i],
                alpha=0.2,
            )

    # ax.set_xlabel('PT')
    ax.set_ylabel("accuracy")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.legend(fontsize="x-small")

    return ax


def inv_logit(p):
    # inverse logit function
    return np.exp(p) / (1 + np.exp(p))


def rpm2_pred(t, mu_g, mu_h, sigma_g, sigma_h, beta_g, beta_h, alpha):
    # predicted accuracy given parameters for conflict model
    # returns both incongruent and congruent
    phi_g = st.norm.cdf(t, loc=mu_g, scale=sigma_g)  # Pr(prep g|time)
    phi_h = st.norm.cdf(t, loc=mu_h, scale=sigma_h)  # Pr(prep h|time)
    not_phi_g = 1 - phi_g  # Pr(not prep|time)
    not_phi_h = 1 - phi_h  # Pr(not prep|time)

    psi1 = not_phi_g * not_phi_h * alpha  # Pr(correct|h and g not prepped)
    psi2_incon = not_phi_g * phi_h * (1 - beta_h)
    psi2_congr = not_phi_g * phi_h * beta_h  # Pr(correct|h prep, g not prep)
    psi3 = phi_g * not_phi_h * beta_g  # Pr(correct|h not prep, g prep)
    psi4 = phi_g * phi_h * beta_g  # Pr(correct| h and g prep)

    theta_incon = psi1 + psi2_incon + psi3 + psi4
    theta_congr = psi1 + psi2_congr + psi3 + psi4

    return theta_incon, theta_congr


def post_pred_sim2(
    fit,
    t,
    x,
    n=500,
    hier=False,
    fixed_alpha=False,
    flatten=True,
    group_diff_only=False,
    par="",
    par_diffs={"mu_g": True, "mu_h": True, "sigma_g": True, "sigma_h": True, "beta_g": True, "beta_h": True},
):
    # sim based off of parameter esimates
    # randomly picks n values from all draws and sims n curves
    # t is time vector
    # x is covariate value (scalar)
    # n is number of sims
    # hier if hierarchical model. Will sim curves for all subs
    # flatten if want to average over subjects
    # flatten=False will return 3d mat (n sims x timpoints x n subs)

    post = fit.posterior
    m_hold = len(np.concatenate(inv_logit(post["mu_g_loc"]).values))
    samps = np.random.choice(np.arange(m_hold), n)

    if hier:
        post_subs = post.subject.values
        post_i1 = np.zeros((len(post_subs), len(samps), len(t)))
        post_c1 = np.zeros((len(post_subs), len(samps), len(t)))
        for idx, sub in enumerate(post_subs):
            if par_diffs["mu_g"] is False:
                mu_g0 = np.concatenate(inv_logit(post["mu_g0"][:, :, idx]).values)
            elif par_diffs["mu_g"] is True and group_diff_only is True:
                mu_g0 = np.concatenate(
                    inv_logit(post["mu_g0"][:, :, idx] + post["delta_mu_g_loc" + str(par)] * x).values
                )
            else:
                mu_g0 = np.concatenate(
                    inv_logit(post["mu_g0"][:, :, idx] + post["delta_mu_g0" + str(par)][:, :, idx] * x).values
                )

            if par_diffs["mu_h"] is False:
                mu_h0 = np.concatenate(inv_logit(post["mu_h0"][:, :, idx]).values)
            elif par_diffs["mu_h"] and group_diff_only:
                mu_h0 = np.concatenate(
                    inv_logit(post["mu_h0"][:, :, idx] + post["delta_mu_h_loc" + str(par)] * x).values
                )
            else:
                mu_h0 = np.concatenate(
                    inv_logit(post["mu_h0"][:, :, idx] + post["delta_mu_h0" + str(par)][:, :, idx] * x).values
                )

            if not par_diffs["sigma_g"]:
                sigma_g0 = np.concatenate(inv_logit(post["sigma_g0"][:, :, idx]).values)
            elif par_diffs["sigma_g"] and group_diff_only:
                sigma_g0 = np.concatenate(
                    inv_logit(post["sigma_g0"][:, :, idx] + post["delta_sigma_g_loc" + str(par)] * x).values
                )
            else:
                sigma_g0 = np.concatenate(
                    inv_logit(post["sigma_g0"][:, :, idx] + post["delta_sigma_g0" + str(par)][:, :, idx] * x).values
                )

            if not par_diffs["sigma_h"]:
                sigma_h0 = np.concatenate(inv_logit(post["sigma_h0"][:, :, idx]).values)
            elif par_diffs["sigma_h"] and group_diff_only:
                sigma_h0 = np.concatenate(
                    inv_logit(post["sigma_h0"][:, :, idx] + post["delta_sigma_h_loc" + str(par)] * x).values
                )
            else:
                sigma_h0 = np.concatenate(
                    inv_logit(post["sigma_h0"][:, :, idx] + post["delta_sigma_h0" + str(par)][:, :, idx] * x).values
                )

            if not par_diffs["beta_g"]:
                beta_g0 = np.concatenate(inv_logit(post["beta_g0"][:, :, idx]).values)
            elif par_diffs["beta_g"] and group_diff_only:
                beta_g0 = np.concatenate(
                    inv_logit(post["beta_g0"][:, :, idx] + post["delta_beta_g_loc" + str(par)] * x).values
                )
            else:
                beta_g0 = np.concatenate(
                    inv_logit(post["beta_g0"][:, :, idx] + post["delta_beta_g0" + str(par)][:, :, idx] * x).values
                )

            if not par_diffs["beta_h"]:
                beta_h0 = np.concatenate(inv_logit(post["beta_h0"][:, :, idx]).values)
            elif par_diffs["beta_h"] and group_diff_only:
                beta_h0 = np.concatenate(
                    inv_logit(post["beta_h0"][:, :, idx] + post["delta_beta_h_loc" + str(par)] * x).values
                )
            else:
                beta_h0 = np.concatenate(
                    inv_logit(post["beta_h0"][:, :, idx] + post["delta_beta_h0" + str(par)][:, :, idx] * x).values
                )
            if fixed_alpha:
                alpha0 = np.repeat(0.5, m_hold)
            else:
                alpha0 = np.concatenate(inv_logit(post["alpha0"][:, :, idx]).values)

            post_i0, post_c0 = rpm2_pred(
                t,
                mu_g=mu_g0[samps].reshape(-1, 1),
                sigma_g=sigma_g0[samps].reshape(-1, 1),
                mu_h=mu_h0[samps].reshape(-1, 1),
                sigma_h=sigma_h0[samps].reshape(-1, 1),
                beta_g=beta_g0[samps].reshape(-1, 1),
                beta_h=beta_h0[samps].reshape(-1, 1),
                alpha=alpha0[samps].reshape(-1, 1),
            )

            post_i1[idx, :, :] = post_i0
            post_c1[idx, :, :] = post_c0

        if flatten:
            post_i = np.mean(post_i1, axis=0)
            post_c = np.mean(post_c1, axis=0)

    else:
        if not par_diffs["mu_g"]:
            mu_g0 = np.concatenate(inv_logit(post["mu_g_loc"]).values)
        else:
            mu_g0 = np.concatenate(inv_logit(post["mu_g_loc"] + post["delta_mu_g_loc" + str(par)] * x).values)
        if not par_diffs["mu_h"]:
            mu_h0 = np.concatenate(inv_logit(post["mu_h_loc"]).values)
        else:
            mu_h0 = np.concatenate(inv_logit(post["mu_h_loc"] + post["delta_mu_h_loc" + str(par)] * x).values)
        if not par_diffs["sigma_g"]:
            sigma_g0 = np.concatenate(inv_logit(post["sigma_g_loc"]).values)
        else:
            sigma_g0 = np.concatenate(inv_logit(post["sigma_g_loc"] + post["delta_sigma_g_loc" + str(par)] * x).values)

        if not par_diffs["sigma_h"]:
            sigma_h0 = np.concatenate(inv_logit(post["sigma_h_loc"]).values)
        else:
            sigma_h0 = np.concatenate(inv_logit(post["sigma_h_loc"] + post["delta_sigma_h_loc" + str(par)] * x).values)

        if not par_diffs["beta_g"]:
            beta_g0 = np.concatenate(inv_logit(post["beta_g_loc"]).values)
        else:
            beta_g0 = np.concatenate(inv_logit(post["beta_g_loc"] + post["delta_beta_g_loc" + str(par)] * x).values)

        if not par_diffs["beta_h"]:
            beta_h0 = np.concatenate(inv_logit(post["beta_h_loc"]).values)
        else:
            beta_h0 = np.concatenate(inv_logit(post["beta_h_loc"] + post["delta_beta_h_loc" + str(par)] * x).values)
        if fixed_alpha:
            alpha0 = np.repeat(0.5, m_hold)
        else:
            alpha0 = np.concatenate(inv_logit(post["alpha_loc"]).values)

        post_i, post_c = rpm2_pred(
            t,
            mu_g=mu_g0[samps].reshape(-1, 1),
            sigma_g=sigma_g0[samps].reshape(-1, 1),
            mu_h=mu_h0[samps].reshape(-1, 1),
            sigma_h=sigma_h0[samps].reshape(-1, 1),
            beta_g=beta_g0[samps].reshape(-1, 1),
            beta_h=beta_h0[samps].reshape(-1, 1),
            alpha=alpha0[samps].reshape(-1, 1),
        )

    return post_i, post_c


def post_pred_plot(
    fit,
    behav,
    t,
    n=500,
    hier=False,
    fixed_alpha=False,
    group_diff_only=False,
    par_diffs={"mu_g": True, "mu_h": True, "sigma_g": True, "sigma_h": True, "beta_g": True, "beta_h": True},
    par="",
    post_pred=True,
    plot_behav=False,
    ls="-",
    band=True,
    smooth=True,
    cond="",
    values=[],
    labels=[],
    colors=["orange", "cornflowerblue", "orangered", "blue"],
    ax=None,
):
    # posterior prediction plotting function
    # given fit and behavior (smoothed behavior), plots post pred
    # fit: model object
    # behav: smoothed behavior
    # mu_diff, sigma_diff, beta_diff: True if parameter was allowed to vary for a condition. False otherwise
    # par: if there are multiple regressors, specify which one here. If not just leave as an empty string
    # post_pred: True if overlaying behavior and predictions, false if just plotting predictions
    # plot_behav: True if overlaying behavior on full prediction (messy). False otherwise
    # ls: linestyle for behavior when post_pred=True
    # band: True if plotting SEM for behavior (messy with predictions). False otherwise
    # smooth: True if smoothing over predicted behavior. False otherwise
    # cond: string specifying whichever condition was passed to sw_behav
    # leave as an empty string if no covariates in the model (no deltas). This is the default
    # values: list of values for how cond was split
    #   first should be the value coded as low in the model (x=-0.5), second should be high (x=0.5)
    #   should be the same cond as whatever was smoothed over
    #   no need to specify (just leave as default) if cond is not specified
    # labels: for labeling plots or lines when there are multiple conditions.
    #   Position in list should align with values/cond

    # get predictions
    if cond:
        # if looking at differences
        # can input separate fits here if needed
        if isinstance(fit, list):
            post_ilo, post_clo = post_pred_sim2(
                fit=fit[0],
                t=t,
                x=-0.5,
                n=n,
                hier=hier,
                fixed_alpha=fixed_alpha,
                group_diff_only=group_diff_only,
                par_diffs=par_diffs,
                par=par,
            )
            post_ihi, post_chi = post_pred_sim2(
                fit=fit[1], t=t, x=0.5, n=n, fixed_alpha=fixed_alpha, par_diffs=par_diffs, par=par
            )
        else:
            post_ilo, post_clo = post_pred_sim2(
                fit=fit,
                t=t,
                x=-0.5,
                n=n,
                hier=hier,
                fixed_alpha=fixed_alpha,
                group_diff_only=group_diff_only,
                par_diffs=par_diffs,
                par=par,
            )
            post_ihi, post_chi = post_pred_sim2(
                fit=fit,
                t=t,
                x=0.5,
                n=n,
                hier=hier,
                fixed_alpha=fixed_alpha,
                group_diff_only=group_diff_only,
                par_diffs=par_diffs,
                par=par,
            )
    else:
        # if no deltas
        post_ilo, post_clo = post_pred_sim2(
            fit=fit,
            t=t,
            x=0,
            n=n,
            hier=hier,
            fixed_alpha=fixed_alpha,
            group_diff_only=group_diff_only,
            par_diffs=par_diffs,
            par=par,
        )

    sm_ilo0 = np.mean(post_ilo, axis=0)
    sm_clo0 = np.mean(post_clo, axis=0)

    sm_ilo_lo0 = np.quantile(post_ilo, q=0.025, axis=0)
    sm_ilo_hi0 = np.quantile(post_ilo, q=0.975, axis=0)
    sm_clo_lo0 = np.quantile(post_clo, q=0.025, axis=0)
    sm_clo_hi0 = np.quantile(post_clo, q=0.975, axis=0)

    sm_ilo_lo = sm_ilo_lo0 - sm_ilo0
    sm_ilo_hi = sm_ilo_hi0 - sm_ilo0
    sm_clo_lo = sm_clo_lo0 - sm_clo0
    sm_clo_hi = sm_clo_hi0 - sm_clo0
    if cond:
        sm_ihi0 = np.mean(post_ihi, axis=0)
        sm_chi0 = np.mean(post_chi, axis=0)

        sm_ihi_lo0 = np.quantile(post_ihi, q=0.025, axis=0)
        sm_ihi_hi0 = np.quantile(post_ihi, q=0.975, axis=0)
        sm_chi_lo0 = np.quantile(post_chi, q=0.025, axis=0)
        sm_chi_hi0 = np.quantile(post_chi, q=0.975, axis=0)

        sm_ihi_lo = sm_ihi_lo0 - sm_ihi0
        sm_ihi_hi = sm_ihi_hi0 - sm_ihi0
        sm_chi_lo = sm_chi_lo0 - sm_chi0
        sm_chi_hi = sm_chi_hi0 - sm_chi0
    if smooth:
        # smooth over predictions
        # cov =-0.5:
        sm_ilo = sw_smooth_sim(np.transpose(post_ilo))
        sm_clo = sw_smooth_sim(np.transpose(post_clo))
        # cov = 0.5:
        if cond:  # only get this if there is a condition
            sm_ihi = sw_smooth_sim(np.transpose(post_ihi))
            sm_chi = sw_smooth_sim(np.transpose(post_chi))
    else:
        # no smoothing. Just taking the mean and getting the 90CI
        sm_ilo = sm_ilo0
        sm_clo = sm_clo0

        if cond:  # only get this if there is a condition
            sm_ihi = sm_ihi0
            sm_chi = sm_chi0

    # behavior split for plotting:
    # only necessary if there is a condition
    if cond:
        behav_lo, behav_hi = behav_split(behav, cond=cond, values=values)
        l2 = behav_lo.columns.to_list()
        l3 = behav_hi.columns.to_list()
    else:
        l2 = behav.columns.to_list()

    if post_pred:
        if cond:
            ax[0].title.set_text(labels[0])
            behav_plot2(
                behav_lo,
                cond=l2[0:5],
                color=[colors[0], colors[1]],
                labels=["behav, incongr", "behav, congr"],
                ls=ls,
                band=band,
                ax=ax[0],
            )
            sim_plot(
                t * 1000,
                sm_ilo,
                sm_ilo_lo + sm_ilo,
                sm_ilo_hi + sm_ilo,
                label="pred, incongr",
                color=colors[0],
                ax=ax[0],
            )
            sim_plot(
                t * 1000, sm_clo, sm_clo_lo + sm_clo, sm_clo_hi + sm_clo, label="pred, congr", color=colors[1], ax=ax[0]
            )
            ax[1].title.set_text(labels[1])
            behav_plot2(
                behav,
                cond=l3[0:5],
                color=[colors[2], colors[3]],
                labels=["behav, incongr", "behav, congr"],
                ls=ls,
                band=band,
                ax=ax[1],
            )
            sim_plot(
                t * 1000,
                sm_ihi,
                sm_ihi_lo + sm_ihi,
                sm_ihi_hi + sm_ihi,
                label="pred, incongr",
                color=colors[2],
                ax=ax[1],
            )
            sim_plot(
                t * 1000, sm_chi, sm_chi_lo + sm_chi, sm_chi_hi + sm_chi, label="pred, congr", color=colors[3], ax=ax[1]
            )
            ax[1].set_xlabel("PT")
        else:
            behav_plot2(
                behav,
                cond=l2[0:5],
                color=[colors[0], colors[1]],
                labels=["behav, incongr", "behav, congr"],
                ls=ls,
                band=band,
                ax=ax,
            )
            sim_plot(
                t * 1000, sm_ilo, sm_ilo_lo + sm_ilo, sm_ilo_hi + sm_ilo, label="pred, incongr", color=colors[0], ax=ax
            )
            sim_plot(
                t * 1000, sm_clo, sm_clo_lo + sm_clo, sm_clo_hi + sm_clo, label="pred, congr", color=colors[1], ax=ax
            )
            ax.set_xlabel("PT")

    else:
        if plot_behav:
            behav_plot2(
                behav_lo,
                cond=l2[0:5],
                color=[colors[0], colors[1]],
                labels=["behav, incongr", "behav, congr"],
                ls="--",
                band=False,
                ax=ax,
            )
            behav_plot2(
                behav_hi,
                cond=l3[0:5],
                color=[colors[2], colors[3]],
                labels=["behav, incongr", "behav, congr"],
                ls="--",
                band=False,
                ax=ax,
            )
        if cond:
            sim_plot(
                t * 1000,
                sm_ilo,
                sm_ilo_lo + sm_ilo,
                sm_ilo_hi + sm_ilo,
                ax=ax,
                label=labels[0] + ", incongr",
                color=colors[0],
            )
            sim_plot(
                t * 1000,
                sm_clo,
                sm_clo_lo + sm_clo,
                sm_clo_hi + sm_clo,
                ax=ax,
                label=labels[0] + ", congr",
                color=colors[1],
            )
            sim_plot(
                t * 1000,
                sm_ihi,
                sm_ihi_lo + sm_ihi,
                sm_ihi_hi + sm_ihi,
                ax=ax,
                label=labels[1] + ", incongr",
                color=colors[2],
            )
            sim_plot(
                t * 1000,
                sm_chi,
                sm_chi_lo + sm_chi,
                sm_chi_hi + sm_chi,
                ax=ax,
                label=labels[1] + ", congr",
                color=colors[3],
            )
        else:
            sim_plot(
                t * 1000,
                sm_ilo,
                sm_ilo_lo + sm_ilo,
                sm_ilo_hi + sm_ilo,
                ax=ax,
                label=labels[0] + "incongr",
                color=colors[0],
            )
            sim_plot(
                t * 1000,
                sm_clo,
                sm_clo_lo + sm_clo,
                sm_clo_hi + sm_clo,
                ax=ax,
                label=labels[0] + "congr",
                color=colors[1],
            )
        ax.set_xlabel("time")
        ax.set_ylabel("accuracy")
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
        ax.legend(fontsize="x-small")

    return ax


def get_dist(fit, t, par="", x=0.5, sigma=True, diff=True):
    # for getting response preparation distributions for parameters
    # fit: model object
    # t: time grid
    # par: if there are multiple regressors, specify which one here. If not just leave as an empty string
    # x: abs coded value (probably 0.5)
    # diff: True if looking at change in distributions (covariate in model). False otherwise
    if diff:
        if isinstance(fit, list):
            post_lo = fit[0].posterior
            post_hi = fit[1].posterior

            lo_mu_g = inv_logit(post_lo["mu_g_loc"])
            hi_mu_g = inv_logit(post_hi["mu_g_loc"])

            lo_mu_h = inv_logit(post_lo["mu_h_loc"])
            hi_mu_h = inv_logit(post_hi["mu_h_loc"])

            lo_sigma_g = inv_logit(post_lo["sigma_g_loc"])
            hi_sigma_g = inv_logit(post_hi["sigma_g_loc"])

            lo_sigma_h = inv_logit(post_lo["sigma_h_loc"])
            hi_sigma_h = inv_logit(post_hi["sigma_h_loc"])

        else:
            post = fit.posterior

            lo_mu_g = inv_logit(post["mu_g_loc"] + post["delta_mu_g_loc" + str(par)] * (-1 * x))
            hi_mu_g = inv_logit(post["mu_g_loc"] + post["delta_mu_g_loc" + str(par)] * x)

            lo_mu_h = inv_logit(post["mu_h_loc"] + post["delta_mu_h_loc" + str(par)] * (-1 * x))
            hi_mu_h = inv_logit(post["mu_h_loc"] + post["delta_mu_h_loc" + str(par)] * x)

            if sigma:
                lo_sigma_g = inv_logit(post["sigma_g_loc"] + post["delta_sigma_g_loc" + str(par)] * (-1 * x))
                hi_sigma_g = inv_logit(post["sigma_g_loc"] + post["delta_sigma_g_loc" + str(par)] * x)

                lo_sigma_h = inv_logit(post["sigma_h_loc"] + post["delta_sigma_h_loc" + str(par)] * (-1 * x))
                hi_sigma_h = inv_logit(post["sigma_h_loc"] + post["delta_sigma_h_loc" + str(par)] * x)
            else:
                lo_sigma_g = inv_logit(post["sigma_g_loc"])
                hi_sigma_g = inv_logit(post["sigma_g_loc"])

                lo_sigma_h = inv_logit(post["sigma_h_loc"])
                hi_sigma_h = inv_logit(post["sigma_h_loc"])

        y_lo_g = st.norm.pdf(t, lo_mu_g.median(("chain", "draw")), lo_sigma_g.median(("chain", "draw")))
        y_lo_h = st.norm.pdf(t, lo_mu_h.median(("chain", "draw")), lo_sigma_h.median(("chain", "draw")))
        y_hi_g = st.norm.pdf(t, hi_mu_g.median(("chain", "draw")), hi_sigma_g.median(("chain", "draw")))
        y_hi_h = st.norm.pdf(t, hi_mu_h.median(("chain", "draw")), hi_sigma_h.median(("chain", "draw")))

        return y_lo_g, y_lo_h, y_hi_g, y_hi_h

    else:
        post = fit.posterior

        mu_g = inv_logit(post["mu_g_loc"])
        mu_h = inv_logit(post["mu_h_loc"])

        sigma_g = inv_logit(post["sigma_g_loc"])
        sigma_h = inv_logit(post["sigma_h_loc"])

        y_g = st.norm.pdf(t, mu_g.median(("chain", "draw")), sigma_g.median(("chain", "draw")))
        y_h = st.norm.pdf(t, mu_h.median(("chain", "draw")), sigma_h.median(("chain", "draw")))

        return y_g, y_h


def plot_dists(
    fit,
    t,
    par="",
    diff=True,
    labels=[],
    colors=["mediumseagreen", "blueviolet", "seagreen", "indigo"],
    sigma=True,
    linestyle="-",
    ax=None,
):
    # plots response preparation dists
    # fit: model object
    # t: time grid
    # par: if there are multiple regressors, specify which one here. If not just leave as an empty string
    # diff: True if looking at change in distributions (covariate in model). False otherwise
    # labels: list of values for whatever the difference is on (e.g., young vs old adults)
    # don't need if diff=True

    if diff:
        y_lo_g, y_lo_h, y_hi_g, y_hi_h = get_dist(fit=fit, t=t, par=par, sigma=sigma, diff=diff)

        ax.plot(t * 1000, y_lo_g, color=colors[0], label=labels[0] + ", goal", linestyle=linestyle)
        ax.plot(t * 1000, y_lo_h, color=colors[1], label=labels[0] + ", habit", linestyle=linestyle)
        ax.plot(t * 1000, y_hi_g, color=colors[2], label=labels[1] + ", goal")
        ax.plot(t * 1000, y_hi_h, color=colors[3], label=labels[1] + ", habit")

    else:
        y_g, y_h = get_dist(fit=fit, t=t, par=par, sigma=sigma, diff=diff)

        ax.plot(t * 1000, y_g, color=colors[0], label="goal", linestyle=linestyle)
        ax.plot(t * 1000, y_h, color=colors[1], label="habit", linestyle=linestyle)

    ax.set_xlabel("time")
    ax.set_ylabel("density")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_visible(False)
    # ax.get_yaxis().set_visible(False)
    ax.set_yticks([])
    ax.set_yticklabels([])
    ax.legend(fontsize="x-small")

    return ax


def plot_diff_forest(
    fit,
    diff,
    subtract=True,
    plot_delta=True,
    mod_names=["low", "high"],
    par_diffs={"mu_g": True, "mu_h": True, "sigma_g": True, "sigma_h": True, "beta_g": True, "beta_h": True},
    hdi_prob=0.95,
    lw=None,
    ms=True,
    ax=None,
):
    post = fit.posterior
    labels = []
    order = []
    plot_d = {}
    plot_d2 = {}
    if par_diffs["mu_h"]:
        if plot_delta:
            labels.append(r"$\Delta \mu_h$")
        else:
            labels.append(r"$\mu_h$")
        order.append("mu habit")
        if subtract:
            mu_loh = inv_logit(post["mu_h_loc"] - 0.5 * post[f"delta_mu_h_loc{diff}"])
            mu_hih = inv_logit(post["mu_h_loc"] + 0.5 * post[f"delta_mu_h_loc{diff}"])
            mu_h = np.concatenate((mu_hih - mu_loh).values)
        else:
            mu_h = np.concatenate(post[f"delta_mu_h_loc{diff}"].values)

        if ms:
            if plot_delta:
                plot_d["mu habit"] = mu_h * 1000
            else:
                plot_d["mu habit"] = mu_loh * 1000
                plot_d2["mu habit"] = mu_hih * 1000

        else:
            if plot_delta:
                plot_d["mu habit"] = mu_h
            else:
                plot_d["mu habit"] = mu_loh
                plot_d2["mu habit"] = mu_hih

    if par_diffs["mu_g"]:
        if plot_delta:
            labels.append(r"$\Delta \mu_g$")
        else:
            labels.append(r"$\mu_g$")
        order.append("mu goal")
        if subtract:
            mu_log = inv_logit(post["mu_g_loc"] - 0.5 * post[f"delta_mu_g_loc{diff}"])
            mu_hig = inv_logit(post["mu_g_loc"] + 0.5 * post[f"delta_mu_g_loc{diff}"])

            mu_g = np.concatenate((mu_hig - mu_log).values)
        else:
            mu_g = np.concatenate(post[f"delta_mu_g_loc{diff}"].values)

        if ms:
            if plot_delta:
                plot_d["mu goal"] = mu_g * 1000
            else:
                plot_d["mu goal"] = mu_log * 1000
                plot_d2["mu goal"] = mu_hig * 1000
        else:
            if plot_delta:
                plot_d["mu goal"] = mu_g
            else:
                plot_d["mu goal"] = mu_log
                plot_d2["mu goal"] = mu_hig

    if par_diffs["sigma_h"]:
        if plot_delta:
            labels.append(r"$\Delta \sigma_h$")
        else:
            labels.append(r"$\sigma_h$")

        order.append("sigma habit")
        if subtract:
            sigma_loh = inv_logit(post["sigma_h_loc"] - 0.5 * post[f"delta_sigma_h_loc{diff}"])
            sigma_hih = inv_logit(post["sigma_h_loc"] + 0.5 * post[f"delta_sigma_h_loc{diff}"])

            sigma_h = np.concatenate((sigma_hih - sigma_loh).values)
        else:
            sigma_h = np.concatenate(post[f"delta_sigma_h_loc{diff}"].values)

        if ms:
            if plot_delta:
                plot_d["sigma habit"] = sigma_h * 1000
            else:
                plot_d["sigma habit"] = sigma_loh * 1000
                plot_d2["sigma habit"] = sigma_hih * 1000
        else:
            if plot_delta:
                plot_d["sigma habit"] = sigma_h
            else:
                plot_d["sigma habit"] = sigma_loh
                plot_d2["sigma habit"] = sigma_hih

    if par_diffs["sigma_g"]:
        if plot_delta:
            labels.append(r"$\Delta \sigma_g$")
        else:
            labels.append(r"$\sigma_g$")

        order.append("sigma goal")
        if subtract:
            sigma_log = inv_logit(post["sigma_g_loc"] - 0.5 * post[f"delta_sigma_g_loc{diff}"])
            sigma_hig = inv_logit(post["sigma_g_loc"] + 0.5 * post[f"delta_sigma_g_loc{diff}"])

            sigma_g = np.concatenate((sigma_hig - sigma_log).values)
        else:
            sigma_g = np.concatenate(post[f"delta_sigma_g_loc{diff}"].values)

        if ms:
            if plot_delta:
                plot_d["sigma goal"] = sigma_g * 1000
            else:
                plot_d["sigma goal"] = sigma_log * 1000
                plot_d2["sigma goal"] = sigma_hig * 1000
        else:
            if plot_delta:
                plot_d["sigma goal"] = sigma_g
            else:
                plot_d["sigma goal"] = sigma_log
                plot_d2["sigma goal"] = sigma_hig

    if par_diffs["beta_h"]:
        if plot_delta:
            labels.append(r"$\Delta \beta_h$")
        else:
            labels.append(r"$\beta_h$")

        order.append("beta habit")
        if subtract:
            beta_loh = inv_logit(post["beta_h_loc"] - 0.5 * post[f"delta_beta_h_loc{diff}"])
            beta_hih = inv_logit(post["beta_h_loc"] + 0.5 * post[f"delta_beta_h_loc{diff}"])

            beta_h = np.concatenate((beta_hih - beta_loh).values)
        else:
            beta_h = np.concatenate(post[f"delta_beta_h_loc{diff}"].values)

        if ms:
            if plot_delta:
                plot_d["beta habit"] = beta_h * 100
            else:
                plot_d["beta habit"] = beta_loh * 100
                plot_d2["beta habit"] = beta_hih * 100
        else:
            if plot_delta:
                plot_d["beta habit"] = beta_h
            else:
                plot_d["beta habit"] = beta_loh
                plot_d2["beta habit"] = beta_hih

    if par_diffs["beta_g"]:
        if plot_delta:
            labels.append(r"$\Delta \beta_g$")
        else:
            labels.append(r"$\beta_g$")

        order.append("beta goal")
        if subtract:
            beta_log = inv_logit(post["beta_g_loc"] - 0.5 * post[f"delta_beta_g_loc{diff}"])
            beta_hig = inv_logit(post["beta_g_loc"] + 0.5 * post[f"delta_beta_g_loc{diff}"])

            beta_g = np.concatenate((beta_hig - beta_log).values)
        else:
            beta_g = np.concatenate(post[f"delta_beta_g_loc{diff}"].values)

        if ms:
            if plot_delta:
                plot_d["beta goal"] = beta_g * 100
            else:
                plot_d["beta goal"] = beta_log * 100
                plot_d2["beta goal"] = beta_hig * 100
        else:
            if plot_delta:
                plot_d["beta goal"] = beta_g
            else:
                plot_d["beta goal"] = beta_log
                plot_d2["beta goal"] = beta_hig

    if plot_delta:
        infer_data0 = az.convert_to_dataset(plot_d)
        infer_data = infer_data0[order]
        az.plot_forest(infer_data, hdi_prob=hdi_prob, linewidth=lw, ax=ax)

    else:
        infer_data0 = az.convert_to_dataset(plot_d)
        infer_data = infer_data0[order]
        infer_data02 = az.convert_to_dataset(plot_d2)
        infer_data2 = infer_data02[order]
        az.plot_forest([infer_data, infer_data2], model_names=mod_names, hdi_prob=hdi_prob, linewidth=lw, ax=ax)

    ax.axvline(x=0, color="gray", linestyle="--", zorder=0, alpha=0.8)
    ax.set_yticklabels(labels[::-1])
    ax.set_title("")
    return ax


def set_lw(val, thresh=[0.95, 0.9], lws=[3, 1, 0]):
    if val > thresh[0]:
        lww = lws[0]
    elif val > thresh[1]:
        lww = lws[1]
    else:
        lww = lws[2]
    return lww


def plot_time_bands(
    pd_table,
    ax=None,
    col_names=["pt", "x_congr_pd", "x_age_C_pd", "x_age_I_pd"],
    colors=["black", "blue", "orangered"],
    suppress_x=False,
    thresh=[0.975, 0.9],
    lws=[3, 1, 0],
    spacing=0.75,
    min_t=0,
    max_t=1000,
):
    for i in range(pd_table.shape[0]):
        lw1 = set_lw(pd_table.iloc[i, :][col_names[1]], thresh=thresh, lws=lws)
        lw2 = set_lw(pd_table.iloc[i, :][col_names[2]], thresh=thresh, lws=lws)
        lw3 = set_lw(pd_table.iloc[i, :][col_names[3]], thresh=thresh, lws=lws)
        time_seg = [
            np.max([pd_table.iloc[i, :][col_names[0]] - 5, min_t]),
            np.min([pd_table.iloc[i, :][col_names[0]] + 5, max_t]),
        ]
        ax.plot(time_seg, [1.0 + 2 * spacing, 1.0 + 2 * spacing], linewidth=lw1, color=colors[0])
        ax.plot(time_seg, [1.0 + 1 * spacing, 1.0 + 1 * spacing], linewidth=lw2, color=colors[1])
        ax.plot(time_seg, [1.0, 1.0], linewidth=lw3, color=colors[2])
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_visible(False)
    ax.set_yticks([])
    ax.set_yticklabels([])
    if suppress_x:
        ax.spines["bottom"].set_visible(False)
        ax.set_xticks([])
        ax.set_xticklabels([])


def probd(par, sign=False):
    p = (par > 0).sum() / len(par)
    if p < 0.5:
        if not sign:
            return 1 - p
        else:
            return (1 - p) * -1
    else:
        return p


def summary_table(
    fit,
    par_names_sum=["mu_h_loc", "mu_g_loc", "sigma_h_loc", "sigma_g_loc", "beta_h_loc", "beta_g_loc"],
    delta_num="1",
):
    posterior = fit.posterior
    d2 = {}
    for p_name in par_names_sum:
        if p_name in ["mu_h_loc", "mu_g_loc", "sigma_h_loc", "sigma_g_loc"]:
            d2[f"{p_name}"] = inv_logit(posterior[p_name]) * 1000
        else:
            d2[f"{p_name}"] = inv_logit(posterior[p_name]) * 100
    for p_name in par_names_sum:
        if p_name == "alpha_loc":
            pass
        else:
            if p_name in ["mu_h_loc", "mu_g_loc", "sigma_h_loc", "sigma_g_loc"]:
                d2[f"delta_{p_name}{delta_num}"] = (
                    inv_logit(posterior[p_name] + posterior[f"delta_{p_name}{delta_num}"] * 0.5) * 1000
                    - inv_logit(posterior[p_name] + posterior[f"delta_{p_name}{delta_num}"] * -0.5) * 1000
                )
            else:
                d2[f"delta_{p_name}{delta_num}"] = (
                    inv_logit(posterior[p_name] + posterior[f"delta_{p_name}{delta_num}"] * 0.5) * 100
                    - inv_logit(posterior[p_name] + posterior[f"delta_{p_name}{delta_num}"] * -0.5) * 100
                )

    fit_idata = az.convert_to_inference_data(d2)
    stat_dict = {
        "CI 2.5%": lambda x: np.percentile(x, 2.5),
        "CI 97.5%": lambda x: np.percentile(x, 97.5),
        "probd": probd,
    }
    fit_sum = az.summary(fit_idata, stat_funcs=stat_dict)[["mean", "CI 2.5%", "CI 97.5%", "probd"]]

    fit_sum = fit_sum.reindex(
        [
            "mu_h_loc",
            "mu_g_loc",
            "sigma_h_loc",
            "sigma_g_loc",
            "beta_h_loc",
            "beta_g_loc",
            f"delta_mu_h_loc{delta_num}",
            f"delta_mu_g_loc{delta_num}",
            f"delta_sigma_h_loc{delta_num}",
            f"delta_sigma_g_loc{delta_num}",
            f"delta_beta_h_loc{delta_num}",
            f"delta_beta_g_loc{delta_num}",
        ]
    )

    return fit_sum
