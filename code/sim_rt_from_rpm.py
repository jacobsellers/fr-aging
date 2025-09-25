import arviz as az
import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np
import matplotlib.backends.backend_pdf
from utils.rp_funcs import post_pred_sim2, inv_logit, probd


def summary_table_split(
    fit,
    par_names_sum=["mu_h_loc", "mu_g_loc", "sigma_h_loc", "sigma_g_loc", "beta_h_loc", "beta_g_loc"],
    delta_num="1",
):
    posterior = fit.posterior
    d2 = {}
    for p_name in par_names_sum:
        for group, val in zip(["YA", "OA"], [-0.5, 0.5]):
            if p_name == "alpha_loc":
                pass
            else:
                if p_name in ["mu_h_loc", "mu_g_loc", "sigma_h_loc", "sigma_g_loc"]:
                    d2[f"{p_name}_{group}"] = inv_logit(
                        posterior[p_name] + posterior[f"delta_{p_name}{delta_num}"] * val
                    )
                else:
                    d2[f"{p_name}_{group}"] = inv_logit(
                        posterior[p_name] + posterior[f"delta_{p_name}{delta_num}"] * val
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
            "mu_h_loc_YA",
            "mu_g_loc_YA",
            "sigma_h_loc_YA",
            "sigma_g_loc_YA",
            "beta_h_loc_YA",
            "beta_g_loc_YA",
            "mu_h_loc_OA",
            "mu_g_loc_OA",
            "sigma_h_loc_OA",
            "sigma_g_loc_OA",
            "beta_h_loc_OA",
            "beta_g_loc_OA",
        ]
    )

    return fit_sum


fit1_ot = az.from_netcdf("fits/rpm2_age_hier_exclude2_ontime150_alphafixed.netcdf")  # load filtered rpm fit
fitsum = summary_table_split(fit1_ot)

t = np.arange(0, 1, 0.001)

# get posterior predictions for YA and OA
post_iYA0, post_cYA0 = post_pred_sim2(
    fit1_ot,
    t,
    x=-0.5,
    n=500,
    hier=True,
    fixed_alpha=True,
    flatten=True,
    group_diff_only=True,
    par="1",
    par_diffs={"mu_g": True, "mu_h": True, "sigma_g": True, "sigma_h": True, "beta_g": True, "beta_h": True},
)

post_iOA0, post_cOA0 = post_pred_sim2(
    fit1_ot,
    t,
    x=0.5,
    n=500,
    hier=True,
    fixed_alpha=True,
    flatten=True,
    group_diff_only=True,
    par="1",
    par_diffs={"mu_g": True, "mu_h": True, "sigma_g": True, "sigma_h": True, "beta_g": True, "beta_h": True},
)

post_iYA = np.mean(post_iYA0, axis=0)
post_cYA = np.mean(post_cYA0, axis=0)
post_iOA = np.mean(post_iOA0, axis=0)
post_cOA = np.mean(post_cOA0, axis=0)

# generate RT predictions
bceil_c = 0.06
bceil_i = 0.09

# YA
ya_c1 = np.argmin(np.abs(post_cYA - (fitsum.loc["beta_g_loc_YA", "mean"] - bceil_c)))
ya_i1 = np.argmin(np.abs(post_iYA - (fitsum.loc["beta_g_loc_YA", "mean"] - bceil_i)))

# OA1
oa_c1 = np.argmin(np.abs(post_cOA - (fitsum.loc["beta_g_loc_OA", "mean"] - bceil_c - 0.005)))
oa_i1 = np.argmin(np.abs(post_iOA - (fitsum.loc["beta_g_loc_OA", "mean"] - bceil_i + 0.01)))

# OA2
oa_c2 = np.argmin(np.abs(post_cOA - (fitsum.loc["beta_g_loc_OA", "mean"] - bceil_c + 0.025)))
oa_i2 = oa_c2 + (ya_i1 - ya_c1)

# OA3
oa_c3 = np.argmin(np.abs(post_cOA - (fitsum.loc["beta_g_loc_OA", "mean"] - bceil_c + 0.029)))
oa_i3 = np.argmin(np.abs(post_iOA - (fitsum.loc["beta_g_loc_OA", "mean"] - bceil_i + 0.049)))


# plotting params
markersize = 70
alpha0 = 0.5
markers = ["o", "^", "s", "*"]
rt_preds_c = [ya_c1, oa_c1, oa_c2, oa_c3]
rt_preds_i = [ya_i1, oa_i1, oa_i2, oa_i3]
posts_c = [post_cYA, post_cOA, post_cOA, post_cOA]
posts_i = [post_iYA, post_iOA, post_iOA, post_iOA]
colors_c = ["cornflowerblue", "blue", "blue", "blue"]
colors_i = ["orange", "orangered", "orangered", "orangered"]
barwidth1 = 0.4

