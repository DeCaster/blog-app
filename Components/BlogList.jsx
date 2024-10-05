import { blog_data } from '@/Assets/assets'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const BlogList = () => {
    const [menu,setMenu] = useState('All')
    const [blogs,setBlogs] = useState([])
    const fetchBlogs = async () => {
      const response = await axios.get('/api/blog')
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
    }
    useEffect(()=>{
      fetchBlogs()
    },[])
  return (
    <div className='my-10'>
      <div className='flex justify-center gap-6 mb-8'>
        <button onClick={()=>setMenu('All')} className={menu === 'All' ?`bg-white text-black py-1 px-4 rounded-sm hover:bg-black hover:text-white duration-200`:""}>All</button>
        <button onClick={()=>setMenu('Technology')} className={menu === 'Technology' ?`bg-white text-black py-1 px-4 rounded-sm hover:bg-black hover:text-white duration-200`:""}>Technology</button>
        <button onClick={()=>setMenu('Startup')} className={menu === 'Startup' ?`bg-white text-black py-1 px-4 rounded-sm hover:bg-black hover:text-white duration-200`:""}>Startup</button>
        <button onClick={()=>setMenu('Lifestyle')} className={menu === 'Lifestyle' ?`bg-white text-black py-1 px-4 rounded-sm hover:bg-black hover:text-white duration-200`:""}>Lifestyle</button>
      </div>
      <div className='flex flex-wrap justify-center gap-6 xl:mx-24'>
        {blogs.filter((item)=> menu==='All' ? true : item.category === menu).map((item, index)=>(
          <BlogItem key={index} id={item._id} img={item.image} title={item.title} description={item.description} category={item.category} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
