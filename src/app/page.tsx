'use client'
import Image from 'next/image'
import 'animate.css'
import { useEffect, useState } from 'react'
import { USER_TOKEN } from '@/utils/consts'

export default function Home() {
  const [token, setToken] = useState('')

  useEffect(() => {
    if (USER_TOKEN) {
      setToken(USER_TOKEN)
    }
  }, [])

  return (
    <div className="text-white flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col space-y-5 items-center text-center">
        <h1 className="font-bold text-6xl animate__animated animate__fadeInDown">
          Urban Insights
        </h1>
        <h4 className="font-bold text-2xl animate__animated animate__fadeInUp">
          Explore the universe with our amazing satellite-themed website!
        </h4>
        <a
          href={token ? '/user/allocated_regions' : '/login'}
          className="explore flex flex-row  animate-bounce items-center gap-x-3 animate__pulse animate__infinite"
        >
          <h4 className=" font-semibold">Explore</h4>
          <Image
            src="/right-arrow.svg"
            width={24}
            height={24}
            alt="Arrow"
            className="block animate__bounce"
          />
        </a>
      </div>
    </div>
  )
}
