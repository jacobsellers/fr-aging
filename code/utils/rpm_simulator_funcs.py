import numpy as np
from scipy import stats as st


def plot_dists(
    mu_g,
    mu_h,
    sigma_g,
    sigma_h,
    mu_3=0.4,
    sigma_3=0.15,
    goal=True,
    label3="faster habit",
    t=np.linspace(0, 1, 1000),
    colors=["green", "purple", "violet"],
    three=True,
    t0=450,
    fill=False,
    ax=None,
    linestyle="-",
):
    y_h = st.norm.pdf(t, loc=mu_h, scale=sigma_h)
    y_g = st.norm.pdf(t, loc=mu_g, scale=sigma_g)
    y_3 = st.norm.pdf(t, loc=mu_3, scale=sigma_3)

    tp = t * 1000
    ax.plot(tp, y_h, color=colors[0], linestyle=linestyle, label="habit")
    if goal:
        ax.plot(tp, y_g, color=colors[1], linestyle=linestyle, label="goal")
    if fill:
        ax.fill_between(tp[tp < t0], y_h[tp < t0], np.repeat(0, len(tp[tp < t0])), color=colors[0], alpha=0.4)
        ax.fill_between(tp[tp < t0], y_g[tp < t0], np.repeat(0, len(tp[tp < t0])), color=colors[1], alpha=0.4)
        ax.axvline(x=t0, color="gray", linestyle="--")
    if three:
        ax.plot(t * 1000, y_3, color=colors[2], label=label3)
    ax.set_xlabel("Time")
    ax.set_ylabel("Density")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_visible(False)
    # ax.get_yaxis().set_visible(False)
    ax.set_yticks([])
    ax.set_yticklabels([])

    # ax.set_xticks([])
    # ax.set_xticklabels([])
    if three:
        ax.legend(fontsize="x-small")

    return ax


def plot_cdfs(
    mu, sigma, plot_inverse=False, t=np.linspace(0, 1, 1000), colors="purple", three=True, t0=450, fill=False, ax=None
):
    p_h = st.norm.cdf(t, loc=mu, scale=sigma)
    p_not_h = 1 - p_h

    tp = t * 1000
    if plot_inverse:
        ax.plot(tp, p_h, color=colors)
    else:
        ax.plot(tp, p_not_h, color=colors)
    ax.set_xlabel("Time")
    ax.set_ylabel("Probability")
    # ax.get_yaxis().set_visible(False)
    ax.set_ylim([-0.1, 1.1])
    ax.set_yticks(np.arange(0, 1.25, 0.25))
    (ax.set_yticklabels(["0", "", "", "", "1"]),)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    # ax.set_xticks([])
    # ax.set_xticklabels([])

    return ax


def plot_probs0(
    mu_g,
    mu_h,
    sigma_g,
    sigma_h,
    beta_g,
    beta_h,
    alpha,
    t=np.linspace(0, 1, 1000),
    goal=True,
    response=True,
    congruency=False,
    colors=["blue", "orangered"],
    ax=None,
):
    if response:
        beta_g = beta_g
        beta_h = beta_h
        alpha = alpha
    else:
        beta_g = 1
        beta_h = 1
        alpha = 0

    phi_g = st.norm.cdf(t, loc=mu_g, scale=sigma_g)  # Pr(prep g|time)
    phi_h = st.norm.cdf(t, loc=mu_h, scale=sigma_h)  # Pr(prep h|time)
    not_phi_g = 1 - phi_g  # Pr(not prep g|time)
    not_phi_h = 1 - phi_h  # Pr(not prep h|time)

    psi1_g = not_phi_g * not_phi_h * alpha  # Pr(goal|h and g not prepped)
    psi2_g = not_phi_g * phi_h * (1 - beta_h)  # Pr(goal|h prep, g not prep)
    psi3_g = phi_g * not_phi_h * beta_g  # Pr(goal|h not prep, g prep)
    psi4_g = phi_g * phi_h * beta_g  # Pr(goal| h and g prep)

    psi1_h = not_phi_g * not_phi_h * alpha  # Pr(habit|h and g not prepped)
    psi2_h = not_phi_g * phi_h * beta_h  # Pr(habit|h prep, g not prep)
    psi3_h = phi_g * not_phi_h * (1 - beta_g)  # Pr(habit|h not prep, g prep)
    psi4_h = phi_g * phi_h * (1 - beta_g)  # Pr(habit| h and g prep)

    theta_g = psi1_g + psi2_g + psi3_g + psi4_g
    theta_h = psi1_h + psi2_h + psi3_h + psi4_h

    psi1 = not_phi_g * not_phi_h * alpha  # Pr(goal|h and g not prepped)
    psi2_i = not_phi_g * phi_h * (1 - beta_h)
    psi2_c = not_phi_g * phi_h * beta_h  # Pr(goal|h prep, g not prep)
    psi3 = phi_g * not_phi_h * beta_g  # Pr(goal|h not prep, g prep)
    psi4 = phi_g * phi_h * beta_g  # Pr(goal| h and g prep)

    theta_c = psi1 + psi2_c + psi3 + psi4
    theta_i = psi1 + psi2_i + psi3 + psi4

    ax = ax

    if congruency:
        ax.plot(t * 1000, theta_c, color=colors[0], label="congruent")
        ax.plot(t * 1000, theta_i, color=colors[1], label="incongruent")
        ax.set_ylabel("Behavioral Accuracy")
    else:
        ax.plot(t * 1000, theta_h, color=colors[0], label="habit")
        ax.set_ylabel("Probability of Response")
        if goal:
            ax.plot(t * 1000, theta_g, color=colors[1], label="goal")
    ax.set_xlabel("Time")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.legend(fontsize="x-small")

    return ax


