'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

    const [image,setImage] =useState(false)
    const[data,setData] = useState({
      title:"",
      description:"",
      category:"Startup",
      author:"Alex Bennett",
      author_img:"/author_img.png",
    })
    const onChangeHandler = (e)=>{
      const name = e.target.name
      const value = e.target.value
      setData(data=>({...data,[name]:value}))
      console.log(data);
    }
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("image",image)
        formData.append("title",data.title)
        formData.append("description",data.description)
        formData.append("category",data.category)
        formData.append("author",data.author)
        formData.append("author_img",data.author_img)
        const res = await axios.post(`/api/blog`,formData)
        if(res.data.success){
          toast.success(res.data.msg)
          setImage(false)
          setData({
              title:"",
              description:"",
              category:"Startup",
              author:"Alex Bennett",
              author_img:"/Assets/blog_pic_11.png",
          })
          
        }else{
          toast.error(res.data.msg)
        }
    }
  return (
    <>
    <form onSubmit={onSubmitHandler} className='pt-5 px-5 ml-6 sm:pt-12 sm:pl-165'>
        <p className='text-xl'>Upload thubnail</p>
        <label htmlFor="image" className=''>
            <Image src={!image?assets.upload_area:URL.createObjectURL(image)} alt="upload" width={140} height={70} className='mt-4 cursor-pointer'  />
        </label>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        <p className='text-xl mt-4'>Blog title</p>
        <input name="title"  onChange={onChangeHandler} value={data.title}  className='w-full sm:w-[500px] mt-4 px-4 py-3 border ' type="text" placeholder='Type title..' required />
        <p className='text-xl mt-4'>Blog Description</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description}  className='w-full sm:w-[500px] mt-4 px-4 py-3 border '  placeholder='write content here..' rows={6} required />
        <p className='text-xl mt-4'>Blog Category</p>
        
        <select name="category" onChange={onChangeHandler} value={data.category}  className='w-40 mt-4 px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition duration-300 ease-in-out'>
           <option value="Startup">Startup</option>
           <option value="Technology">Technology</option>
           <option value="Lifestyle">Lifestyle</option>
        </select>
        <button type='submit' className='flex flex-col items-center justify-center rounded-xl mt-8 w-40 h-12 bg-black text-white'>Add</button>
        

    </form>
    
    </>
  )
}

export default page