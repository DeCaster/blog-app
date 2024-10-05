'use client'
import { assets, blog_data } from '@/Assets/assets'
import Footer from '@/Components/Footer'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const page = ({params}) => {
    const [data,setData] = useState(null)
    const fetchBlogData = async () => {
        const response = await axios.get('/api/blog',{params:{id: params.id}})
        setData(response.data)
    }
    useEffect(()=>{
      fetchBlogData()  
    },[])

  return (data ? <>
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href={'/'} className='cursor-pointer'>
            <Image src={assets.logo} alt="blog" width={180} className='w-[130px] sm:w-auto' />
            </Link>
            <button className='border border-black border-solid flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 shadow-[-7px_7px_0px_0px_#000000] hover:shadow-[-7px_7px_0px_0px_#000000AD] transition duration-200'>Get Started <Image src={assets.arrow}/></button>
        </div>
        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto '>{data.title}</h1>
          <Image src={data.author_img} alt="blog" width={60} height={60} className='mx-auto mt-6 border border-white rounded-full'/>
          <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
        </div>
    </div>
    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
      <Image src={data.image} alt="blog" width={1280} height={720} className='border-4 border-white' />
      <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1>
      <div className='blog-content' dangerouslySetInnerHTML={{__html: data.description}}></div>

      <div className='my-24'>
        <p className='text-black font font-semibold my-4'>Share this article on social media</p>
        <div className='flex '>
          <Image src={assets.facebook_icon} alt="facebook" width={50} className='m-2'/>
          <Image src={assets.twitter_icon} alt="twitter" width={50} className='m-2'/>
          <Image src={assets.googleplus_icon} alt="email" width={50} className='m-2'/>
        </div>
      </div>
    </div>
    <Footer/> 
    </>:<></>)
}

export default page