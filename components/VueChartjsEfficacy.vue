<template>
  <div class="flex flex-col w-full h-[450px] bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
    
    <!-- Chart Canvas Container -->
    <div class="relative w-[65%] h-[320px] ml-10 mt-4 z-0">
      <Bar :data="chartData" :options="chartOptions" :plugins="[ChartDataLabels]" />
    </div>

    <!-- Right Side Text Overlay -->
    <div class="absolute right-4 top-[25%] flex flex-col justify-center items-center z-10 w-[30%]">
      <h3 class="text-xl font-extrabold text-[#1a237e] leading-snug text-center drop-shadow-sm">
        Pick N top-1% at-risk first-degree relatives,<br/>
        give intervention, show statistical effect
      </h3>
    </div>

    <!-- Bottom Arrow -->
    <div class="w-full flex flex-col items-center mt-4 text-slate-500">
      <div class="w-full flex items-center px-12">
          <svg class="w-4 h-4 text-slate-400 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          <div class="flex-grow border-t border-slate-400 -ml-1"></div>
      </div>
      <span class="text-xs font-semibold italic mt-2 text-slate-500">
        Decreasing Efficacy increases Sample Size &amp; Screening Burden exponentially
      </span>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register standard Chart.js components globally
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const chartData = ref({
  labels: ['25% Efficacy', '50% Efficacy', '75% Efficacy', '100% Efficacy'],
  datasets: [
    {
      label: 'Patients Needed',
      data: [1242, 276, 106, 48],
      backgroundColor: [
        'rgba(239, 68, 68, 0.9)',   // Red
        'rgba(245, 158, 11, 0.9)',  // Amber
        'rgba(20, 184, 166, 0.9)',  // Teal
        'rgba(16, 185, 129, 0.9)'   // Emerald
      ],
      borderRadius: 4,
      barPercentage: 0.6,
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      padding: 12,
      titleFont: { size: 14, family: 'Inter, sans-serif' },
      bodyFont: { size: 14, family: 'Inter, sans-serif' },
      callbacks: {
        label: function(context) {
          return `${context.parsed.y} patients needed`;
        }
      }
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      offset: 8,
      formatter: (value, context) => {
        const screens = ['124,200', '27,600', '10,600', '4,800'];
        const formattedVal = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return [formattedVal, 'patients needed', `(Screen ${screens[context.dataIndex]})`];
      },
      font: (context) => {
        return {
          weight: 'bold',
          size: 13,
          family: 'Inter, sans-serif',
          lineHeight: 1.2
        };
      },
      color: (context) => {
        const colors = ['#1e3a8a', '#64748b', '#ef4444'];
        return colors;
      },
      textAlign: 'center'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 1400,
      title: {
        display: true,
        text: 'Required Sample Size (50:50 Trial)',
        padding: { bottom: 16 },
        font: {
          size: 14,
          weight: 'bold',
          family: 'Inter, sans-serif'
        },
        color: '#64748b'
      },
      grid: {
        color: '#f1f5f9',
        drawBorder: false
      },
      ticks: {
        color: '#64748b',
        font: { size: 12, weight: '500' }
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#475569',
        font: {
          size: 14,
          weight: 'bold',
          family: 'Inter, sans-serif'
        }
      }
    }
  }
})
</script>
