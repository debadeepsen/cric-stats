'use client'

import { TEAMS_COLORS } from '@/constants'
import { useState, ReactNode } from 'react'

type Tab = {
  label: string
  content: ReactNode
}

export const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='w-full'>
      {/* Tab headers */}
      <div className='flex'>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer focus:outline-none`}
            style={{
              color:
                index === activeIndex
                  ? TEAMS_COLORS[index]
                  : '#777'
            }}
          >
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className='p-4'>{tabs[activeIndex].content}</div>
    </div>
  )
}
