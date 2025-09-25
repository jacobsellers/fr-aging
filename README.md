# Inhibitory control and Aging

This repository contains the code and data associated with the paper:

> Jacob Sellers, Han Zhang, John Jonides, Taraz Lee "Global slowing of response preparation explains age effects in inhibitory control tasks"

---

## Contents
- `code/`: Analysis scripts and helper functions
- `dat/`: Data for the project
- `figs/`: Figures generated from analyses
- `figs/`: Model fits for the response preparation model and rolling logistic regression
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
2. Run the analysis:
   ```bash
   python code/analysis.py
   ```
3. Figures will be saved in `figs/`.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Citation
If you use this code or data, please cite:

```bibtex
@article{Author2025Paper,
  title   = {Full Paper Title},
  author  = {Author, A. and Collaborator, B.},
  journal = {Journal Name},
  year    = {2025},
  doi     = {10.xxxx/xxxxx}
}
```