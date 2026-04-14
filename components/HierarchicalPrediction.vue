<template>
  <div class="h-full w-full flex flex-col items-center bg-white p-6 rounded-xl shadow-lg border border-gray-100 overflow-hidden relative" @click="replay">
    <p class="text-slate-400 text-xs mb-2 uppercase tracking-widest absolute top-4 right-4 animate-pulse cursor-pointer z-50">Click anywhere to replay</p>
    
    <div class="flex-grow w-full relative mt-4">
      <svg viewBox="0 0 1200 500" class="w-full h-full overflow-visible font-sans">

        <!-- Legend -->
        <g transform="translate(10, -10)">
           <circle cx="0" cy="0" r="6" fill="#10b981" />
           <g transform="translate(15, 5)">
             <text text-anchor="start" style="font-size: 14px;" font-weight="bold" fill="#64748b">Healthy Population</text>
           </g>
           <circle cx="180" cy="0" r="7" fill="#ef4444" />
           <g transform="translate(195, 5)">
             <text text-anchor="start" style="font-size: 14px;" font-weight="bold" fill="#64748b">Hidden IBD Case</text>
           </g>
        </g>

        <!-- Start Area -->
        <g class="transition-opacity duration-500" :class="stage >= 0 ? 'opacity-100' : 'opacity-0'">
           <rect x="0" y="235" width="80" height="30" rx="15" fill="#10b981" />
           <g transform="translate(40, 255)">
             <text text-anchor="middle" font-weight="bold" style="font-size: 14px;" fill="#ffffff">100,000</text>
           </g>
        </g>

        <!-- Static Background Connecting Arrows -->
        <g stroke="#cbd5e1" stroke-width="2">
          <!-- Start -> G1 -->
          <path d="M 80 250 L 175 250" />
          <polygon points="170,245 180,250 170,255" fill="#cbd5e1" stroke="none" />

          <!-- G1 -> G2 -->
          <path d="M 185 250 L 345 250" />
          <polygon points="340,245 350,250 340,255" fill="#cbd5e1" stroke="none" />

          <!-- G2 -> G3 -->
          <path d="M 355 250 L 515 250" />
          <polygon points="510,245 520,250 510,255" fill="#cbd5e1" stroke="none" />

          <!-- G3 -> G4 -->
          <path d="M 525 250 L 685 250" />
          <polygon points="680,245 690,250 680,255" fill="#cbd5e1" stroke="none" />

          <!-- G4 -> G5 -->
          <path d="M 695 250 L 855 250" />
          <polygon points="850,245 860,250 850,255" fill="#cbd5e1" stroke="none" />

          <!-- G5 -> Target -->
          <path d="M 865 250 L 965 250" />
          <polygon points="960,245 970,250 960,255" fill="#cbd5e1" stroke="none" />
        </g>

        <!-- The 5 Gates -->
        <g v-for="(gate, idx) in gates" :key="gate.id" class="transition-opacity duration-500" :class="stage >= idx ? 'opacity-100' : 'opacity-0'">
          
          <g :transform="`translate(${gate.x}, 0)`">
             <!-- Top Stack -->
             <text y="60" text-anchor="middle" font-weight="bold" style="font-size: 16px;" :fill="gate.color">{{ gate.name }}</text>
             <text y="80" text-anchor="middle" style="font-size: 12px;" fill="#64748b">{{ gate.auc }}</text>
             <text y="95" text-anchor="middle" style="font-size: 12px;" fill="#64748b">{{ gate.cost }}</text>
             <!-- Bottom Stack -->
             <text y="420" text-anchor="middle" font-weight="bold" style="font-size: 14px;" :fill="gate.color">{{ gate.select }}</text>
             
             <!-- Vertical Barrier Line -->
             <rect x="-4" y="110" width="8" height="280" rx="4" :fill="gate.color" opacity="0.4" />
          </g>
          
          <!-- Number Passing (shown dynamically in between gates) -->
          <g :transform="`translate(${gate.passedX}, 240)`" class="transition-opacity duration-500" :class="stage > idx ? 'opacity-100' : 'opacity-0'">
             <text text-anchor="middle" font-weight="bold" style="font-size: 14px;" fill="#475569">{{ gate.passed }}</text>
          </g>
        </g>

        <!-- Final Target Box -->
        <g class="transition-opacity duration-700" :class="stage >= 6 ? 'opacity-100' : 'opacity-0'">
          <rect x="970" y="80" width="220" height="340" rx="10" fill="#f8fafc" stroke="#10b981" stroke-width="4" />
          
          <!-- Header -->
          <path d="M 970 90 Q 970 80 980 80 L 1180 80 Q 1190 80 1190 90 L 1190 120 L 970 120 Z" fill="#ccfbf1" />
          <g transform="translate(1080, 105)">
            <text text-anchor="middle" style="font-size: 16px;" font-weight="bold" fill="#047857">Candidate IBD cohort</text>
          </g>

          <!-- The Final Ball Landing Spot -->
          <rect x="1065" y="125" width="30" height="30" rx="4" fill="#f1f5f9" />
          <g transform="translate(1080, 165)">
            <text text-anchor="middle" style="font-size: 11px;" font-weight="bold" fill="#334155">0.2%</text>
          </g>

          <!-- PPV & Sens -->
          <rect x="980" y="180" width="95" height="40" rx="4" fill="#f1f5f9" />
          <g transform="translate(1027, 200)">
            <text text-anchor="middle" style="font-size: 18px;" font-weight="bold" fill="#10b981">75.0%</text>
            <text y="13" text-anchor="middle" style="font-size: 9px;" font-weight="bold" fill="#94a3b8">PPV</text>
          </g>

          <rect x="1085" y="180" width="95" height="40" rx="4" fill="#f1f5f9" />
          <g transform="translate(1132, 200)">
            <text text-anchor="middle" style="font-size: 18px;" font-weight="bold" fill="#f59e0b">18.3%</text>
            <text y="13" text-anchor="middle" style="font-size: 9px;" font-weight="bold" fill="#94a3b8">SENSITIVITY</text>
          </g>

          <!-- Cohort & Enrichment -->
          <rect x="980" y="230" width="95" height="40" rx="4" fill="#f1f5f9" />
          <g transform="translate(1027, 250)">
            <text text-anchor="middle" style="font-size: 16px;" font-weight="bold" fill="#334155">245</text>
            <text y="13" text-anchor="middle" style="font-size: 9px;" font-weight="bold" fill="#94a3b8">COHORT SIZE</text>
          </g>

          <rect x="1085" y="230" width="95" height="40" rx="4" fill="#f1f5f9" />
          <g transform="translate(1132, 250)">
            <text text-anchor="middle" style="font-size: 16px;" font-weight="bold" fill="#334155">75.0x</text>
            <text y="13" text-anchor="middle" style="font-size: 9px;" font-weight="bold" fill="#94a3b8">ENRICHMENT</text>
          </g>

          <!-- Cost -->
          <rect x="980" y="280" width="95" height="40" rx="4" fill="#f1f5f9" />
          <g transform="translate(1027, 300)">
            <text text-anchor="middle" style="font-size: 16px;" font-weight="bold" fill="#334155">€449.1K</text>
            <text y="13" text-anchor="middle" style="font-size: 9px;" font-weight="bold" fill="#94a3b8">TOTAL COST</text>
          </g>

          <rect x="1085" y="280" width="95" height="40" rx="4" fill="#f1f5f9" />
          <g transform="translate(1132, 300)">
            <text text-anchor="middle" style="font-size: 16px;" font-weight="bold" fill="#334155">€2.5K</text>
            <text y="13" text-anchor="middle" style="font-size: 9px;" font-weight="bold" fill="#94a3b8">COST/CASE</text>
          </g>

          <!-- Final AUC Banner -->
          <rect x="980" y="330" width="200" height="45" rx="4" fill="#f1f5f9" />
          <g transform="translate(1080, 354)">
            <text text-anchor="middle" style="font-size: 20px;" font-weight="bold" fill="#ef4444">0.939</text>
            <text y="15" text-anchor="middle" style="font-size: 9px;" font-weight="bold" fill="#94a3b8">EQUIVALENT SINGLE-TEST AUC</text>
          </g>
        </g>

        <!-- Animated Balls Layer -->
        <!-- Draw green balls first, then red balls so red is always fully visible on top -->
        <circle 
          v-for="ball in balls.filter(b => !b.isRed)" 
          :key="ball.id"
          :cx="ball.x"
          :cy="ball.y"
          :r="ball.r"
          :fill="ball.color"
          :opacity="ball.opacity"
          class="transition-all duration-700 ease-in-out"
        />
        <circle 
          v-for="ball in balls.filter(b => b.isRed)" 
          :key="ball.id"
          :cx="ball.x"
          :cy="ball.y"
          :r="ball.r"
          :fill="ball.color"
          :opacity="ball.opacity"
          class="transition-all duration-700 ease-in-out"
        />
        
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  redMultiplier: {
    type: Number,
    default: 3
  }
})

