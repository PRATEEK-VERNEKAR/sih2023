// components/AdminLogin.js
'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { DOMAIN } from '@/utils/consts'
import toast, { Toaster } from 'react-hot-toast'

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const router = useRouter()
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${DOMAIN}/api/hardCoded/verifyuser/verifyadmin`,
        formData
      )

      if (response.data.success) {
        toast.success('Successfully Logined!')
        router.push(`${DOMAIN}/admin/`)
      } else {
        console.error('Login failed:', response.data.message)
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <div>
      <Toaster />
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-y-5 backdrop-blur-sm bg-white/30 px-10 py-4 rounded-lg"
      >
        <p className="text-gray-200 text-3xl font-semibold text-center">
          Admin Login
        </p>

        <div className="flex flex-row  text-sm bg-black/40">
          <label htmlFor="email" className="p-2 text-white">
            email
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent px-2"
          />
        </div>

        <div className="flex flex-row  text-sm bg-black/40">
          <label htmlFor="password" className="p-2 text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent px-2"
          />
        </div>

        <button
          type="submit"
          className="bg-black/50 hover:scale-110 duration-300 transition-all px-14 rounded-lg py-3 text-gray-200 mx-auto"
        >
          Login
        </button>
      </form>
    </div>
  )
}
