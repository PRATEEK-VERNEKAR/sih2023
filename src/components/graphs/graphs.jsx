import React from 'react'
import LineGraph from '@/components/graphs/LineGraph'



const graphs = () => {

  const mockData = {
    '2023-12-19': {
      classes: [10, 20, 15, 30, 25],
    },
    '2023-12-19': {
      classes: [5, 15, 10, 25, 20],
    },
    '2023-12-19': {
      classes: [12, 18, 22, 28, 30],
    },
    '2023-12-19': {
      classes: [8, 13, 16, 20, 24],
    },
    '2023-12-19': {
      classes: [17, 23, 28, 35, 40],
    },
  }

  return (
    <div className='bg-black'>
      <LineGraph data={mockData} />
    </div>
  )
}

export default graphs
