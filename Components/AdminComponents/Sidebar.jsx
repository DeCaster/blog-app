import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100'>
        <div className='px-2 sm:pl-14 py-3 border border-black'>
            <Link href={'/'}><Image src={assets.logo} alt="logo" width={120}  /></Link>
        </div>
        <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
            <div className='w-[50%] sm:w-[80%] absolute right-0 mr-0.5'>
            <Link href={'/admin/addProduct'} className='mt-6 flex items-center border border-black gap-3 font-medium px-3 py-2 rounded-xl bg-white shadow-[-5px_5px_0px_0px_#bebebe] cursor-pointer hover:shadow-[-5px_5px_0px_0px_#000000] transition duration-300'>
                <Image src={assets.add_icon} alt="dashboard" width={28} /><p>Add blogs</p>
            </Link>
            <Link href={'/admin/blogList'} className='mt-6 flex items-center border rounded-xl border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_0px_#bebebe] cursor-pointer hover:shadow-[-5px_5px_0px_0px_#000000] transition duration-300'>
                <Image src={assets.blog_icon} alt="dashboard" width={28} /><p>Blog list</p>
            </Link>
            <Link href={'/admin/subscriptions'} className='mt-6 flex items-center rounded-xl border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_0px_#bebebe] cursor-pointer hover:shadow-[-5px_5px_0px_0px_#000000] transition duration-300'>
                <Image src={assets.email_icon} alt="dashboard" width={28} /><p>Subscriptions</p>
            </Link>
            
            </div>
            
        </div>
    </div>
  )
}

export default Sidebar