import arviz as az
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import matplotlib.backends.backend_pdf
import matplotlib as mpl
from utils.rp_funcs import (
    plot_time_bands,
    behav_plot,
    post_pred_plot,
    plot_dists,
    plot_diff_forest,
    sw_behav,
    summary_table,
)


# big function to generate all summary plots for behavior and rpm fit
# need to apply to both filtered and unfiltered data
def summarize_fit(
    smooth_behav,
    fit,
    rolling_lr_fit,
    fixed_alpha=False,
    labs=["YA", "OA"],
    figsize0=[[14, 6.3], [14, 6.3], [14, 6.3]],
    labelsize=20,
    ax_width=5,
    # sub=True,
    save=False,
    save_path="figs/",
    model="",
):
    # behave = rp.sw_behav(dat, cond=["congr", "age_group0"], values=[[0.5, -0.5], [0.5, -0.5]], ub=1000)
    behave_sub = smooth_behav
    # fit=fit_ad_mug_betah
    par_diffs = {"mu_g": True, "mu_h": True, "sigma_g": True, "sigma_h": True, "beta_g": True, "beta_h": True}
    vs = [-0.5, 0.5]
    # labs = ["YA", "OA"]
    # title = "OA - YA"

    cmap = mpl.colormaps["plasma"]
    l1 = behave_sub.columns.to_list()

    fig, ax = plt.subplots(2, 1, gridspec_kw={"height_ratios": [3.5, 12]}, figsize=figsize0[0])
    # ax.set_xticks(range(0,650,50))
    if rolling_lr_fit is not None:
        plot_time_bands(
            rolling_lr_fit,
            ax=ax[0],
            col_names=["pt", "x_congr_pd", "x_congrxage_pd_lo", "x_congrxage_pd_hi"],
            colors=[cmap(0.1), cmap(0.3), cmap(0.5)],
            lws=[7, 2.5, 0],
            suppress_x=True,
        )
        ax[0].set_xlim([0, 1000])
        ax[0].set_ylim([0.8, 2.7])
    else:
        fig.delaxes(ax[0])
    behav_plot(
        behave_sub,
        cond=l1[0:9],
        color=["blue", "cornflowerblue", "orangered", "orange"],
        labels=[f"C, {labs[1]}", f"C, {labs[0]}", f"I, {labs[1]}", f"I, {labs[0]}"],
        ax=ax[1],
    )
    ax[1].axhline(y=0.5, color="gray", linestyle="--", zorder=0, alpha=0.8)
    ax[1].set_xlim([0, 1000])
    ax[1].set_yticks(np.arange(0.3, 1.1, 0.1))
    ax[1].set_ylim([0.3, 1])
    ax[1].get_legend().remove()
    # ax.set_ylabel('Accuracy', fontsize=15)
    ax[1].set_ylabel("", fontsize=0)
    # ax.set_xlabel('Processing Time (ms)', fontsize=15)
    ax[1].set_xlabel("", fontsize=0)
    ax[1].tick_params(axis="both", which="major", labelsize=labelsize, width=ax_width)
    ax[1].spines["left"].set_linewidth(ax_width)
    ax[1].spines["bottom"].set_linewidth(ax_width)
    fig.tight_layout()
    # ax.set_title("averaged over subjects")
    if save:
        plt.savefig(save_path + f"a_{model}_behav.pdf")
    print("behavior plot done")

    t = np.arange(0, 1, 0.001)
    ## Posterior prediction ##
    fig, ax = plt.subplots(2, 1, gridspec_kw={"height_ratios": [1, 2]}, figsize=figsize0[1])
    # fig, ax = plt.subplots()
    post_pred_plot(
        fit=fit,
        behav=behave_sub,
        cond="age_group0",
        hier=True,
        fixed_alpha=fixed_alpha,
        values=vs,
        labels=labs,
        n=500,
        par_diffs=par_diffs,
        post_pred=False,
        t=t,
        smooth=False,
        group_diff_only=True,
        par="1",
        ax=ax[1],
    )
    ax[1].axhline(y=0.5, color="gray", linestyle="--", zorder=0, alpha=0.8)
    ax[1].set_ylim([0.3, 1])
    ax[1].set_yticks(np.arange(0.3, 1.1, 0.1))
    ax[1].set_ylabel("")
    ax[1].set_xlabel("")
    ax[1].set_title("")
    ax[1].set_xlim([0, 1000])
    ax[1].set_ylabel("", fontsize=0)
    ax[1].set_xlabel("", fontsize=0)
    ax[1].tick_params(axis="both", which="major", labelsize=labelsize, width=ax_width)
    ax[1].get_legend().remove()
    ax[1].spines["left"].set_linewidth(ax_width)
    ax[1].spines["bottom"].set_linewidth(ax_width)

    # pdf.savefig(fig)

    t = np.arange(0, 1, 0.01)
    # fig, ax = plt.subplots(figsize=(8, 4))
    plot_dists(fit, t, par="1", labels=labs, ax=ax[0], sigma=True, linestyle="--")
    ax[0].set_ylabel("")
    ax[0].set_xlabel("")
    ax[0].set_title("")
    ax[0].set_xticklabels("")
    ax[0].set_xlim([0, 1000])
    ax[0].set_ylabel("", fontsize=0)
    ax[0].tick_params(axis="both", which="major", labelsize=labelsize, width=ax_width)
    ax[0].spines["bottom"].set_linewidth(ax_width)
    ax[0].get_legend().remove()
    fig.tight_layout()
    if save:
        plt.savefig(save_path + f"b_{model}_dists_model_predictions.pdf")

    print("rpm plot done")

    fig, ax = plt.subplots(figsize=figsize0[2])
    plot_diff_forest(fit, diff="1", par_diffs=par_diffs, ax=ax, lw=3.5, ms=True, hdi_prob=0.95)
    # ax.set_xticklabels(np.array(np.round(ax.get_xticks()*1000),dtype=int))
    ax.tick_params(axis="both", which="major", labelsize=labelsize)
    ax.spines["top"].set_linewidth(ax_width)
    ax.spines["bottom"].set_linewidth(ax_width)
    fig.tight_layout()
    if save:
        plt.savefig(save_path + f"c_{model}_model_deltas_forest.pdf")
    print("forest plot done")

    return print("done")