# plot

fig, ax = plt.subplot_mosaic([[0, 2, 3], [1, 2, 3]], figsize=(10, 4), constrained_layout=True)

ax[0].set_title("Younger Adults")
ax[1].set_title("Older Adults")


for i in range(len(rt_preds_c)):
    if i == 0:
        ax_plot = 0
    else:
        ax_plot = 1
    ax[ax_plot].scatter(
        t[rt_preds_c[i]] * 1000, posts_c[i][rt_preds_c[i]], marker=markers[i], color=colors_c[i], s=markersize
    )
    ax[ax_plot].scatter(
        t[rt_preds_i[i]] * 1000, posts_i[i][rt_preds_i[i]], marker=markers[i], color=colors_i[i], s=markersize
    )

ax[0].plot(t * 1000, post_cYA, color="cornflowerblue", alpha=0.6)
ax[0].plot(t * 1000, post_iYA, color="orange", alpha=0.6)
ax[1].plot(t * 1000, post_cOA, color="blue")
ax[1].plot(t * 1000, post_iOA, color="orangered")

for i in [0, 1]:
    ax[i].set_ylabel("Accuracy")
    ax[i].set_xlabel("Processing Time (ms)")
    ax[i].axhline(0.5, linestyle="--", color="grey", alpha=0.5)
    ax[i].set_ylim([0.3, 1])
    ax[i].set_yticks([0.4, 0.6, 0.8, 1.0])
    ax[i].set_xticks([0, 250, 500, 750, 1000])

x_pos1 = []
for i in range(len(rt_preds_c)):
    if i == 0:
        x_pos = i
    else:
        x_pos = i + 0.5
    x_pos1.append(x_pos)
    ax[2].scatter(x_pos, t[rt_preds_c[i]] * 1000 + 35, marker=markers[i], color=colors_c[i], s=markersize)
    ax[2].bar(x_pos, t[rt_preds_c[i]] * 1000, color=colors_c[i], alpha=alpha0, width=barwidth1)
    ax[2].scatter(x_pos + 0.4, t[rt_preds_i[i]] * 1000 + 35, marker=markers[i], color=colors_i[i], s=markersize)
    ax[2].bar(x_pos + 0.4, t[rt_preds_i[i]] * 1000, color=colors_i[i], alpha=alpha0, width=barwidth1)
ax[2].set_ylabel("Predicted Reaction Time (ms)")
ax[2].set_xticks(np.array(x_pos1) + 0.2)
ax[2].set_yticks([0, 200, 400, 600, 800, 1000])
# ax[2].set_xticklabels(["YA - balanced", "OA - balanced", "OA - conservative", "OA - more conservative"], rotation=45)
ax[2].set_xticklabels(["YA", "OA1", "OA2", "OA3"])

ax[3].axhline((t[rt_preds_i[0]] - t[rt_preds_c[0]]) * 1000, linestyle="--", color="red", alpha=0.5)
x_pos2 = []
for i in range(len(rt_preds_c)):
    if i == 0:
        x_pos = i
        alpha00 = 0.35
    else:
        x_pos = i + 0.5
        alpha00 = alpha0
    x_pos2.append(x_pos)
    ax[3].bar(x_pos, (t[rt_preds_i[i]] - t[rt_preds_c[i]]) * 1000, color="black", alpha=alpha00)
    ax[3].scatter(
        x_pos, (t[rt_preds_i[i]] - t[rt_preds_c[i]]) * 1000 + 8, color="black", marker=markers[i], s=markersize
    )
# ax[2].axhline(t[rt_preds_i[0]] - t[rt_preds_c[0]], linestyle="--", color="red")
ax[3].set_ylabel("Predicted Congruency Effect (ms)")
ax[3].set_xticks(np.array(x_pos2))
ax[3].set_xticklabels(["YA", "OA1", "OA2", "OA3"])

for i, _ in enumerate(ax):
    ax[i].spines["top"].set_visible(False)
    ax[i].spines["right"].set_visible(False)

mpl.rcParams["xtick.labelsize"] = 12
mpl.rcParams["ytick.labelsize"] = 12
mpl.rcParams["axes.labelsize"] = 14
mpl.rcParams["axes.titlesize"] = 14
fig.tight_layout()

plt.savefig("figs/4_model_to_RT.pdf")
