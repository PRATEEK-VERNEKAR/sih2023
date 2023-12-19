'use client'
import { useState } from 'react'
import axios from 'axios'
import { DOMAIN } from '../../../utils/consts'

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    deptusername: '',
    password: '',
    deptpassword: '',
    roads: '',
    buildings: '',
    vehicles: '',
    aircraft: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleRegistration = async (e) => {
    e.preventDefault()

   

    try {
      const response = await axios.post(`${DOMAIN}/api/newRegion`, formData)

      if (response.data.success) {
        console.log('Registration successful!')
      } else {
        console.error('Registration failed:', response.data.message)
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  return (
    <div>
      <p style={{ color: '#323643', fontSize: '1.5em', fontWeight: 'bold' }}>
        Region Registration
      </p>
      <form
        onSubmit={handleRegistration}
        className="flex flex-col gap-y-4 nform"
      >
        <div className="flex flex-row nform-input">
          <label htmlFor="email">Region</label>
          <input
            type="text"
            id="regionID"
            name="regionID"
            value={formData.regionID}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="password">States</label>
          <input
            type="text"
            id="states"
            name="states"
            value={formData.states}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="password">Countries</label>
          <input
            type="text"
            id="countries"
            name="countries"
            value={formData.countries}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="password">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="password">Length</label>
          <input
            type="text"
            id="length"
            name="length"
            value={formData.length}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>
        {/* [b,r,v,a] */}
        <div className="text-bold text-lg w-full">Thresholds</div>
        <div className="flex flex-row nform-input">
          <label>Road</label>
          <input
            type="text"
            id="roads"
            name="roads"
            value={formData.roads}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>
        <div className="flex flex-row nform-input">
          <label>Building</label>
          <input
            type="text"
            id="bulding"
            name="bulding"
            value={formData.buildings}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>
        <div className="flex flex-row nform-input">
          <label>Vehicle</label>
          <input
            type="text"
            id="vehicles"
            name="vehicles"
            value={formData.vehicles}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>
        <div className="flex flex-row nform-input">
          <label>Aircraft</label>
          <input
            type="text"
            id="aircraft"
            name="aircraft"
            value={formData.aircraft}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <div className="flex flex-row items-center gap-x-2">
          <div className="line w-full"></div>
          <div className="dept">Government Bodies</div>
          <div className="line w-full"></div>
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="deptusername">Ministry Name</label>
          <input
            type="text"
            id="deptusername"
            name="deptusername"
            value={formData.deptusername}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="deptpassword">Password</label>
          <input
            type="password"
            id="deptpassword"
            name="deptpassword"
            value={formData.deptpassword}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent"
          />
        </div>

        <button type="submit" className="nform-send login-send mx-auto">
          Register
        </button>
      </form>
    </div>
  )
}
