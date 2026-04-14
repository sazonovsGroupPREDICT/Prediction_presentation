<template>
  <div class="flex flex-col items-center bg-white p-4 rounded-xl text-xs h-full justify-between shadow-lg border border-gray-100 w-full overflow-hidden">
    <div class="flex w-full justify-between h-[85%]">
      <!-- Left side: Distributions -->
      <div class="flex flex-col items-center w-3/5 mt-2 h-full">
        <h3 class="font-bold text-slate-700 mb-2 text-center text-sm">Population Distributions</h3>
        <div class="flex items-center w-full h-full justify-center">
            <div class="-rotate-90 text-slate-400 font-bold whitespace-nowrap text-[10px] w-4 text-center">Risk Score</div>
            <svg viewBox="-1 -6 7 11" class="w-full h-full overflow-visible">
          <!-- Y-axis -->
          <line x1="0" y1="-5" x2="0" y2="4" stroke="#e2e8f0" stroke-width="0.05" />
          
          <line x1="-0.1" y1="-4" x2="0" y2="-4" stroke="#cbd5e1" stroke-width="0.05" />
          <text x="-0.2" y="-3.8" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">4</text>
          
          <line x1="-0.1" y1="-2" x2="0" y2="-2" stroke="#cbd5e1" stroke-width="0.05" />
          <text x="-0.2" y="-1.8" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">2</text>
          
          <line x1="-0.1" y1="0" x2="0" y2="0" stroke="#cbd5e1" stroke-width="0.05" />
          <text x="-0.2" y="0.15" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">0</text>
          
          <line x1="-0.1" y1="2" x2="0" y2="2" stroke="#cbd5e1" stroke-width="0.05" />
          <text x="-0.2" y="2.15" style="font-size: 0.45px;" font-weight="600" fill="#64748b" text-anchor="end">-2</text>

          <!-- Inactive Nodes -->
          <circle 
            v-for="n in healthyNodes.filter(n => !n.active)" 
            :key="n.id" 
            :cx="n.x" 
            :cy="n.y" 
            r="0.1" 
            fill="#5eead4"
            class="transition-all duration-500 opacity-80"
          />
          <circle 
            v-for="n in diseaseNodes.filter(n => !n.active)" 
            :key="n.id" 
            :cx="n.x" 
            :cy="n.y" 
            r="0.1" 
            fill="#fb7185"
            class="transition-all duration-500 opacity-80"
          />
          
          <!-- Active Highlighted Nodes (Drawn Last = Topmost) -->
          <circle 
            v-for="n in healthyNodes.filter(n => n.active)" 
            :key="n.id + '_active'" 
            :cx="n.x" 
            :cy="n.y" 
            r="0.12" 
            fill="#14b8a6"
            stroke="#0f766e"
            stroke-width="0.05"
            filter="drop-shadow(0px 0.2px 0.4px rgba(20, 184, 166, 0.5))"
            class="transition-all duration-500 opacity-100 drop-shadow-sm"
          />
          <circle 
            v-for="n in diseaseNodes.filter(n => n.active)" 
            :key="n.id + '_active'" 
            :cx="n.x" 
            :cy="n.y" 
            r="0.12" 
            fill="#e11d48"
            stroke="#9f1239"
            stroke-width="0.05"
            filter="drop-shadow(0px 0.2px 0.4px rgba(225, 29, 72, 0.5))"
            class="transition-all duration-500 opacity-100 drop-shadow-sm"
          />
        </svg>
        </div>
        <div class="flex gap-6 mt-4 font-bold text-sm">
          <span class="text-teal-500">Healthy</span>
          <span class="text-rose-500">CD</span>
        </div>
      </div>

      <!-- Right side: Comparisons -->
      <div class="flex flex-col items-center w-2/5 border-l border-gray-100 pl-4 mt-2">
        <h3 class="font-bold text-slate-700 mb-2 text-center leading-tight text-sm">Random Pairwise Comparisons</h3>
        
        <div class="flex-grow overflow-hidden w-full flex flex-col gap-1 relative mask-image-bottom">
          <transition-group name="list" tag="div" class="w-full flex flex-col gap-2">
            <div v-for="pair in pairs" :key="pair.id" class="flex items-center justify-between text-base w-full py-0.5">
              <div class="w-3 h-3 rounded-full bg-teal-500 shrink-0 shadow-sm"></div>
              <div class="flex-grow border-t-2 border-slate-100 mx-2"></div>
              <div class="font-black shrink-0 w-4 text-center" :class="pair.correct ? 'text-teal-500' : 'text-rose-500'">
                {{ pair.h < pair.d ? '&lt;' : '&gt;' }}
              </div>
              <div class="flex-grow border-t-2 border-slate-100 mx-2"></div>
              <div class="w-3 h-3 rounded-full bg-rose-500 shrink-0 shadow-sm"></div>
              <div class="w-16 text-right font-bold text-xs shrink-0" :class="pair.correct ? 'text-teal-500' : 'text-rose-500'">
                {{ pair.correct ? 'Correct' : 'Incorrect' }}
              </div>
            </div>
          </transition-group>
        </div>

        <div class="mt-6 pt-4 flex flex-col items-center w-full bg-white border-t border-gray-100">
          <div class="text-center mt-0" v-if="pairs.length > 0">
            <div class="font-bold text-slate-500 text-[10px]">{{ runningCorrect }}/{{ runningTotal }} Pairs Correct</div>
            <div class="text-2xl font-black text-slate-800 leading-none">AUC = {{ (runningCorrect / runningTotal).toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-4 text-[10px] text-slate-400 justify-center w-full pt-2 border-t border-gray-50 mt-auto">
        <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bg-teal-500"></div> Healthy (Lower typically)</div>
        <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bg-rose-500"></div> CD (Higher typically)</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const healthyNodes = ref([])
const diseaseNodes = ref([])
const pairs = ref([])
let pairId = 0
let timer = null

// Track total running accuracy
const runningCorrect = ref(0)
const runningTotal = ref(0)

function boxMuller() {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function createData(mean, std, count, centerX, color) {
  const data = []
  for (let i = 0; i < count; i++) {
    data.push(boxMuller() * std + mean)
  }
  
  const binSize = 0.2
  const buckets = {}
  const res = []
  
  data.sort((a,b) => a-b).forEach((val, i) => {
    const bin = Math.round(val / binSize)
    if (!buckets[bin]) buckets[bin] = []
    buckets[bin].push({
      id: color + i,
      val: val,
      y: -val // SVG Y is down
    })
  })
  
  for (const bin in buckets) {
    const items = buckets[bin]
    const n = items.length
    items.forEach((item, idx) => {
      // Hexagonal-ish packing
      const offset = (idx - (n - 1) / 2) * 0.15
      item.x = centerX + offset
      item.active = false
      res.push(item)
    })
  }
  
  return res
}

onMounted(() => {
  // Generate data. Diff of means ~ 1.8 with std 1 gives ~0.9 AUC
  healthyNodes.value = createData(0, 1, 200, 1.5, 'h')
  diseaseNodes.value = createData(1.8, 1, 200, 4.2, 'd')
  
  // Pre-fill initial pairs to get exactly 90% (e.g. 9 out of 10 correct)
  // to perfectly illustrate the math and start the AUC at 0.90.
  for(let i=0; i<10; i++) {
     samplePair(true, i === 4) // Force one deliberate incorrect for visual reality
  }

  timer = setInterval(() => {
    samplePair()
  }, 3600)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function samplePair(silent = false, forceIncorrect = false) {
  healthyNodes.value.forEach(n => n.active = false)
  diseaseNodes.value.forEach(n => n.active = false)
  
  let hNode, dNode, correct;
  
  // Basic random
  hNode = healthyNodes.value[Math.floor(Math.random() * healthyNodes.value.length)]
  dNode = diseaseNodes.value[Math.floor(Math.random() * diseaseNodes.value.length)]
  correct = hNode.val < dNode.val
  
  // Override for initial setup demonstration if needed
  if (forceIncorrect) {
     hNode = healthyNodes.value[healthyNodes.value.length - 1] // Highest healthy
     dNode = diseaseNodes.value[0] // Lowest disease
     correct = false
  } else if (silent && !correct) {
     // If pre-filling silently and we want it to be correct (to artificially hit exactly 9/10)
     hNode = healthyNodes.value[0]
     dNode = diseaseNodes.value[diseaseNodes.value.length - 1]
     correct = true
  }
  
  if (!silent) {
    hNode.active = true
    dNode.active = true
  }
  
  runningTotal.value++
  if (correct) runningCorrect.value++
  
  pairs.value.unshift({
    id: pairId++,
    h: hNode.val,
    d: dNode.val,
    correct
  })
  
  if (pairs.value.length > 3) {
    pairs.value.pop()
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
.mask-image-bottom {
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}
</style>
