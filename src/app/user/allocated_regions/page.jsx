'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, use } from 'react'
import axios from 'axios'
import { USER_TOKEN } from '@/utils/consts'
import Cookies from 'js-cookie'

export default function UserDashboard() {
  const [user, setUser] = useState({})
  const router = useRouter()
  const [token, setToken] = useState(USER_TOKEN)
  const [allMatchingRegions, setAllMatchingRegions] = useState([])

  const MatchingRegions = async (assignedRegionID) => {
    if (user && assignedRegionID) {
      const allMatchingRegionsResponse = await axios.post(
        'http://localhost:3000/api/viewAllotedRegions',
        { regionIDs: assignedRegionID }
      )
      setAllMatchingRegions(allMatchingRegionsResponse.data.allMatchRegions)
    }
  }

  const fetchUserByToken = async (token) => {
    try {
      const user = await axios.get(
        'http://localhost:3000/api/user/getUserByToken',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const fetchedUser = user.data.user
      setUser(fetchedUser)
      await MatchingRegions(fetchedUser.assignedRegionID)
    } catch (error) {
      console.log('got error in fetching user by token ', error)
    }
  }

  useEffect(() => {
    const workUseffect = async () => {
      if (token) {
        await fetchUserByToken(token)
      } else {
        router.push('/login')
      }
    }
    workUseffect()
  }, [token])

  return (
    <div className='lg:w-[712px] md:w-[412
      px] sm:w-[256px] '>
      <p className='monitor-header'>Assigned Places</p>
          <div className='flex flex-row gap-x-4 h-auto user ' style={{borderRadius:"8px"}}>
          {
              allMatchingRegions.map((singleRegion,index)=>{
                  return(
                    <div
                    key={index}
                    className='flex flex-col h-auto' style={{overflow:'hidden',borderRadius:"4px",cursor:"pointer",boxShadow:"0 0 2px 1px black inset",padding:"4px 8px 4px 8px",fontSize:"0.8em"}}
                    onClick={() => {
                      router.push(`/user/eachRegion/${singleRegion.regionID}`)
                    }}
                  >
                    <p>{singleRegion.name}</p>
                    <p>{singleRegion.area.$numberDecimal}</p>
                    <p>{singleRegion.borderLength.$numberDecimal}</p>
                    <p>
                      {singleRegion.states.map((state, index1) => {
                        return (
                        <span key={index1}>
                          {index1 === 0 && "| " }
                          {" "+state} | 
                        </span>
                        )
                      })}
                    </p>
                    <p>
                      {singleRegion.neighborCountry.map((country, index2) => {
                        return (
                        <span key={index2}>
                          {index2 === 0 && "| " }
                          {" "+country} |
                        </span>
                        )
                      })}
                    </p>
                  </div>
                  )
                  })
                }

          </div>
      </div>
  )
}