# filtered data first
dat1 = pd.read_csv("dat/task_dat_alltrial_excludedsub.csv")  # load filtered data
dat1_ot = dat1[dat1["ontime150"] == 1]
dat1_ot_lr = pd.read_csv("fits/rolling_lr_congr_x_age_randomintercept.csv")  # load rolling lr fit
fit1_ot = az.from_netcdf("fits/rpm2_age_hier_exclude2_ontime150_alphafixed.netcdf")  # load filtered rpm fit

print("smoothing filtered behavior")
behave_sub = sw_behav(
    dat1_ot, cond=["congr", "age_group0"], values=[[0.5, -0.5], [0.5, -0.5]], sub=True, ub=1000
)  # smooth behavior

print("beginning plotting")
summarize_fit(
    behave_sub,
    fit1_ot,
    dat1_ot_lr,
    fixed_alpha=True,
    labs=["YA", "OA"],
    figsize0=[(9, 6), (9, 9), (9, 3)],
    labelsize=26,
    ax_width=2,
    save=True,
    save_path="figs/3",
    model="age_excludedsub_ontime_fixedalpha",
)

fit1_ot_summary = summary_table(fit1_ot)
fit1_ot_summary.to_csv("results/rpm2_age_hier_exclude2_ontime150_alphafixed_summary.csv")

# unfiltered data second
dat2 = pd.read_csv("dat/task_dat_alltrial.csv")  # load unfiltered data
fit2 = az.from_netcdf("fits/rpm2_age_hier_noexclude_alltrial.netcdf")  # load unfiltered rpm fit

print("smoothing unfiltered behavior")
behave_sub2 = sw_behav(
    dat2, cond=["congr", "age_group0"], values=[[0.5, -0.5], [0.5, -0.5]], sub=True, ub=1000
)  # smooth behavior

print("beginning plotting")
summarize_fit(
    behave_sub2,
    fit2,
    None,
    fixed_alpha=False,
    labs=["YA", "OA"],
    figsize0=[(9, 6), (9, 9), (9, 3)],
    labelsize=28,
    ax_width=2,
    save=True,
    save_path="figs/s1",
    model="age_allsub_alltrial",
)

fit2_summary = summary_table(fit2)
fit2_summary.to_csv("results/rpm2_age_hier_noexclude_alltrial_summary.csv")
