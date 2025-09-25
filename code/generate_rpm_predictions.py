import matplotlib.pyplot as plt
from utils.rpm_simulator_funcs import plot_dists, plot_pred

# set simulation parameters
mu_g = 0.46
mu_h = 0.36
sigma_g = 0.09
sigma_h = 0.032
beta_g = 0.98
beta_h = 0.93
alpha = 0.5

mu_g_diff = 0.05
mu_h_diff = 0.05
beta_h_diff = 0.1

# extra plotting info
x_lims = (100, 900)
save_info = "realistic_pars"

dcolors1 = ["indigo", "seagreen"]
dcolors2 = ["blueviolet", "mediumseagreen"]
ls1 = "-"
ls2 = "--"
bcolors1 = ["blue", "orangered"]
bcolors2 = ["cornflowerblue", "orange"]

### begin plotting ###

# speeded habit
fig, ax = plt.subplots(2, 1, gridspec_kw={"height_ratios": [1, 2]})
plot_dists(
    mu_g,
    mu_h - mu_h_diff,
    sigma_g,
    sigma_h,
    ax=ax[0],
    colors=dcolors1,
    linestyle=ls1,
    three=False,
    fill=False,
)
plot_dists(mu_g, mu_h, sigma_g, sigma_h, ax=ax[0], colors=dcolors2, linestyle=ls2, three=False, fill=False)
ax[0].set_xticklabels("")
ax[0].set_xlabel("")
ax[0].set_ylabel("")
ax[0].set_xticks([])
ax[0].set_xlim([x_lims[0], x_lims[1]])
plot_pred(mu_g, mu_h - mu_h_diff, sigma_g, sigma_h, beta_g, beta_h, alpha, line=False, ax=ax[1], colors=bcolors1)
plot_pred(mu_g, mu_h, sigma_g, sigma_h, beta_g, beta_h, alpha, line=False, ax=ax[1], colors=bcolors2)
ax[1].axhline(y=0.5, color="gray", linestyle="--", zorder=0, alpha=0.8)
ax[1].set_ylabel("")
ax[1].set_xlabel("")
ax[1].set_title("")
ax[1].set_xticklabels("")
ax[1].set_yticks([0, 1])
ax[1].set_xticks([])
ax[1].set_xlim([x_lims[0], x_lims[1]])
ax[1].tick_params(axis="both", which="major", labelsize=14)
fig.savefig(f"figs/2b_delta_sim_{save_info}_speed_habit.pdf")


# slow goal
fig, ax = plt.subplots(2, 1, gridspec_kw={"height_ratios": [1, 2]})
plot_dists(
    mu_g + mu_g_diff,
    mu_h,
    sigma_g,
    sigma_h,
    ax=ax[0],
    colors=dcolors1,
    linestyle=ls1,
    three=False,
    fill=False,
)
plot_dists(mu_g, mu_h, sigma_g, sigma_h, ax=ax[0], colors=dcolors2, linestyle=ls2, three=False, fill=False)
ax[0].set_xticklabels("")
ax[0].set_xlabel("")
ax[0].set_ylabel("")
ax[0].set_xticks([])
ax[0].set_xlim([x_lims[0], x_lims[1]])
plot_pred(mu_g + mu_g_diff, mu_h, sigma_g, sigma_h, beta_g, beta_h, alpha, line=False, ax=ax[1], colors=bcolors1)
plot_pred(mu_g, mu_h, sigma_g, sigma_h, beta_g, beta_h, alpha, line=False, ax=ax[1], colors=bcolors2)
ax[1].axhline(y=0.5, color="gray", linestyle="--", zorder=0, alpha=0.8)
ax[1].set_ylabel("")
ax[1].set_xlabel("")
ax[1].set_title("")
ax[1].set_xticklabels("")
ax[1].set_yticks([0, 1])
ax[1].set_xticks([])
ax[1].set_xlim([x_lims[0], x_lims[1]])
ax[1].tick_params(axis="both", which="major", labelsize=14)
fig.savefig(f"figs/2b_delta_sim_{save_info}_slow_goal.pdf")

# increase beta habit
fig, ax = plt.subplots(2, 1, gridspec_kw={"height_ratios": [1, 2]})
plot_dists(
    mu_g,
    mu_h,
    sigma_g,
    sigma_h,
    ax=ax[0],
    colors=dcolors1,
    linestyle=ls1,
    three=False,
    fill=False,
)
plot_dists(mu_g, mu_h, sigma_g, sigma_h, ax=ax[0], colors=dcolors2, linestyle=ls2, three=False, fill=False)
ax[0].set_xticklabels("")
ax[0].set_xlabel("")
ax[0].set_ylabel("")
ax[0].set_xticks([])
ax[0].set_xlim([x_lims[0], x_lims[1]])
plot_pred(mu_g, mu_h, sigma_g, sigma_h, beta_g, beta_h, alpha, line=False, ax=ax[1], colors=bcolors1)
plot_pred(mu_g, mu_h, sigma_g, sigma_h, beta_g, beta_h - beta_h_diff, alpha, line=False, ax=ax[1], colors=bcolors2)
ax[1].axhline(y=0.5, color="gray", linestyle="--", zorder=0, alpha=0.8)
ax[1].set_ylabel("")
ax[1].set_xlabel("")
ax[1].set_xticklabels("")
ax[1].set_yticks([0, 1])
ax[1].set_xticks([])
ax[1].set_xlim([x_lims[0], x_lims[1]])
ax[1].set_title("")
ax[1].tick_params(axis="both", which="major", labelsize=14)
fig.savefig(f"figs/2b_delta_sim_{save_info}_increase_beta_habit.pdf")

# slow habit and slow goal
fig, ax = plt.subplots(2, 1, gridspec_kw={"height_ratios": [1, 2]})
plot_dists(
    mu_g + mu_g_diff,
    mu_h + mu_h_diff,
    sigma_g,
    sigma_h,
    ax=ax[0],
    colors=dcolors1,
    linestyle=ls1,
    three=False,
    fill=False,
)
plot_dists(mu_g, mu_h, sigma_g, sigma_h, ax=ax[0], colors=dcolors2, linestyle=ls2, three=False, fill=False)
ax[0].set_xticklabels("")
ax[0].set_xlabel("")
ax[0].set_ylabel("")
ax[0].set_xticks([])
ax[0].set_xlim([x_lims[0], x_lims[1]])
plot_pred(
    mu_g + mu_g_diff,
    mu_h + mu_h_diff,
    sigma_g,
    sigma_h,
    beta_g,
    beta_h,
    alpha,
    line=False,
    ax=ax[1],
    colors=bcolors1,
)
plot_pred(mu_g, mu_h, sigma_g, sigma_h, beta_g, beta_h, alpha, line=False, ax=ax[1], colors=bcolors2)
ax[1].axhline(y=0.5, color="gray", linestyle="--", zorder=0, alpha=0.8)
ax[1].set_ylabel("")
ax[1].set_xlabel("")
ax[1].set_title("")
ax[1].set_xticklabels("")
ax[1].set_yticks([0, 1])
ax[1].set_xticks([])
ax[1].set_xlim([x_lims[0], x_lims[1]])
ax[1].tick_params(axis="both", which="major", labelsize=14)
fig.savefig(f"figs/2b_delta_sim_{save_info}_slowdown.pdf")
