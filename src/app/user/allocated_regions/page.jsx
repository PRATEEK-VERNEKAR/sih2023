'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, use } from 'react'
import axios from 'axios'
import { USER_TOKEN } from '@/utils/consts'
import Cookies from 'js-cookie'
import { DOMAIN } from '../../../utils/consts'

export default function UserDashboard() {
  const [user, setUser] = useState({})
  const router = useRouter()
  const [token, setToken] = useState(USER_TOKEN)
  const [allMatchingRegions, setAllMatchingRegions] = useState([])

  const MatchingRegions = async (assignedRegionID) => {
    if (user && assignedRegionID) {
      const allMatchingRegionsResponse = await axios.post(
        `${DOMAIN}/api/viewAllotedRegions`,
        { regionIDs: assignedRegionID }
      )
      setAllMatchingRegions(allMatchingRegionsResponse.data.allMatchRegions)
    }
  }

  const fetchUserByToken = async (token) => {
    try {
      const user = await axios.get(`${DOMAIN}/api/user/getUserByToken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const fetchedUser = user.data.user
      setUser(fetchedUser)
      await MatchingRegions(fetchedUser.assignedRegionID)
    } catch (error) {
      console.log('got error in fetching user by token ', error)
    }
  }

  useEffect(() => {
    const workUseffect = async () => {
      if (USER_TOKEN) {
        await fetchUserByToken(token)
      } else {
        router.push('/login')
      }
    }
    workUseffect()
  }, [token])

  return (
    <div
      className="lg:w-[712px] text-white md:w-[412
      px] sm:w-[256px] space-y-5"
    >
      <p className="text-font text-5xl  text-gray-200 ">
        Assigned Places
      </p>
      <div className="flex flex-col gap-y-4 gap-x-4 h-auto ">
        {allMatchingRegions.map((singleRegion, index) => {
          return (
            <div
              key={index}
              className="flex flex-col h-auto cursor-pointer backdrop-blur-sm bg-white/10 shadow-xl px-10 py-3 max-w-[500px]"
              style={{
                overflow: 'hidden',
                borderRadius: '4px',
                cursor: 'pointer',
                boxShadow: '0 0 2px 1px black inset',
                padding: '4px 8px 4px 8px',
                fontSize: '0.8em',
              }}
              onClick={() => {
                router.push(`/user/eachRegion/${singleRegion.regionID}`)
              }}
            >
              <p className="text-xl font-bold ">{singleRegion.name}</p>
              <p className="text-lg ">{singleRegion.area.$numberDecimal} sq km</p>
              
            </div>
          )
        })}
      </div>
    </div>
  )
}
