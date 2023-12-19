"use client";
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function UserRegistration() {
  const [formData, setFormData] = useState({});

  const [stateArray,setStateArray] = useState([]);
  const [countryArray,setCountryArray] = useState([]);
  const [dept,setDept] = useState([]);
  const [firstStep,doneFirstStep] = useState(false)
  const [addEmail,setEmail] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === "deptemail"){
      setEmail(true);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    formData.states = stateArray;
    formData.countries = countryArray
    let data = []
    console.log(dept)
    console.log({ministryName:dept[0][0],email:[dept[0][1]]})
    for(let i=0;i<dept.length;i++){
      let temp = dept[i];
      let flag = false;
      for(let j=0;j<data.length;j++){
        if(data[j].ministryName === temp[0]){
          data[j].email.push(temp[1]) 
          flag = true;
          break;
        }
      }
      if(!flag){
        data.push({ministryName:dept[i][0],email:[dept[i][1]]})
      }
    }
    console.log(data)
    formData["govtBodies"] = data;
    try {
      const response = await axios.post('http://localhost:3000/api/hardCoded/verifyuser/adduser', formData);

      if (response.data.success) {
        console.log('Registration successful!');
      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <p style={{ color: '#323643',fontSize:"1.5em",fontWeight:"bold" }}>Region Registration</p>
      <form onSubmit={handleRegistration} className='flex flex-col gap-y-4 nform'>
       {(!firstStep)?(<>
      <div className="flex flex-row nform-input">
          <label htmlFor="password">Region</label>
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
          <label htmlFor="email">States</label>          
          <input
              type="text"
              id="states"
              name="states"
              value={formData.states}
              onChange={handleInputChange}
              className="w-full outline-none transparent"         
          />       
          
          <div onClick={(e)=>{
            stateArray.push(formData.states);
            console.log(stateArray)
            setStateArray([...stateArray])
            setFormData((prevData) => ({
              ...prevData,
              states: "",
            }));
            }} style={{padding:"8px",cursor:"pointer"}}>
            <Image src="/add.svg" width={24} height={24} />
          </div>
        </div>

        {stateArray.length>0 && <div className='w-full flex flex-row gap-x-3' style={{padding:"2px"}}>
              {stateArray.map((element)=>{
                return <div className='block' style={{fontSize:"0.7em",backgroundColor:"rgba(109, 242, 242,0.4)",padding:"4px",borderRadius:"4px"}}>{element}</div>
              })}
            </div>}


        <div className="flex flex-row nform-input">
          <label htmlFor="email">Countries</label>          
          <input
              type="text"
              id="countries"
              name="countries"
              value={formData.countries}
              onChange={handleInputChange}
              className="w-full outline-none transparent"         
          />       
          
          <div onClick={(e)=>{
            countryArray.push(formData.countries);
            setCountryArray([...countryArray])
            setFormData((prevData) => ({
              ...prevData,
              countries: "",
            }));
            }} style={{padding:"8px",cursor:"pointer"}}>
            <Image src="/add.svg" width={24} height={24} />
          </div>
        </div>

        {countryArray.length>0 && <div className='w-full flex flex-row gap-x-3' style={{padding:"2px"}}>
              {countryArray.map((element)=>{
                return <div className='block' style={{fontSize:"0.7em",backgroundColor:"rgba(109, 242, 242,0.4)",padding:"4px",borderRadius:"4px"}}>{element}</div>
              })}
        </div>}


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
        </div></>):(<><div className="flex flex-row items-center gap-x-2">
          <div className="line w-full"></div>
          <div className="dept">Government </div>
          <div className="line w-full"></div>
        </div>

        <div className="flex flex-row nform-input">
          <label htmlFor="deptusername">Name</label>          
          <input
              type="text"
              id="deptusername"
              name="deptusername"
              value={formData.deptusername}
              onChange={handleInputChange}
              className="w-full outline-none transparent"         
          />       
        </div>
        
        <div className="flex flex-row nform-input">
          <label htmlFor="deptemail">Email</label>          
          <input
              type="text"
              id="deptemail"
              name="deptemail"
              value={formData.deptemail}
              onChange={handleInputChange}
              className="w-full outline-none transparent"         
          />       
        </div>

        {addEmail && <div className="nform-send login-send text-center" onClick={(e)=>{
          dept.push([formData.deptusername,formData.deptemail])
          setFormData((prev)=>({
              ...prev,
              deptusername:""
              ,deptemail:""
            }
          ))
          setDept([...dept])
          setEmail(false)
  }} style={{cursor:"pointer"}}>Add</div>}

        {dept.length>0 && <div className='w-full flex flex-row gap-x-3 gap-y-2 flex-wrap' style={{padding:"2px"}}>
              {dept.map((element)=>{
                return <div className='block' style={{fontSize:"0.7em",backgroundColor:"rgba(109, 242, 242,0.4)",padding:"4px",borderRadius:"4px"}}>{element}</div>
              })}
        </div>     }  

        </>)}
        <div className='flex flex-row justify-right gap-x-2'>
          {(firstStep)?(
            <button type="submit" className="nform-send login-send">Register</button>
          ):(
            <>
          <div className="nform-send login-send text-center" onClick={(e)=>{
            doneFirstStep(true);
          }} style={{cursor:"pointer"}}>Next</div>
          </>
          )}

        </div>
        
      </form>
    </div>
  );
}