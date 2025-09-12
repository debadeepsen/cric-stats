'use client'

import { BallHeatmap } from '@/utils/types'
import { Tabs } from '../ui/Tabs'
import dynamic from 'next/dynamic';

  const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false, // Ensure ApexCharts is not imported during SSR
  });
        

const options: ApexCharts.ApexOptions = {
  chart: {
    type: 'heatmap',
    toolbar: { show: false }
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5
    }
  },
  xaxis: {
    type: 'category',
    title: { text: 'Overs' }
  },
  yaxis: {
    title: { text: 'Ball of Over' },
    labels: { show: true }
  },
  colors: ['#3fab0b'],
  dataLabels: {
    enabled: true,
    style: { colors: ['#005305'] }
  }
}

export const HeatmapChart = ({ data }: { data: BallHeatmap[] }) => {
  const tabs = data.map(d => ({
    label: d.team,
    content: (
      <Chart
        options={options}
        series={d.series}
        type='heatmap'
        height={d.series.length * 60}
      />
    )
  }))
  return (
    <div className='w-full'>
      <Tabs tabs={tabs} />
    </div>
  )
}
