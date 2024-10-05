import { format } from 'date-fns'
import React from 'react'

const SubsTableItem = ({email,deleteBlog,date,mongo_id}) => {
  return (
    <tr className='bg-white border-b text-left hover:bg-gray-50 transition duration-200'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            {email?email:"N/A"}
        </th>
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

export default SubsTableItem