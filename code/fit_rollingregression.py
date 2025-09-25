import pandas as pd
import numpy as np
from utils.rolling_regression_funcs import prep_df, run_rolling_lr, pd_clusters

dat1 = pd.read_csv("dat/task_dat_alltrial_excludedsub.csv")
dat1_ot = dat1[dat1["ontime150"] == 1]

dat_r = prep_df(dat1_ot)  # preps df for rolling regression

dat_lr_pds = run_rolling_lr(dat_r, times=np.arange(0, 1010, 10), halfwindow=50)  # runs rolling regression

dat_lr_pds["x_congrxage_pd_lo"] = np.where(
    dat_lr_pds["x_congrxage_p_over0"] < 0.5, 1 - dat_lr_pds["x_congrxage_p_over0"], 0.5
)
dat_lr_pds["x_congrxage_pd_hi"] = np.where(
    dat_lr_pds["x_congrxage_p_over0"] > 0.5, dat_lr_pds["x_congrxage_p_over0"], 0.5
)

# save results
dat_lr_pds.to_csv("fits/rolling_lr_congr_x_age_randomintercept.csv")

# find clusters of high pd for CE and CE x Age
congr_pd = pd_clusters(dat_lr_pds, time_col="pt", p_col="x_congr_pd", threshold=0.975, op=">", assume_sorted=False)
congrxage_lo_pd = pd_clusters(
    dat_lr_pds, time_col="pt", p_col="x_congrxage_pd_lo", threshold=0.975, op=">", assume_sorted=False
)
congrxage_hi_pd = pd_clusters(
    dat_lr_pds, time_col="pt", p_col="x_congrxage_pd_hi", threshold=0.975, op=">", assume_sorted=False
)

pd_clusters_all = {
    "congruency effect (CE)": congr_pd,
    "YA CE > OA CE": congrxage_lo_pd,
    "YA CE < OA CE": congrxage_hi_pd,
}

# save clusters to text file
output_file = "results/rolling_lr_high_pd_clusters.txt"

with open(output_file, "w") as f:
    for k, v in pd_clusters_all.items():
        f.write(f"\n--- {k} ---\n")
        v.to_csv(f, sep="\t", index=False, mode="a")
