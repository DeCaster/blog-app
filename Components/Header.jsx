import { assets } from '@/Assets/assets';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // useRouter hook for navigation
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

const Header = ({ setIsSubscribed }) => {
  const [email, setEmail] = useState('');
  const router = useRouter(); // Initializing router

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isUserSubscribed = localStorage.getItem('isSubscribed');
      if (isUserSubscribed === 'true') {
        setIsSubscribed(true);
      }
    }
  }, [setIsSubscribed]);

  // Function to handle redirection to the admin page
  const goToAdminPage = () => {
    router.push('/admin/addProduct');
  };

  // Function to handle form submission for email subscription
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);

    try {
      const response = await axios.post('/api/email', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail('');
        setIsSubscribed(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('isSubscribed', 'true');
        }
      } else {
        toast.error(response.data.msg);
        setIsSubscribed(false);
        if (typeof window !== 'undefined') {
          localStorage.setItem('isSubscribed', 'false');
        }
      }
    } catch (error) {
      toast.error('Bir hata oluştu!');
      setIsSubscribed(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('isSubscribed', 'false');
      }
    }
  };

  // Function to handle logout and subscription removal
  const logoutHandler = () => {
    setIsSubscribed(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isSubscribed');
    }
    toast.info('Abonelikten çıkıldı.');
  };

  return (
    <div className='py-6 px-6 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Image
          src={assets.logo}
          alt='Website Logo' // Added alt attribute
          width={180}
          className='w-[180px] sm:w-auto cursor-pointer'
        />

        {typeof window !== 'undefined' && localStorage.getItem('isSubscribed') === 'true' ? (
          <div className='flex flex-row border border-black border-solid items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 shadow-[-7px_7px_0px_0px_#000000]'>
            <button
              onClick={logoutHandler}
              className='hover:text-yellow-400 transition duration-200'>
              Logout
            </button>
            <p>/</p>
            <button
              onClick={goToAdminPage} // Properly assign the event handler here
              className='hover:text-yellow-400 transition duration-200'>
              Admin
            </button>
          </div>
        ) : (
          <button
            className='border border-black border-solid flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 shadow-[-7px_7px_0px_0px_#000000] hover:shadow-[-7px_7px_0px_0px_#000000AD] transition duration-200'
            onClick={goToAdminPage} // Added onClick event handler for redirection
          >
            <span className='bg-gradient-to-r from-gray-700 via-yellow-400 to-gray-500 bg-clip-text text-transparent'>
              Admin
            </span>
            <Image src={assets.arrow} alt='Arrow Icon' />
          </button>
        )}
      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl font-medium sm:text-5xl'>
          <span className='bg-gradient-to-r from-gray-400 via-yellow-500 to-gray-500 bg-clip-text text-transparent'>
            Latest
          </span>{' '}
          Blogs
        </h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          perferendis ratione optio tenetur, qui laborum Suscipit tempora
          praesentium quis qui.
        </p>
        <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-10'>
          <form
            onSubmit={onSubmitHandler}
            className='flex w-full max-w-[400px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden'
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
              placeholder='Enter your email to subscribe'
              className='flex-1 py-3 px-4 outline-none text-gray-700 bg-transparent'
            />
            <button
              type='submit'
              className='bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-6 py-3 hover:from-blue-500 hover:to-green-400 transition-all duration-300'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