def plot_probs(
    mu_g,
    mu_h,
    sigma_g,
    sigma_h,
    beta_g,
    beta_h,
    alpha,
    t=np.linspace(0, 1, 1000),
    response=True,
    colors=["darkgreen", "forestgreen", "darkorchid", "indigo"],
    ylab="Probability",
    xlab=True,
    which="all",
    t0=450,
    line=False,
    ax=None,
):
    if response:
        beta_g = beta_g
        beta_h = beta_h
        alpha = alpha
    else:
        beta_g = 1
        beta_h = 1
        alpha = 0

    phi_g = st.norm.cdf(t, loc=mu_g, scale=sigma_g)  # Pr(prep g|time)
    phi_h = st.norm.cdf(t, loc=mu_h, scale=sigma_h)  # Pr(prep h|time)
    not_phi_g = 1 - phi_g  # Pr(not prep g|time)
    not_phi_h = 1 - phi_h  # Pr(not prep h|time)

    psi1 = not_phi_g * not_phi_h  # Pr(goal|h and g not prepped)
    psi2 = not_phi_g * phi_h  # Pr(goal|h prep, g not prep)
    psi3 = phi_g * not_phi_h  # Pr(goal|h not prep, g prep)
    psi4 = phi_g * phi_h  # Pr(goal| h and g prep)

    ax = ax
    if which == 1:
        ax.plot(t * 1000, psi1, color=colors[0])
        if line:
            ax.vlines(x=t0, ymin=-0.1, ymax=psi1[t0], color="gray", linestyle="-")
        # ax.fill_between(t[t<t0],psi1, np.repeat(0,len(xh[pos_h])), color=color[0], alpha=0.4)
    if which == 2:
        ax.plot(t * 1000, psi2, color=colors[1])
        if line:
            ax.vlines(x=t0, ymin=-0.1, ymax=psi2[t0], color="gray", linestyle="-")
    if which == 3:
        ax.plot(t * 1000, psi3, color=colors[2])
        if line:
            ax.vlines(x=t0, ymin=-0.1, ymax=psi3[t0], color="gray", linestyle="-")
    if which == 4:
        ax.plot(t * 1000, psi4, color=colors[3])
        if line:
            ax.vlines(x=t0, ymin=-0.1, ymax=psi4[t0], color="gray", linestyle="-")
    if which == "all":
        ax.plot(t * 1000, psi1, color=colors[0])
        ax.plot(t * 1000, psi2, color=colors[1])
        ax.plot(t * 1000, psi3, color=colors[2])
        ax.plot(t * 1000, psi4, color=colors[3])
    if xlab:
        ax.set_xlabel("Time")
    ax.set_ylabel(ylab)
    ax.set_ylim([-0.1, 1.1])
    ax.set_yticks(np.arange(0, 1.25, 0.25))
    (ax.set_yticklabels(["0", "", "", "", "1"]),)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.legend(fontsize="x-small")

    return ax


def plot_pred(
    mu_g,
    mu_h,
    sigma_g,
    sigma_h,
    beta_g,
    beta_h,
    alpha,
    t=np.linspace(0, 1, 1000),
    response=True,
    colors=["blue", "orange"],
    t0=450,
    line=False,
    ax=None,
):
    if response:
        beta_g = beta_g
        beta_h = beta_h
        alpha = alpha
    else:
        beta_g = 1
        beta_h = 1
        alpha = 0

    phi_g = st.norm.cdf(t, loc=mu_g, scale=sigma_g)  # Pr(prep g|time)
    phi_h = st.norm.cdf(t, loc=mu_h, scale=sigma_h)  # Pr(prep h|time)
    not_phi_g = 1 - phi_g  # Pr(not prep g|time)
    not_phi_h = 1 - phi_h  # Pr(not prep h|time)

    psi1 = not_phi_g * not_phi_h * alpha  # Pr(goal|h and g not prepped)
    psi2_c = not_phi_g * phi_h * beta_h
    psi2_i = not_phi_g * phi_h * (1 - beta_h)  # Pr(goal|h prep, g not prep)
    psi3 = phi_g * not_phi_h * beta_g  # Pr(goal|h not prep, g prep)
    psi4 = phi_g * phi_h * beta_g  # Pr(goal| h and g prep)

    theta_c = psi1 + psi2_c + psi3 + psi4
    theta_i = psi1 + psi2_i + psi3 + psi4

    ax = ax

    ax.plot(t * 1000, theta_c, color=colors[0], label="congr")
    ax.plot(t * 1000, theta_i, color=colors[1], label="incongr")

    ax.set_ylabel("Accuracy")
    ax.set_ylim([-0.1, 1.1])
    ax.set_yticks(np.arange(0, 1.25, 0.25))
    ax.set_yticklabels(["0", "", "", "", "1"])
    if line:
        ax.axvline(x=t0, color="gray", linestyle="--")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)

    return ax