// Gate definitions matched directly from the screenshot
const gates = [
  { id: 1, name: "Family Risk", x: 180, passedX: 265, auc: "AUC 0.75", cost: "Cost: Available", select: "28% Select", passed: "27,470", color: "#3b82f6" },
  { id: 2, name: "Bloodwork", x: 350, passedX: 435, auc: "AUC 0.75", cost: "Cost: Available", select: "28% Select", passed: "7,691", color: "#6366f1" },
  { id: 3, name: "Calprotectin", x: 520, passedX: 605, auc: "AUC 0.85", cost: "Cost: €25", select: "20% Select", passed: "1,500", color: "#eab308" },
  { id: 4, name: "Omics Panel", x: 690, passedX: 775, auc: "AUC 0.85", cost: "Cost: €100", select: "36% Select", passed: "534", color: "#fbbf24" },
  { id: 5, name: "Imaging", x: 860, passedX: 915, auc: "AUC 0.90", cost: "Cost: €200", select: "46% Select", passed: "245", color: "#ef4444" }
]

const balls = ref([])
const stage = ref(0)
let timeouts = []

// Uses exactly 500 balls mapped physically to math attrition logic
function initBalls() {
  balls.value = []
  
  const targetRedEnd = 1 * props.redMultiplier;
  
  // Exact fraction logic stopping at each stage to sum to 500 total
  const FATES = [
    ...Array(363 - (targetRedEnd - 1)).fill(1),
    ...Array(99).fill(2),
    ...Array(31).fill(3),
    ...Array(5).fill(4),
    ...Array(1).fill(5),
    ...Array(targetRedEnd).fill(6)
  ]
  FATES.sort(() => Math.random() - 0.5)

  // multiply the number of red fates based on parameter
  let fate1Red = 2 * props.redMultiplier; 
  let fate2Red = 1 * props.redMultiplier; 
  let fate3Red = 1 * props.redMultiplier;
  let fate6Red = targetRedEnd;

  for (let i = 0; i < 500; i++) {
    const fate = FATES[i];
    let isRed = false;
    
    if (fate === 6 && fate6Red > 0) { isRed = true; fate6Red--; } 
    else if (fate === 1 && fate1Red > 0) { isRed = true; fate1Red--; } 
    else if (fate === 2 && fate2Red > 0) { isRed = true; fate2Red--; } 
    else if (fate === 3 && fate3Red > 0) { isRed = true; fate3Red--; } 

    balls.value.push({
      id: i,
      x: 30 + Math.random() * 20,
      y: 130 + Math.random() * 240, // Range from 130 to 370 vertically
      r: isRed ? 5 : 4,
      color: isRed ? '#ef4444' : '#10b981',
      opacity: 0,
      fate: fate,
      isRed: isRed
    })
  }
}

