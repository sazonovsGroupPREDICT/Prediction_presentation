<template>
  <div class="flex flex-col w-full h-full bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-xs">
    
    <!-- Controls -->
    <div class="flex justify-center gap-2 mb-4 z-10 relative mt-2">
      <button 
        v-for="thresh in thresholds" 
        :key="thresh.id"
        @click="activeThreshold = thresh.id"
        class="px-3 py-1 rounded-full font-bold transition-all text-[10px] border"
        :class="activeThreshold === thresh.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'"
      >
        {{ thresh.label }}
      </button>
    </div>

    <div class="flex w-full justify-around h-full gap-8 min-h-0">
      <!-- General Population -->
      <div class="flex flex-col items-center flex-1 h-full min-h-0 relative p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h3 class="font-bold text-slate-700 mb-4 text-center text-lg">General Population</h3>
        <div class="w-full flex-grow min-h-0 relative flex items-center justify-center h-full">
            <div class="-rotate-90 text-slate-400 font-bold whitespace-nowrap text-[10px] absolute left-0">Risk Score (Z)</div>
            <svg viewBox="-4 -5 8 10" class="w-full h-full overflow-visible">
              <!-- Y-axis -->
              <line x1="-2.8" y1="-4" x2="-2.8" y2="4" stroke="#e2e8f0" stroke-width="0.03" />
              <line x1="-2.9" y1="-4" x2="-2.8" y2="-4" stroke="#cbd5e1" stroke-width="0.03" />
              <text x="-3.0" y="-3.85" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">4</text>
              <line x1="-2.9" y1="-2" x2="-2.8" y2="-2" stroke="#cbd5e1" stroke-width="0.03" />
              <text x="-3.0" y="-1.85" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">2</text>
              <line x1="-2.9" y1="0" x2="-2.8" y2="0" stroke="#cbd5e1" stroke-width="0.03" />
              <text x="-3.0" y="0.15" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">0</text>
              <line x1="-2.9" y1="2" x2="-2.8" y2="2" stroke="#cbd5e1" stroke-width="0.03" />
              <text x="-3.0" y="2.15" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">-2</text>

              <!-- Threshold Lines -->
              <g v-for="t in thresholds" :key="'line_gen_'+t.id">
                <line 
                  v-if="activeThreshold === t.id"
                  x1="-2.8" :y1="-t.val" x2="3" :y2="-t.val" 
                  stroke="#ef4444" stroke-width="0.04" stroke-dasharray="0.1, 0.1" 
                />
                <text 
                  v-if="activeThreshold === t.id"
                  x="-3.0" :y="-t.val - 0.1" style="font-size: 0.3px;" font-weight="bold" fill="#ef4444" text-anchor="end"
                >{{ t.genPopCd }}% CD</text>
                <text 
                  v-if="activeThreshold === t.id"
                  x="3.2" :y="-t.val - 0.1" style="font-size: 0.3px;" font-weight="bold" fill="#ef4444" text-anchor="start" 
                >{{ t.label }}</text>
              </g>

              <!-- Nodes (Healthy first, then Disease on top) -->
              <circle 
                v-for="n in genPopNodes.filter(n => !n.disease)" 
                :key="n.id" 
                :cx="n.x" 
                :cy="n.y" 
                r="0.04" 
                fill="#5eead4"
                :class="activeThreshold ? (n.val >= currentThresholdVal ? 'opacity-100' : 'opacity-20') : 'opacity-80'"
                class="transition-opacity duration-300"
              />
              <circle 
                v-for="n in genPopNodes.filter(n => n.disease)" 
                :key="n.id + '_d'" 
                :cx="n.x" 
                :cy="n.y" 
                r="0.07" 
                fill="#f43f5e"
                filter="drop-shadow(0px 0.1px 0.2px rgba(225, 29, 72, 0.4))"
                :class="activeThreshold ? (n.val >= currentThresholdVal ? 'opacity-100' : 'opacity-20') : 'opacity-100 z-10'"
                class="transition-opacity duration-300"
              />
            </svg>
            <div class="absolute top-2 text-rose-500 font-extrabold text-[10px] text-center w-full uppercase tracking-[0.2em] drop-shadow-sm">High Risk</div>
            <div class="absolute bottom-2 text-teal-500 font-extrabold text-[10px] text-center w-full uppercase tracking-[0.2em] drop-shadow-sm">Low Risk</div>
        </div>
      </div>

      <!-- First Degree Relatives -->
      <div class="flex flex-col items-center flex-1 h-full min-h-0 relative p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h3 class="font-bold text-slate-700 mb-4 text-center text-lg">First-Degree Relatives</h3>
        <div class="w-full flex-grow min-h-0 relative flex items-center justify-center h-full">
            <div class="-rotate-90 text-slate-400 font-bold whitespace-nowrap text-[10px] absolute left-0">Risk Score (Z)</div>
            <svg viewBox="-4 -5 8 10" class="w-full h-full overflow-visible">
              <!-- Y-axis -->
              <line x1="-2.8" y1="-4" x2="-2.8" y2="4" stroke="#e2e8f0" stroke-width="0.03" />
              <line x1="-2.9" y1="-4" x2="-2.8" y2="-4" stroke="#cbd5e1" stroke-width="0.03" />
              <text x="-3.0" y="-3.85" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">4</text>
              <line x1="-2.9" y1="-2" x2="-2.8" y2="-2" stroke="#cbd5e1" stroke-width="0.03" />
              <text x="-3.0" y="-1.85" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">2</text>
              <line x1="-2.9" y1="0" x2="-2.8" y2="0" stroke="#cbd5e1" stroke-width="0.03" />
              <text x="-3.0" y="0.15" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">0</text>
              <line x1="-2.9" y1="2" x2="-2.8" y2="2" stroke="#cbd5e1" stroke-width="0.03" />
              <text x="-3.0" y="2.15" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">-2</text>

              <!-- Threshold Lines -->
              <g v-for="t in thresholds" :key="'line_fdr_'+t.id">
                <line 
                  v-if="activeThreshold === t.id"
                  x1="-2.8" :y1="-t.val" x2="3" :y2="-t.val" 
                  stroke="#ef4444" stroke-width="0.04" stroke-dasharray="0.1, 0.1" 
                />
                <text 
                  v-if="activeThreshold === t.id"
                  x="-3.0" :y="-t.val - 0.1" style="font-size: 0.3px;" font-weight="bold" fill="#ef4444" text-anchor="end"
                >{{ t.fdrCd }}% CD</text>
                <text 
                  v-if="activeThreshold === t.id"
                  x="3.2" :y="-t.val - 0.1" style="font-size: 0.3px;" font-weight="bold" fill="#ef4444" text-anchor="start" 
                >{{ t.label }}</text>
              </g>

              <!-- Nodes (Healthy first, then Disease on top) -->
              <circle 
                v-for="n in fdrNodes.filter(n => !n.disease)" 
                :key="n.id" 
                :cx="n.x" 
                :cy="n.y" 
                r="0.04" 
                fill="#5eead4"
                :class="activeThreshold ? (n.val >= currentThresholdVal ? 'opacity-100' : 'opacity-20') : 'opacity-80'"
                class="transition-opacity duration-300"
              />
              <circle 
                v-for="n in fdrNodes.filter(n => n.disease)" 
                :key="n.id + '_d'" 
                :cx="n.x" 
                :cy="n.y" 
                r="0.07" 
                fill="#f43f5e"
                filter="drop-shadow(0px 0.1px 0.2px rgba(225, 29, 72, 0.4))"
                :class="activeThreshold ? (n.val >= currentThresholdVal ? 'opacity-100' : 'opacity-20') : 'opacity-100 z-10'"
                class="transition-opacity duration-300"
              />
            </svg>
            <div class="absolute top-2 text-rose-500 font-extrabold text-[10px] text-center w-full uppercase tracking-[0.2em] drop-shadow-sm">High Risk</div>
            <div class="absolute bottom-2 text-teal-500 font-extrabold text-[10px] text-center w-full uppercase tracking-[0.2em] drop-shadow-sm">Low Risk</div>
        </div>
      </div>
    </div>
    
    <!-- Legend -->
    <div class="flex gap-4 text-[10px] text-slate-400 justify-center w-full pt-4 mt-auto">
        <div class="flex items-center gap-1"><div class="w-3 h-3 rounded-full bg-teal-300 opacity-80"></div> Healthy</div>
        <div class="flex items-center gap-1"><div class="w-4 h-4 rounded-full bg-rose-500 shadow-sm"></div> Crohn's Disease</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const activeThreshold = ref('random')

