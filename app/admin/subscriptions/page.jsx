'use client'
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [emails, setEmails] = useState([])

  const fetchEmails = async () => {
    const response = await axios.get('/api/email')
    setEmails(response.data.emails)
  }

  const deleteBlog = async (mongo_id) => {
    const response = await axios.delete(`/api/email`, {
      params: {
        id: mongo_id,
      },
    })
    if (response.data.success) {
      toast.success(response.data.msg)
      fetchEmails()
    } else {
      toast.error(response.data.msg)
    }
  }

  useEffect(() => {
    fetchEmails()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>
        All Subscriptions
      </h1>
      <div className='relative h-[80vh] max-w-[800px] overflow-x-auto mt-4 border rounded-lg border-gray-300 shadow-lg scrollbar-hide'>
        <table className='w-full text-sm text-gray-600'>
          <thead className='text-xs text-left text-gray-600 uppercase bg-gradient-to-r from-gray-100 to-gray-200 shadow-sm'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                Email Subscription
              </th>
              <th scope='col' className='hidden sm:block px-6 py-4'>
                Date
              </th>
              <th scope='col' className='px-6 py-4'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {emails.map((item, index) => {
              return (
                <SubsTableItem
                  key={index}
                  mongo_id={item._id}
                  email={item.email}
                  date={item.date}
                  deleteBlog={deleteBlog}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
