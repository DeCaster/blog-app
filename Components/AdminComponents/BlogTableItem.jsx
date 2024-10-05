import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'
import { format } from 'date-fns' // Import date formatting library

const BlogTableItem = ({author_img, title, date,deleteBlog,author,mongo_id}) => {
    
  return (
    <tr className='bg-white border-b hover:bg-gray-50 transition duration-200'>
        <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            <Image src={author_img || assets.profile_icon} alt="author" width={60} height={60} className='rounded-full'/>
            <p>{author?author:"N/A"}</p>
        </th>
        <td className='px-6 py-4 font-medium text-gray-800'>
            {title || "N/A"}
        </td>
        <td className='px-6 py-4'>
            {date ? format(new Date(date), 'dd MMM yyyy') : "N/A"}
        </td>
        <td className='px-6 py-4 text-center'>
            <button 
                onClick={()=>deleteBlog(mongo_id)} 
                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200'>
                Delete
            </button>
        </td>
    </tr>
  )
}

export default BlogTableItem
