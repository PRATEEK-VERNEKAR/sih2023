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
    <div className="bg-transparent flex flex-row items-center justify-center">
      <a
        href={token ? '/user/allocated_regions' : '/login'}
        className="explore flex flex-row items-center gap-x-3 animate__animated animate__fadeIn"
      >
        <div>Explore</div>
        <Image
          src="/right-arrow.svg"
          width={24}
          height={24}
          alt="Picture of the author"
          className="block animate__animated"
        />
      </a>{' '}
    </div>
  )
}
