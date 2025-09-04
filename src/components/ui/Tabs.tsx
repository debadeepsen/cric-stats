'use client'

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
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-md
              ${
                activeIndex === idx
                  ? 'bg-green-500/10 text-green-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className='p-4'>{tabs[activeIndex].content}</div>
    </div>
  )
}
