import React from 'react'
import LineGraph from '../../components/graphs/linegraph'



const graphs = ({data}) => {

  return (
    <div className="px-10 py-2 ">
      <LineGraph data={data} />
    </div>
  )
}

export default graphs
