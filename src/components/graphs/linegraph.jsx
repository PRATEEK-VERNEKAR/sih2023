import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const LineGraph = ({ data }) => {
  const indices = data[Object.keys(data)[0]].classes.length // Get the number of indices
  // const indices = Object.keys(data).length
  const lineGraphs = []

  const classMappings = {
    0: 'Buildings',
    1: 'Ground',
    2: 'Roads',
    3: 'Vehincles',
    4: 'Aircrafts',
  }
 const colors = [
   'rgba(255, 99, 132, 0.8)',
   'rgba(54, 162, 235, 0.8)',
   'rgba(255, 206, 86, 0.8)',
   'rgba(75, 192, 192, 0.8)',
   'rgba(153, 102, 255, 0.8)',
 ]

  for (let i = 0; i < indices; i++) {
    const yAxisData = Object.keys(data).map((timestamp) => {
      return data[timestamp].classes[i] // Get values at each index for all timestamps
    })

    const chartData = {
      labels: Object.keys(data),
      datasets: [
        {
          label: `${classMappings[i]}`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: colors[i % colors.length], // Cycle through colors for each graph
          borderColor: colors[i % colors.length],
          pointBorderColor: colors[i % colors.length],
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: colors[i % colors.length],
          pointHoverBorderColor: colors[i % colors.length],
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: yAxisData,
        },
      ],
    }

    lineGraphs.push(
      <div key={i} style={{ marginBottom: '20px' }}>
        <h3>Line Graph for {classMappings[i]}</h3>
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'category',
                labels: Object.keys(data),
              },
            },
            plugins: {
              // Set the background color to black for the chart area
              backgroundColor: 'black',
            },
          }}
          width={400}
          height={400}
        />
      </div>
    )
  }

  return <div className="grid grid-cols-3 bg-black">{lineGraphs}</div>
}

export default LineGraph
