'use client'

import Image from 'next/image'
import { DOMAIN, USER_TOKEN } from '@/utils/consts'
import axios from 'axios'
import { Suspense, useEffect, useState } from 'react'
import Loading from '@/components/loaders/Loader'
import Graphs from '@/components/graphs/graphs'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export default function MonitorEachRegion({ params }) {
  const router = useRouter()
  const [showReport, setShowReport] = useState(false)
  const [reportData, setReportData] = useState([])
  const [currentRegion, setCurrentRegion] = useState([
    {
      dateTime: '',
      predicted: false,
      classes: [],
      image: { contentType: '', data: { type: '', data: [] } },
    },
  ])

  const pram = {
    width: '56px',
    boxShadow: '0 0 15px 2px #323643',
    borderRadius: '8px',
    columnGap: '4px',
  }
  const parm1 = {
    backgroundColor: '#323643',
    borderRadius: '8px',
    padding: '4px',
  }

  const [loaded, setLoaded] = useState(false)

  const generateReport = async () => {
    try {
      const res = await axios.post(`${DOMAIN}/api/generateReport`, {
        regionID: params.regionID,
      })
      if (res.status == 200) {
        setReportData(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowReport = async () => {
    await generateReport()
    setShowReport(true)
  }

  const myFunc = async () => {
    try {
      const monitoredRegionInfo = await axios.get(
        `${DOMAIN}/api/monitorEachRegion/${params.regionID}`,
        {
          headers: {
            Authorization: `Bearer ${USER_TOKEN}`,
          },
        }
      )
      const regionInfo = monitoredRegionInfo.data.completeInfo.imageData
      console.log("regionInfo is",regionInfo)
      setLoaded(true)
      setCurrentRegion(regionInfo)
    } catch (error) {
      console.log('error at regionId', error)
      setLoaded(true)
    }
  }

  useEffect(() => {
    if (!USER_TOKEN) {
      toast.success('Please login first')
      router.push('/login')
    }
    myFunc()
  }, [currentRegion])

  const countOccurances = (arr, num) => {
    return arr.filter((temp) => {
      return +temp.$numberDecimal === num
    }).length
  }

  const toLocalTime = (date) => {
    const d = new Date(date)
    const formattedDate = d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC', // Assuming your date is in UTC format
    })
    return formattedDate
  }

  const bufferToBase64 = (buffer) => {
    const binary = Buffer.from(buffer).toString('base64')
    return `data:image/jpeg;base64,${binary}`
  }

  return (
    <div className="flex flex-row overflow-x-scroll gap-y-4  gap-x-4">
      <Toaster />
      {loaded ? (
        currentRegion.map((data, index) => {
          return (
            <div className="flex flex-col space-y-4" key={index} >
              <div
                key={index}
                className="flex flex-col min-w-[400px] min-h-[400px] gap-y-3 bg-white/20 backdrop-blur-md shadow-xl px-4 py-4 rounded-xl "
                style={{
                  borderRadius: '8px',
                }}
              >
                {/* <p>{data.image.data}</p> */}
                {data.image.data.data && (
                  <Image
                    src={bufferToBase64(data.image.data.data)}
                    width={400}
                    height={400}
                    className=" border-white border-4 border-lg"
                  />
                )}
                <div className="text-white font-semibold">
                  {toLocalTime(data.dateTime)}
                </div>
                <div
                  className="grid grid-cols-3 flex-wrap justify-between gap-x-2 gap-y-2"
                  style={{ padding: '8px' }}
                >
                  <div className="flex flex-row" style={{ ...pram }}>
                    <div className="flex flex-row items-center justify-center bg-white">
                      <Image
                        src="/aircraft.svg"
                        width={50}
                        height={50}
                        className="block"
                        alt="Aircraft"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="block text-white">
                        {countOccurances(data.classes, 0)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row" style={{ ...pram }}>
                    <div className="flex flex-row items-center justify-center bg-white">
                      <Image
                        src="/building.svg"
                        width={50}
                        height={50}
                        alt="Aircraft"
                        className="block"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="block text-white">
                        {countOccurances(data.classes, 1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row" style={{ ...pram }}>
                    <div className="flex flex-row items-center justify-center bg-white">
                      <Image
                        src="/grounds.svg"
                        width={50}
                        height={50}
                        alt="Aircraft"
                        className="block"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="block text-white">
                        {countOccurances(data.classes, 2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row" style={{ ...pram }}>
                    <div className="flex flex-row items-center justify-center bg-white">
                      <Image
                        src="/road.svg"
                        width={50}
                        height={50}
                        alt="Aircraft"
                        className="block"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="block text-white">
                        {countOccurances(data.classes, 3)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row" style={{ ...pram }}>
                    <div className="flex flex-row items-center justify-center bg-white">
                      <Image
                        src="/vehicle.svg"
                        width={50}
                        height={50}
                        alt="Aircraft"
                        className="block"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="block text-white">
                        {countOccurances(data.classes, 4)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row" style={{ ...pram }}>
                    <div className="flex flex-row items-center justify-center bg-white">
                      <Image
                        src="/water.svg"
                        width={50}
                        height={50}
                        alt="Aircraft"
                        className="block"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="block text-white">
                        {countOccurances(data.classes, 5)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <button
                  className="px-4 py-2 text-gray-100 font-bold"
                  onClick={handleShowReport}
                >
                  Show Report Data
                </button>
                {showReport && <Graphs data={reportData} />}
              </div>
            </div>
          )
        })
      ) : (
        <Loading />
      )}
    </div>
  )
}
