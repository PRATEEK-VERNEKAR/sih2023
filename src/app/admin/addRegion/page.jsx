'use client'
import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import { DOMAIN } from '../../../utils/consts'

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    roads: '',
    buildings: '',
    vehicles: '',
    aircraft: '',
  })

  const [stateArray, setStateArray] = useState([])
  const [countryArray, setCountryArray] = useState([])
  const [dept, setDept] = useState([])
  const [firstStep, doneFirstStep] = useState(false)
  const [addEmail, setEmail] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'deptemail') {
      setEmail(true)
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleRegistration = async (e) => {
    e.preventDefault()
    formData.states = stateArray
    formData.countries = countryArray
    let data = []
    console.log(dept)
    console.log({ ministryName: dept[0][0], email: [dept[0][1]] })
    for (let i = 0; i < dept.length; i++) {
      let temp = dept[i]
      let flag = false
      for (let j = 0; j < data.length; j++) {
        if (data[j].ministryName === temp[0]) {
          data[j].email.push(temp[1])
          flag = true
          break
        }
      }
      if (!flag) {
        data.push({ ministryName: dept[i][0], email: [dept[i][1]] })
      }
    }
    console.log(data)
    formData['govtBodies'] = data
    try {
      const response = await axios.post(`${DOMAIN}/api/newRegion`, formData)

      if (response.data.success) {
        toast.success('Successfully Registered!')
      } else {
        console.error('Registration failed:', response.data.message)
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  return (
    <div>
      <Toaster />
      <form
        onSubmit={handleRegistration}
        className="flex flex-col gap-y-5 backdrop-blur-sm bg-white/30 px-10 py-4 rounded-lg"
      >
        <p className="text-gray-200 text-3xl font-semibold text-center">
          Region Registration
        </p>
        {!firstStep ? (
          <>
            <div className="flex flex-row  text-sm bg-black/40">
              <label className="p-2 text-white" htmlFor="password">
                Region
              </label>
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

            <div className="flex flex-row  text-sm bg-black/40">
              <label className="p-2 text-white" htmlFor="username">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full outline-none transparent"
              />
            </div>

            <div className="flex flex-row  text-sm bg-black/40">
              <label className="p-2 text-white">Area</label>
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
          </>
        ) : (
          <>
            <div className="flex flex-row items-center gap-x-2">
              <div className="line w-full"></div>
              <div className="dept">Government </div>
              <div className="line w-full"></div>
            </div>

            <div className="flex flex-row  text-sm bg-black/40">
              <label className="p-2 text-white" htmlFor="deptusername">
                Name
              </label>
              <input
                type="text"
                id="deptusername"
                name="deptusername"
                value={formData.deptusername}
                onChange={handleInputChange}
                className="w-full outline-none transparent"
              />
            </div>

            <div className="flex flex-row  text-sm bg-black/40">
              <label className="p-2 text-white" htmlFor="deptemail">
                Email
              </label>
              <input
                type="text"
                id="deptemail"
                name="deptemail"
                value={formData.deptemail}
                onChange={handleInputChange}
                className="w-full outline-none transparent"
              />
            </div>

            {addEmail && (
              <div
                className="nform-send login-send text-center"
                onClick={(e) => {
                  dept.push([formData.deptusername, formData.deptemail])
                  setFormData((prev) => ({
                    ...prev,
                    deptusername: '',
                    deptemail: '',
                  }))
                  setDept([...dept])
                  setEmail(false)
                }}
                style={{ cursor: 'pointer' }}
              >
                Add
              </div>
            )}

            {dept.length > 0 && (
              <div
                className="w-full flex flex-row gap-x-3 gap-y-2 flex-wrap"
                style={{ padding: '2px' }}
              >
                {dept.map((element, key) => {
                  return (
                    <div
                      key={key}
                      className="block"
                      style={{
                        fontSize: '0.7em',
                        backgroundColor: 'rgba(109, 242, 242,0.4)',
                        padding: '4px',
                        borderRadius: '4px',
                      }}
                    >
                      {element}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
        <div className="flex flex-row justify-right gap-x-2">
          {firstStep ? (
            <button type="submit" className="nform-send login-send">
              Register
            </button>
          ) : (
            <>
              <div
                className="bg-black/50 hover:scale-110 duration-300 transition-all px-14 rounded-lg py-3 text-gray-200 mx-auto"
                onClick={(e) => {
                  doneFirstStep(true)
                }}
                style={{ cursor: 'pointer' }}
              >
                Next
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
