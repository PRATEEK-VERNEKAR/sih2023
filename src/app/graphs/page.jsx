'use client'

import React from 'react'
import LineGraph from '../../components/graphs/linegraph'

const mockData = {
  2023: {
    classes: [10, 20, 15, 30, 25],
  },
  2022: {
    classes: [5, 15, 10, 25, 20],
  },
  2021: {
    classes: [12, 18, 22, 28, 30],
  },
  2020: {
    classes: [8, 13, 16, 20, 24],
  },
  2019: {
    classes: [17, 23, 28, 35, 40],
  },
}

const Graphs = () => {
  return (
    <div className=" px-10 py-2">
      <h1 className='font-bold text-white text-4xl text-center mb-5'>Graphs for Change with Classes</h1>
      <LineGraph data={mockData} />
    </div>
  )
}

export default Graphs
