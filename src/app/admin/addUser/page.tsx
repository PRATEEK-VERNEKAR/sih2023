// UserRegistration.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import {DOMAIN} from '../../../utils/consts'

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    deptusername: '',
    password: '',
    deptpassword: '',
  });
  const router = useRouter();


  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${DOMAIN}/api/hardCoded/verifyuser/adduser`, formData);

      if (response.data.success) {
        toast.success('Registration successful!');
        router.back();
        console.log(router) 

      } else {
        
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <Toaster />

      <form
        onSubmit={handleRegistration}
        className="flex flex-col gap-y-5 backdrop-blur-sm bg-white/30 px-10 py-4 rounded-lg"
      >
        <p className="text-gray-200 text-3xl font-semibold text-center">
          User Registration
        </p>
        <div className="flex flex-row text-sm bg-black/40">
          <label htmlFor="email" className="p-2 text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent px-2"
          />
        </div>

        <div className="flex flex-row  text-sm bg-black/40">
          <label htmlFor="username" className="p-2 text-white">
            Username
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

        <div className="flex flex-row items-center gap-x-2">
          <div className="line w-full"></div>
          <div className="text-gray-200 font-semibold text-xl">Department</div>
          <div className="line w-full"></div>
        </div>

        <div className="flex flex-row  text-sm bg-black/40">
          <label htmlFor="deptusername" className="p-2 text-white">
            Username
          </label>
          <input
            type="text"
            id="deptusername"
            name="deptusername"
            value={formData.deptusername}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent px-2"
          />
        </div>

        <div className="flex flex-row  text-sm bg-black/40">
          <label htmlFor="deptpassword" className="p-2 text-white">
            Password
          </label>
          <input
            type="password"
            id="deptpassword"
            name="deptpassword"
            value={formData.deptpassword}
            onChange={handleInputChange}
            required
            className="w-full outline-none transparent px-2"
          />
        </div>

        <button
          type="submit"
          className="bg-black/50 hover:scale-110 duration-300 transition-all px-14 rounded-lg py-3 text-gray-200 mx-auto"
        >
          Register
        </button>
      </form>
    </div>
  )
}
