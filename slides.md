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

<img src="/CherryPrimary.svg" class="w-1/4 absolute bottom-8 right-8" alt="Cherry Primary">

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

<div class="absolute inset-0 w-full h-full p-0 m-0 overflow-hidden">
  <iframe src="https://ibdscreen.org/trial" class="w-[155%] h-[155%] border-none origin-top-left scale-[0.65]" title="IBDScreen"></iframe>
</div>



---

# Trial design trifecta

<div class="mt-8 text-lg">

**Non-negotiables:**
  - Effacious interventions
  - Great predictor
  - Sufficient sample size
  
We are aiming for a 2-arm trial with 80\% power and target p-value $\alpha$=0.05


</div>


---

# What comes after trials?
- Predicting IBD in top-risk FDRs doesn't capture 95% of cases
- Will never refer every high-CRP individual to colonoscopy
- Predict IBD in the general population using a hierarchical testing approach

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

<div class="mt-10 text-center">
  <div class="inline-block border-b-8 border-blue-300 pb-2">
    <a href="https://ibdscreen.org/" target="_blank" class="text-6xl font-extrabold tracking-tight text-blue-300 !border-none">ibdscreen.org</a>
  </div>
</div>


---


## Supplementary - sample size

Calculating the required sample size (n) per arm for a two-arm trial comparing a control proportion $(p_C)$ to a treatment proportion $(p_T)$ with a two-sided z-test $\alpha$ at significance level α and power $1-\beta$.


With a two-sided z-test at significance level α and power 1−β. 

$H_0 : p_T = p_C$, 
$H_1 : p_T \neq p_C$

‘The z test formula compares the z statistic with the z critical value to test whether there is a difference in the means of two sample populations’

---

## Supplementary - sample size
We find the sample size n by:
$$
n = \frac{
\left(
z_{1-\alpha/2} \sqrt{2\bar{p}(1-\bar{p})}
+
z_{1-\beta} \sqrt{p_C(1-p_C) + p_T(1-p_T)}
\right)^2
}{
(p_C - p_T)^2
}
$$



Where the treated arm depends on the baseline subgroup risk $p_{\text{base}}$ and the efficacy $E \in [0,1]$
$$
p_T = p_{\text{base}} (1 - E)
$$