const thresholds = [
  { id: 'top1', label: 'Top 1%', val: 2.33, genPopCd: '3', fdrCd: '27' },
  { id: 'top5', label: 'Top 5%', val: 1.64, genPopCd: '1', fdrCd: '11' },
  { id: 'top10', label: 'Top 10%', val: 1.28, genPopCd: '<1', fdrCd: '7' },
  { id: 'random', label: 'Random', val: -3.8, genPopCd: '0.11', fdrCd: '1' }
]

const currentThresholdVal = computed(() => {
  const t = thresholds.find(t => t.id === activeThreshold.value)
  return t ? t.val : 99
})

const genPopNodes = ref([])
const fdrNodes = ref([])

function boxMuller() {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Gen pop: ~0.11% CD baseline. 
// FDR pop: ~1% CD baseline. Shift mean slightly and increase variance to simulate risk?
// Actually we just generate a swarm plot shape and randomly tag nodes based on screenshots.

function createSwarm(count, rSeed, cdChanceBase, cdChanceMultiplier) {
  const data = []
  for (let i = 0; i < count; i++) {
    // Basic normal distribution
    let val = boxMuller() * 1.2;
    data.push(val)
  }
  
  const binSize = 0.08
  const buckets = {}
  const res = []
  
  data.sort((a,b) => a-b).forEach((val, i) => {
    const bin = Math.round(val / binSize)
    if (!buckets[bin]) buckets[bin] = []
    
    // Assign disease status based on value (higher value = much higher chance)
    let isDisease = false
    // E.g. probability = base + (val > 0 ? val * multiplier : 0)
    let prob = cdChanceBase + (val > 0 ? val * cdChanceMultiplier : 0)
    if (Math.random() < prob) isDisease = true

    buckets[bin].push({
      id: i,
      val: val,
      y: -val,
      disease: isDisease
    })
  })
  
  for (const bin in buckets) {
    const items = buckets[bin]
    const n = items.length
    items.forEach((item, idx) => {
      // Hexagonal-ish packing
      const offset = (idx - (n - 1) / 2) * 0.08
      item.x = offset
      res.push(item)
    })
  }
  
  return res
}

onMounted(() => {
  // Generate 1500 points to look dense like the screenshot
  // General Pop: very low base chance, slight increase at top
  genPopNodes.value = createSwarm(1200, 1, 0.001, 0.002)
  
  // Hand-tweak the very top nodes in Gen Pop to match screenshot roughly (3 red dots near top)
  let topGen = genPopNodes.value.sort((a,b) => b.val - a.val)
  topGen.forEach(n => n.disease = false)
  if (topGen.length > 20) {
    topGen[3].disease = true
    topGen[11].disease = true
    topGen[45].disease = true
    topGen[120].disease = true
  }

  // FDR Pop: higher base chance, much higher at top
  fdrNodes.value = createSwarm(1200, 2, 0.005, 0.03)

  // Force some density at the top for FDR to match the "27% CD" at Top 1% visually
  let topFdr = fdrNodes.value.sort((a,b) => b.val - a.val)
  for(let i=0; i<30; i++) { // Top ~2.5% 
    if(Math.random() < 0.25) topFdr[i].disease = true
  }
  for(let i=30; i<150; i++) { // Top ~12%
    if(Math.random() < 0.1) topFdr[i].disease = true
  }
})

</script>
