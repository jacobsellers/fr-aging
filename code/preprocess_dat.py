import pandas as pd
import numpy as np


all_data = pd.read_csv("dat/all_dat.csv")

task_data = all_data[all_data["forcedRT_resp.keys"].notna()]
task_data["age_group0"] = np.where(task_data["AGE_GROUP"] == "YA", -0.5, 0.5)
task_data["rt"] = task_data["forcedRT_resp.rt"]
task_data["participant"] = task_data["PROLIFIC_PID"]
task_data["pt"] = task_data["rt"] - task_data["target_onset"]
task_data["PT"] = task_data["pt"] * 1000
task_data["accuracy"] = task_data["forcedRT_resp.corr"]
task_data["congr"] = np.where(task_data["trial_type"] == "Congruent", 0.5, -0.5)
task_data["ontime100"] = np.where((task_data["forcedRT_resp.rt"] > 1.90) & (task_data["forcedRT_resp.rt"] < 2.10), 1, 0)
task_data["ontime150"] = np.where((task_data["forcedRT_resp.rt"] > 1.85) & (task_data["forcedRT_resp.rt"] < 2.15), 1, 0)

train_data = all_data[(~all_data["trial_resp_fl.rt"].isna()) | (~all_data["trial_resp_timing.rt"].isna())]

subs = task_data.participant.unique()
cutoff = 0.4
d = {
    "participant": [],
    "age_group": [],
    #'age':[],
    "framerate": [],
    "include": [],
    "include2": [],
    "approve": [],
    "acc_after_750": [],
    "acc_after_750_ontime": [],
    "acc_C_after_750": [],
    "acc_I_after_750": [],
    "mean_rt": [],
    "sd_rt": [],
    "var_rt": [],
    "on_time_total_150": [],
    "num_ontime_blocks_150": [],
    "bad_blocks_150": [],
    "on_time_total_100": [],
    "num_ontime_blocks_100": [],
    "bad_blocks_100": [],
    "train_acc_I": [],
    "train_acc_C": [],
    "train_rt_I": [],
    "train_rt_C": [],
    "train_timing": [],
}
for sub in subs:
    # get subject
    dat_sub = task_data[task_data["participant"] == sub].reset_index()
    dat_train = train_data[train_data["PROLIFIC_PID"] == sub].reset_index()
    dat_train_fl = dat_train[~dat_train["trial_resp_fl.rt"].isna()]
    dat_train_timing = dat_train[~dat_train["trial_resp_timing.rt"].isna()]

    dat_sub_ontime = dat_sub[dat_sub["ontime150"] == 1]
    # get age
    # age=float(demo[demo['PROLIFIC_PID']==sub]['age'].values[0])
    # trials with PT>750
    dat_sub750 = dat_sub[dat_sub["PT"] > 750]
    dat_sub750_ontime = dat_sub_ontime[dat_sub_ontime["PT"] > 750]
    frames = dat_sub.loc[0]["frameRate"]
    # acc after 750
    acc750 = np.mean(dat_sub750.accuracy)
    acc750_ontime = np.mean(dat_sub750_ontime.accuracy)
    acc750C = dat_sub750.groupby(["trial_type"]).accuracy.mean()["Congruent"]
    acc750I = dat_sub750.groupby(["trial_type"]).accuracy.mean()["Incongruent"]
    # mean real rt
    meanrt = np.mean(dat_sub.rt)
    sdrt = np.std(dat_sub.rt)
    varrt = np.var(dat_sub.rt)
    # proportion of trials on time
    on_time_tot_100 = np.mean(dat_sub.ontime100)  # +-100ms
    on_time_tot_150 = np.mean(dat_sub.ontime150)  # +-150ms
    # count blocks on time more than 40% of time
    on_time_blocks_100 = dat_sub.groupby("block_id").mean("ontime100")["ontime100"]
    num_ontime_blocks_100 = len(on_time_blocks_100[on_time_blocks_100 > cutoff])
    bad_blocks_100 = on_time_blocks_100[on_time_blocks_100 < cutoff].index.values
    on_time_blocks_150 = dat_sub.groupby("block_id").mean("ontime150")["ontime150"]
    num_ontime_blocks_150 = len(on_time_blocks_150[on_time_blocks_150 > cutoff])
    bad_blocks_150 = on_time_blocks_150[on_time_blocks_150 < cutoff].index.values
    # inc=1 if num_ontime_blocks_150>7 and acc750>0.7 and frames>50 else 0
    inc = 1 if num_ontime_blocks_150 > 7 and acc750 > 0.7 else 0
    inc2 = 1 if num_ontime_blocks_150 > 7 and acc750_ontime > 0.7 else 0
    app = 1 if on_time_tot_150 > 0.3 and meanrt > 1 and meanrt < 3 else 0
    # app=1 if on_time_tot_150>0.25 else 0

    # training info
    accCtr = dat_train_fl.groupby(["trial_type"])["trial_resp_fl.corr"].mean()["Congruent"]
    accItr = dat_train_fl.groupby(["trial_type"])["trial_resp_fl.corr"].mean()["Incongruent"]
    rtCtr = dat_train_fl.groupby(["trial_type"])["trial_resp_fl.rt"].mean()["Congruent"]
    rtItr = dat_train_fl.groupby(["trial_type"])["trial_resp_fl.rt"].mean()["Incongruent"]
    ontime_tr_sub = np.where(
        (dat_train_timing["trial_resp_timing.rt"] > 1.85) & (dat_train_timing["trial_resp_timing.rt"] < 2.15), 1, 0
    )
    on_time_tr150 = np.mean(ontime_tr_sub)

    d["participant"].append(sub)
    d["age_group"].append(dat_sub.loc[0]["AGE_GROUP"])
    # d['age'].append(age)
    d["framerate"].append(dat_sub.loc[0]["frameRate"])
    d["include"].append(inc)
    d["include2"].append(inc2)
    d["approve"].append(app)
    d["acc_after_750"].append(acc750)
    d["acc_after_750_ontime"].append(acc750_ontime)
    d["acc_C_after_750"].append(acc750C)
    d["acc_I_after_750"].append(acc750I)
    d["mean_rt"].append(meanrt)
    d["sd_rt"].append(sdrt)
    d["var_rt"].append(varrt)
    d["on_time_total_150"].append(on_time_tot_150)
    d["num_ontime_blocks_150"].append(num_ontime_blocks_150)
    d["bad_blocks_150"].append(bad_blocks_150)
    d["on_time_total_100"].append(on_time_tot_100)
    d["num_ontime_blocks_100"].append(num_ontime_blocks_100)
    d["bad_blocks_100"].append(bad_blocks_100)
    d["train_acc_I"].append(accItr)
    d["train_acc_C"].append(accCtr)
    d["train_rt_I"].append(rtItr)
    d["train_rt_C"].append(rtCtr)
    d["train_timing"].append(on_time_tr150)


