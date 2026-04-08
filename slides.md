---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
favicon: /favicon.svg
fonts:
  sans: PT Sans
  weights: '400,600,700,800,900'
info: |
  Building Models to Evaluate IBD Risk in Populations
drawings:
  persist: false
transition: slide-left
title: Building Models to Evaluate IBD Risk in Populations
---

# Building Models to Evaluate IBD Risk in Populations

Michelle Sollok and Aleksejs Sazonovs

*PREDICT, Aalborg University Copenhagen*

---
layout: two-cols
---

<div class="h-[90%] flex items-center pr-4">
  <AucIllustration />
</div>

::right::

<div class="pl-8 pt-12">

# Background: Predicting and Preventing Crohn's Disease

**5-Year Incidence Rates**
- **0.11%** in the general population
- **1%** in Crohn's first-degree relatives

**Preventitative measures**
- 25% to 100% risk reduction
<br>

**Our Predictive Test:**
- Excellent performance: **AUC = 0.9**

</div>

---
# Prevention trials: screen and pick those at high risk?

<div class="w-full h-[430px] mt-6">
  <PreventionTrials />
</div>

---
layout: center
class: text-center
---

<h1 class="text-6xl tracking-tight text-slate-800 drop-shadow-sm leading-tight">
  Prevention trials are unrealistic with<br/>
  low intervention efficacy
</h1>

---
<div class="absolute inset-0 w-full h-full p-0 m-0 overflow-hidden">
  <iframe src="https://ibdscreen.org/trial.html" class="w-[155%] h-[155%] border-none origin-top-left scale-[0.65]" title="IBDScreen Trial"></iframe>
</div>

---
# A Potential Solution: Hierarchical Profiling

<div class="w-full h-[450px] mt-2">
  <HierarchicalPrediction />
</div>

---
<div class="absolute inset-0 w-full h-full p-0 m-0 overflow-hidden">
  <iframe src="https://ibdscreen.org/" class="w-[155%] h-[155%] border-none origin-top-left scale-[0.65]" title="IBDScreen"></iframe>
</div>

---
# Future Work

<div class="mt-8 text-lg">

- **Alternative trial endpoints**
  - Biomarkers, etc.

- **Cross-predictor correlations**
  - Proteomics is probably capturing some of the smoking; living near green spaces is not independent of income, etc. 
  - First steps: https://factorexplorer.netlify.app/

- **Conditional predictors**
  - Explicitly train models for hierarchical discrimination (e.g., proteomics in high genetic risk group)
  - Important for FDRs

</div>

---
# Acknowledgements

Thank you to collaborators on the project, members of the Sazonovs lab and other PREDICT associates.

- J. Torres
- R.K. Weersma
- J.F. Colombel
- T. Jess

<div class="mt-20 text-center text-6xl font-extrabold tracking-tight text-blue-300">
  <a href="https://ibdscreen.org/" target="_blank">ibdscreen.org</a>
</div>
