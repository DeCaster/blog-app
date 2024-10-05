'use client'
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isUserSubscribed = localStorage.getItem('isSubscribed');
      if (isUserSubscribed === 'true') {
        setIsSubscribed(true);  // Abone olunmuşsa durumu true olarak ayarla
      }
    }
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <div className={`flex flex-col min-h-screen justify-between ${!isSubscribed ? 'justify-center' : ''}`}>
        <Header setIsSubscribed={setIsSubscribed} />
        {isSubscribed && <BlogList />} {/* Abone olduysa BlogList gösterilecek */}
        <Footer />
      </div>
    </>
  );
}
