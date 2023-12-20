import React from 'react'
import LineGraph from '@/components/graphs/LineGraph'



const graphs = ({data}) => {

  return (
    <div className="px-10 py-2">
      <LineGraph data={mockData} />
    </div>
  )
}

export default graphs
