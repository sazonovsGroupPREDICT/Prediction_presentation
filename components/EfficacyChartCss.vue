<template>
  <div class="flex flex-col w-full h-full bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative text-slate-700">
    <div class="flex-grow flex mt-4 relative pl-12 pb-16">
      
      <!-- Y Axis Label -->
      <div class="absolute -left-6 top-1/2 -translate-y-[50%] -rotate-90 text-[13px] font-bold text-slate-500 whitespace-nowrap">
        Required Sample Size (50:50 Trial)
      </div>

      <!-- Y Axis grid & ticks -->
      <div class="absolute left-10 right-0 top-0 bottom-16 flex flex-col justify-between border-l-2 border-slate-300 z-0">
        <div v-for="tick in yTicks" :key="tick" class="relative w-full border-t border-slate-100 h-0">
          <span class="absolute -left-12 top-1/2 -translate-y-1/2 text-xs font-bold w-10 text-right text-slate-500">{{ tick }}</span>
        </div>
      </div>

      <!-- Bars Container -->
      <div class="flex w-[62%] justify-between items-end absolute top-0 bottom-16 left-20 z-10 pt-20">
        <div v-for="item in data" :key="item.label" class="flex flex-col items-center justify-end h-full w-24 relative">
          
          <!-- Values Above Bar -->
          <div class="w-full flex flex-col items-center justify-end pb-2 whitespace-nowrap z-20">
            <span class="text-[26px] font-black text-blue-900 leading-none">{{ item.patients }}</span>
            <span class="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">Patients Needed</span>
            <span class="text-xs font-bold text-red-500 mt-0.5">{{ item.screen }}</span>
          </div>
          
          <!-- Solid Bar -->
          <div class="w-full rounded-t-sm transition-all duration-500 hover:opacity-90 shadow border-b-0 border-x border-t border-black/5"
               :style="{ height: `${(item.val / 1400) * 100}%`, backgroundColor: item.color }">
          </div>

          <!-- X axis label -->
          <div class="absolute -bottom-7 text-[13px] font-bold text-slate-700 w-[120px] text-center whitespace-nowrap">
             {{ item.label }}
          </div>
        </div>
      </div>

      <!-- Right Side Text Overlay -->
      <div class="absolute right-4 top-1/3 w-[35%] flex flex-col justify-center items-center z-10 px-4">
        <h3 class="text-[20px] font-extrabold text-[#1a237e] leading-snug text-center shadow-sm">
          Pick N top-1% at-risk first-degree relatives,<br/>
          give intervention, show statistical effect
        </h3>
      </div>

      <!-- Bottom Arrow -->
      <div class="absolute bottom-2 left-10 right-0 flex flex-col items-center text-slate-500">
        <div class="w-full flex items-center pr-8">
           <svg class="w-4 h-4 text-slate-400 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
           <div class="flex-grow border-t border-slate-400 -ml-1"></div>
        </div>
        <span class="text-[11px] font-medium italic mt-2 text-slate-400 mr-8">Decreasing Efficacy increases Sample Size &amp; Screening Burden exponentially</span>
      </div>

    </div>
  </div>
</template>

<script setup>
const data = [
  { label: '25% Efficacy', patients: '1,242', screen: '(Screen 124,200)', val: 1242, color: '#ef4444' },
  { label: '50% Efficacy', patients: '276', screen: '(Screen 27,600)', val: 276, color: '#fbbf24' },
  { label: '75% Efficacy', patients: '106', screen: '(Screen 10,600)', val: 106, color: '#2dd4bf' },
  { label: '100% Efficacy', patients: '48', screen: '(Screen 4,800)', val: 48, color: '#10b981' }
]

const yTicks = ['1,400', '1,200', '1,000', '800', '600', '400', '200', '0']
</script>