function replay() {
  timeouts.forEach(clearTimeout)
  timeouts = []
  
  initBalls()
  stage.value = 0
  
  // 0. Appear
  timeouts.push(setTimeout(() => {
    balls.value.forEach(b => { b.opacity = 0.85 })
  }, 100))

  // 1. Gate 1
  timeouts.push(setTimeout(() => {
    stage.value = 1
    balls.value.forEach(b => {
      if (b.fate === 1) {
        b.x = 175 - Math.random() * 20
        b.opacity = b.isRed ? 0.3 : 0.08
      } else {
        b.x = 265 + (Math.random() - 0.5) * 40
      }
    })
  }, 1000))

  // 2. Gate 2
  timeouts.push(setTimeout(() => {
    stage.value = 2
    balls.value.forEach(b => {
      if (b.fate > 1) {
        if (b.fate === 2) {
          b.x = 345 - Math.random() * 15
          b.opacity = b.isRed ? 0.4 : 0.08
        } else {
          b.x = 435 + (Math.random() - 0.5) * 30
          b.y = 250 + (b.y - 250) * 0.8 // funnel inwards
        }
      }
    })
  }, 2000))

  // 3. Gate 3
  timeouts.push(setTimeout(() => {
    stage.value = 3
    balls.value.forEach(b => {
      if (b.fate > 2) {
        if (b.fate === 3) {
          b.x = 515 - Math.random() * 15
          b.opacity = b.isRed ? 0.5 : 0.08
        } else {
          b.x = 605 + (Math.random() - 0.5) * 20
          b.y = 250 + (b.y - 250) * 0.8
        }
      }
    })
  }, 3000))

  // 4. Gate 4
  timeouts.push(setTimeout(() => {
    stage.value = 4
    balls.value.forEach(b => {
      if (b.fate > 3) {
        if (b.fate === 4) {
          b.x = 685 - Math.random() * 10
          b.opacity = 0.05
        } else {
          b.x = 775 + (Math.random() - 0.5) * 15
          b.y = 250 + (b.y - 250) * 0.8
        }
      }
    })
  }, 4000))

  // 5. Gate 5
  timeouts.push(setTimeout(() => {
    stage.value = 5
    balls.value.forEach(b => {
      if (b.fate > 4) {
        if (b.fate === 5) {
          b.x = 855 - Math.random() * 5
          b.opacity = 0.05
        } else {
          b.x = 920 + (Math.random() - 0.5) * 10
          b.y = 250 + (b.y - 250) * 0.8
        }
      }
    })
  }, 5000))

  // 6. Final Target
  timeouts.push(setTimeout(() => {
    stage.value = 6
    balls.value.forEach(b => {
      if (b.fate === 6) {
        // Scatter slightly to accommodate multiple balls in the 30x30 landing spot
        b.x = 1080 + (Math.random() - 0.5) * 14
        b.y = 140 + (Math.random() - 0.5) * 14
        b.r = props.redMultiplier > 1 ? 5 : 8
        b.opacity = 1
      }
    })
  }, 6000))
}

onMounted(() => {
  timeouts.push(setTimeout(replay, 500))
})

onUnmounted(() => {
  timeouts.forEach(clearTimeout)
})
</script>
