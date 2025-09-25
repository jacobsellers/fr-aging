import arviz as az
import numpy as np
import pandas as pd
import bambi as bmb


def prep_df(dat):
    conds = [
        (dat["trial_type"] == "Congruent") & (dat["AGE_GROUP"] == "YA"),
        (dat["trial_type"] == "Congruent") & (dat["AGE_GROUP"] == "OA"),
        (dat["trial_type"] == "Incongruent") & (dat["AGE_GROUP"] == "YA"),
        (dat["trial_type"] == "Incongruent") & (dat["AGE_GROUP"] == "OA"),
    ]

    names_x1 = [0.5, 0.5, -0.5, -0.5]
    names_x2 = [-0.5, 0.5, -0.5, 0.5]
    names_x3 = [-0.5, 0.5, 0.5, -0.5]

    dat["x_congr"] = np.select(conds, names_x1)
    dat["x_age"] = np.select(conds, names_x2)
    dat["x_congrxage"] = np.select(conds, names_x3)

    dat0 = dat[["participant", "trial_type", "AGE_GROUP", "x_congr", "x_age", "x_congrxage", "PT", "accuracy"]]

    return dat0


def probd(x):
    return len(x[x > 0]) / (len(x))


def run_rolling_lr(dat, times=np.arange(0, 1010, 10), cov_names=["x_congr", "x_age", "x_congrxage"], halfwindow=50):
    b1 = np.zeros(shape=times.shape)
    b2 = np.zeros(shape=times.shape)
    b3 = np.zeros(shape=times.shape)
    max_rhat = np.zeros(shape=times.shape)

    for i, t in enumerate(times):
        dat_fit = dat[(dat["PT"] > t - halfwindow) & (dat["PT"] < t + halfwindow)][
            ["participant", cov_names[0], cov_names[1], cov_names[2], "accuracy"]
        ].reset_index(drop=True)
        pt_lr2 = bmb.Model(
            f"accuracy ~ {cov_names[0]} + {cov_names[1]} + {cov_names[2]} + (1|participant)",
            dat_fit,
            family="bernoulli",
        )
        print(f"fitting PT {t}")
        fit_lr = pt_lr2.fit(draws=2000, tune=2000, target_accept=0.95)
        sum_lr = az.summary(
            fit_lr, var_names=[cov_names[0], cov_names[1], cov_names[2]], stat_funcs={"probd": probd}, extend=True
        )
        sum_pd = sum_lr.probd

        b1[i] = sum_pd[cov_names[0]]
        b2[i] = sum_pd[cov_names[1]]
        b3[i] = sum_pd[cov_names[2]]
        max_rhat[i] = np.max(sum_lr.r_hat.values)

    b1_pds = [1 - b0 if b0 < 0.5 else b0 for b0 in b1]
    b2_pds = [1 - b0 if b0 < 0.5 else b0 for b0 in b2]
    b3_pds = [1 - b0 if b0 < 0.5 else b0 for b0 in b3]

    rolling_lr_pds2 = pd.DataFrame(
        {
            "pt": times,
            f"{cov_names[0]}_p_over0": b1,
            f"{cov_names[1]}_p_over0": b2,
            f"{cov_names[2]}_p_over0": b3,
            f"{cov_names[0]}_pd": b1_pds,
            f"{cov_names[1]}_pd": b2_pds,
            f"{cov_names[2]}_pd": b3_pds,
            "max_rhat": max_rhat,
        }
    )

    return rolling_lr_pds2


def pd_clusters(df, time_col="pt", p_col="pval", threshold=0.95, op=">", assume_sorted=False):
    """
    Find all contiguous clusters where p_col exceeds threshold.
    Contiguity is defined by consecutive rows (no time-gap logic).

    Returns a DataFrame with columns:
      cluster_id, start_idx, end_idx, start_time, end_time, length, duration

    If no clusters, returns an empty DataFrame with the same columns.
    """
    if not assume_sorted:
        df = df.sort_values(time_col).reset_index(drop=True)

    # comparison op
    cond = df[p_col] >= threshold if op == ">=" else df[p_col] > threshold
    cond = cond.fillna(False)

    if not cond.any():
        return pd.DataFrame(
            columns=["cluster_id", "start_idx", "end_idx", "start_time", "end_time", "length", "duration"]
        )

    # label runs: increment id whenever cond changes
    run_id = (cond != cond.shift(fill_value=False)).cumsum()

    # keep only True runs and summarize
    out = (
        df.loc[cond, [time_col]]
        .groupby(run_id[cond])
        .agg(start_time=(time_col, "first"), end_time=(time_col, "last"))
        .reset_index(drop=True)
    )

    # attach indices/length/duration
    # map run_id -> first/last index inside df where cond is True
    idxs = (
        cond.to_frame("cond")
        .assign(run_id=run_id)
        .loc[cond]
        .groupby("run_id")
        .apply(lambda s: pd.Series({"start_idx": s.index[0], "end_idx": s.index[-1]}))
        .reset_index(drop=True)
    )

    out = pd.concat([idxs, out], axis=1)
    out["length"] = out["end_idx"] - out["start_idx"] + 1
    out["duration"] = out["end_time"] - out["start_time"]
    out.insert(0, "cluster_id", range(len(out)))
    return out
