<template>
  <div class="flex flex-col w-full h-full bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative">
    
    <!-- Chart Container -->
    <div class="flex-grow relative flex w-full h-full pl-16 pb-12 mt-4 text-xs font-sans">
      
      <svg viewBox="-100 -80 950 620" class="w-full h-full overflow-visible">
        
        <!-- Y-Axis Label -->
        <text transform="translate(-65, 200) rotate(-90)" style="font-size: 18px; font-weight: 700;" fill="#64748b" text-anchor="middle">
          Required Sample Size (50:50 Trial)
        </text>

        <!-- Y-Axis -->
        <g class="y-axis">
          <line x1="0" y1="0" x2="0" y2="400" stroke="#94a3b8" stroke-width="1.5" />
          <template v-for="tick in yTicks" :key="'y_tick_' + tick.val">
            <line x1="-5" :y1="tick.y" x2="0" :y2="tick.y" stroke="#94a3b8" stroke-width="1.5" />
            <text x="-12" :y="tick.y + 5" style="font-size: 16px; font-weight: 700;" fill="#64748b" text-anchor="end">
              {{ tick.label }}
            </text>
          </template>
        </g>
        
        <!-- X-Axis Base Line -->
        <line x1="0" y1="400" x2="750" y2="400" stroke="#94a3b8" stroke-width="1.5" />
        <line x1="750" y1="400" x2="750" y2="405" stroke="#94a3b8" stroke-width="1.5" />

        <!-- Bars -->
        <g v-for="(item, index) in data" :key="'bar_' + index">
          
          <!-- Colored Rectangle -->
          <rect 
            :x="item.x" 
            :y="item.y" 
            :width="barWidth" 
            :height="400 - item.y" 
            :fill="item.color" 
          />

          <!-- Bar Labels (Top) -->
          <text :x="item.x + barWidth/2" :y="item.y - 45" style="font-size: 28px; font-weight: 900;" text-anchor="middle" fill="#1e3a8a">
            {{ item.patients }}
          </text>
          <text :x="item.x + barWidth/2" :y="item.y - 25" style="font-size: 16px;" fill="#64748b" text-anchor="middle">
            patients needed
          </text>
          <text :x="item.x + barWidth/2" :y="item.y - 6" style="font-size: 18px; font-weight: 800;" text-anchor="middle" fill="#ef4444">
            {{ item.screen }}
          </text>

          <!-- X-Axis Labels -->
          <text :x="item.x + barWidth/2" :y="435" style="font-size: 18px; font-weight: 800;" fill="#475569" text-anchor="middle">
            {{ item.label }}
          </text>
        </g>
        
        <!-- Annotational Text Inside SVG -->
        <text x="470" y="150" style="font-size: 26px; font-weight: 800;" fill="#1e3a8a" text-anchor="middle">
          <tspan x="470" dy="0">Pick N top-1% at-risk first-degree relatives,</tspan>
          <tspan x="470" dy="34">give intervention, show statistical effect</tspan>
        </text>

        <!-- Bottom Arrow -->
        <g transform="translate(0, 480)">
          <!-- Arrow line -->
          <line x1="25" y1="0" x2="730" y2="0" stroke="#94a3b8" stroke-width="2" />
          <!-- Arrow head (left) -->
          <polygon points="25,0 35,-6 35,6" fill="#94a3b8" />
          <!-- Label -->
          <text x="380" y="22" style="font-size: 16px; font-style: italic;" fill="#64748b" text-anchor="middle">
            Decreasing Efficacy increases Sample Size &amp; Screening Burden exponentially
          </text>
        </g>

      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const barWidth = 120
const startX = 50
const gap = 60

// Max Y scale value
const maxY = 1400

const rawData = [
  { label: '25% Efficacy', patients: '1,242', screen: '(Screen 124,200)', val: 1242, color: '#ef4444' },
  { label: '50% Efficacy', patients: '276', screen: '(Screen 27,600)', val: 276, color: '#fbbf24' },
  { label: '75% Efficacy', patients: '106', screen: '(Screen 10,600)', val: 106, color: '#38bdf8' },
  { label: '100% Efficacy', patients: '48', screen: '(Screen 4,800)', val: 48, color: '#34d399' }
]

// Convert values to SVG coordinates (Chart bounds: y=0 to y=400)
// 1400 = y:0, 0 = y:400
const data = computed(() => {
  return rawData.map((d, i) => {
    return {
      ...d,
      x: startX + (i * (barWidth + gap)),
      y: 400 - (d.val / maxY) * 400
    }
  })
})

const yTicks = [
  { val: 1400, label: '1,400', y: 400 - (1400/maxY)*400 },
  { val: 1200, label: '1,200', y: 400 - (1200/maxY)*400 },
  { val: 1000, label: '1,000', y: 400 - (1000/maxY)*400 },
  { val: 800,  label: '800',   y: 400 - (800/maxY)*400 },
  { val: 600,  label: '600',   y: 400 - (600/maxY)*400 },
  { val: 400,  label: '400',   y: 400 - (400/maxY)*400 },
  { val: 200,  label: '200',   y: 400 - (200/maxY)*400 },
  { val: 0,    label: '0',     y: 400 } // Baseline
]
</script>
