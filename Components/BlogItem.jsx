import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItem = ({title,description,category,img,id}) => {
  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-gray-200 shadow-[-7px_7px_0px_0px_#d9d9d9]  hover:shadow-[-7px_7px_0px_0px_#000000AD] transition duration-300 rounded-lg'>
        <Link href={`/blogs/${id}`}>
        <Image src={img} alt="blog" width={400} height={400} className='border-b border-black rounded-lg ' />
        </Link>
        <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
        <div className='p-5'>
            <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
            <p className='mb-3 text-sm tracking-tight text-gray-700' dangerouslySetInnerHTML={{__html: description.slice(0,120)}}></p>
            <Link href={`/blogs/${id}`} className='inline-flex items-center py-2 font-semibold text-center'>
                Read More <Image src={assets.arrow} alt="arrow" width={12} className='m-2' />
            </Link>
        </div>
    </div>
  )
}

export default BlogItem