sub_exclusion_table = pd.DataFrame(d)

bad_subs = sub_exclusion_table[sub_exclusion_table["include"] == 0].participant.values
task_data_e = task_data[~task_data.participant.isin(bad_subs)]

t_inc = len(task_data_e.participant.unique())
t_tot = len(task_data.participant.unique())
print(
    f"All included/total: {t_inc}/{t_tot} -- {np.round(t_inc / t_tot, 3)}",
)

OA_inc = len(task_data_e[task_data_e.AGE_GROUP == "OA"].participant.unique())
OA_tot = len(task_data[task_data.AGE_GROUP == "OA"].participant.unique())

YA_inc = len(task_data_e[task_data_e.AGE_GROUP == "YA"].participant.unique())
YA_tot = len(task_data[task_data.AGE_GROUP == "YA"].participant.unique())

print(f"OA included/total: {OA_inc}/{OA_tot} -- {np.round(OA_inc / OA_tot, 3)}")
print(f"YA included/total: {YA_inc}/{YA_tot} -- {np.round(YA_inc / YA_tot, 3)}")
print(task_data.shape)
print(task_data_e.shape)
task_data.to_csv("dat/task_dat_alltrial.csv")
task_data_e.to_csv("dat/task_dat_alltrial_excludedsub.csv")
sub_exclusion_table.to_csv("dat/sub_exclusion_table.csv")
