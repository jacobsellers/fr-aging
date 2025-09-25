import pandas as pd
from utils.rpm_fitting_funcs import fit_rpm2, fit_rpm3


dat0 = pd.read_csv("dat/task_dat_alltrial.csv")
dat0 = dat0[dat0["pt"] > 0]
dat1 = pd.read_csv("dat/task_dat_alltrial_excludedsub.csv")
dat1 = dat1[dat1["pt"] > 0]
dat1_ot = dat1[dat1["ontime150"] == 1]

# fit rpm to filtered data
fit1_ot = fit_rpm3(dat1_ot)
fit1_ot.to_netcdf("fits/rpm2_age_hier_exclude2_ontime150_alphafixed.netcdf")

# fit rpm to unfiltered data
fit0 = fit_rpm2(dat0)
fit0.to_netcdf("fits/rpm2_age_hier_noexclude.netcdf")
