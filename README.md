# Inhibitory Control and Aging

This repository contains the code and data associated with the paper:

> Jacob Sellers, Han Zhang, John Jonides, Taraz Lee "Global slowing of response preparation explains age effects in inhibitory control tasks"

---

## Contents
- `code/`: Analysis scripts and helper functions
  - `analyze_behavior_rpm.py`: generates figures/summaries for behavior and model fits
  - `fit_model.py`: fits computational model of response preparation to data
  - `fit_rollingregression.py`: fits rolling logistic regression to data
  - `generate_rpm_predictions.py`: generates rpm predictions for alternative hyptotheses
  - `preprocess_dat.py`: cleans data and applies trial/participant exclusions
  - `sim_rt_from_rpm.py`: generates simulated free RT based off model fit
  - `utils/`: helper functions
- `dat/`: Data for the project. Hosted on [OSF](https://osf.io/dhkve/)
- `figs/`: Figures generated from analyses
- `fits/`: Model fits for the response preparation model and rolling logistic regression. Hosted on [OSF](https://osf.io/dhkve/)
- `results/`: Summary tables for the response preparation model and rolling logistic regression
- `requirements.txt`: Python package requirements

---

## Getting Started

### Clone the repository
```bash
git clone https://github.com/jacobsellers/paper-project.git
cd paper-project
```

### Create environment & install dependencies
```bash
python3 -m venv venv
source venv/bin/activate   # On Mac/Linux
venv\Scripts\activate      # On Windows

pip install -r requirements.txt
```

---

## Reproducing the Results
1. Download the dataset (see `data/README.md` for instructions).
2. Run code in the following order:
    1. Generate alternative RPM hypotheses
    ```bash
    python code/generate_rpm_predictions.py
    ```
    2. Run the preprocessing script
    ```bash
    python code/preprocess_dat.py
    ```
    3. Fit the RPM and rolling logistic regression to the data
    ```bash
    python code/fit_model.py
    python code/fit_rollingregression.py
    ```
    4. Plot and summarize behavior and modeling results
    ```bash
    python code/analyze_behavior_rpm.py
    ```
    5. Generate free RT predictions based off RPM predictions
    ```bash
    python code/sim_rt_from_rpm.py
    ```
3. Model fits will be saved in `fits/`. Figures will be saved in `figs/`. Analysis summaries will be saved in `results/`.

---

## License
This project is licensed under the [MIT License](LICENSE).