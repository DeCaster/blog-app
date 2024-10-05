'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
   const [blogs,setBlogs] = useState([])

   const fetchBlogs = async () => {
    const response = await axios.get('/api/blog')
    setBlogs(response.data.blogs)
   }
   const deleteBlog = async (mongo_id) => {
    const response = await axios.delete(`/api/blog`,{
      params:{
        id:mongo_id
      }
    })
    toast.success(response.data.msg)
    fetchBlogs()

    
   }

   useEffect(()=>{
    fetchBlogs()
   },[])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-3xl font-semibold text-gray-800'>All Blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-300 rounded-lg shadow-md'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-100 border-b border-gray-300'>
            <tr>
              <th scope='col' className='hidden sm:table-cell px-6 py-3'>
                Author
              </th>
              <th scope='col' className='px-6 py-3'>
                Blog Title
              </th>
              <th scope='col' className='px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-2 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <BlogTableItem 
                key={index} 
                mongo_id={blog._id}
                author_img={blog.author_img} 
                title={blog.title} 
                date={blog.date}
                deleteBlog={deleteBlog}
                author={blog.author}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
