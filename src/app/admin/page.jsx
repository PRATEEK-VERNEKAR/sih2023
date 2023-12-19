"use client"
import Image from 'next/image'
import 'animate.css'

export default function Admin(){
    return (<div className="flex flex-row w-full gap-x-12 justify-center">
        <a href="/admin/addRegion" className=" btn-nav flex flex-row justify-between items-center gap-x-2 animate__animated animate__fadeInRight">
            <Image
                src="/add.svg"
                width={24}
                height={24}
                alt="Picture of the author"
                className='block'
            />
            <h4 className='font-bold'>New Place</h4>
        </a>

        <a href="/admin/addUser" className=" btn-nav flex flex-row justify-between items-center gap-x-2 animate__animated animate__fadeInLeft">
            <Image
                src="/add.svg"
                width={24}
                height={24}
                alt="Picture of the author"
                className='block'
            />
            <h4 className='font-bold'>User</h4>
        </a>
    </div>)
}