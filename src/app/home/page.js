"use client"
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import React, { useEffect, useRef, useState } from 'react'
// import Modal from '../components/Modal'

function page() {
    const router = useRouter();

    useEffect(()=>{
      const fetchPlans= async()=>{
          const data = {token:Cookies.get('token')}
          try{
            const response = await axios.post('http://127.0.0.1:8000/myplans/',data);
            if(response.data.status===200){
              console.log(response.data);
            }else{
              alert('Error in Fetching the plans');
              console.log(response.data)
            }
          }catch(e){
            alert(e);
            console.log(e);
          }
      }
      fetchPlans();
    },[]);

    const logout = async(e)=>{
      try {
          const response = await axios.get('http://127.0.0.1:8000/logout/');
          if(response.statusText === 'OK'){
              Cookies.remove('token');
              alert('Logging Out')
              router.push('/')
          }
      } catch (error) {
          console.log(error)
      }
      
  }

  return (
    <div className='bg-slate-700 w-screen  min-h-screen'>


    <div>
        <nav className='w-screen h-16 bg-gray-800'>

        <a href='/' className='text-white font-mono text-lg sm:text-lg md:text-lg lg:text-2xl xl:text-2xl inline-block pt-3 pl-3 float-left'>My-Fit-Life</a>
                    
                <button onClick={logout} className='px-2 py-1 sm:text-md md:text-md lg:text-xl xl:text-xl bg-slate-300 text-black font-mono rounded-lg mx-8 float-right mt-3'>Logout</button>
        </nav>

        <div className='flex justify-center pt-10'>
        <div className='flex flex-wrap justify-between w-[90%] font-semibold text-center'>
          <a href='/myplans/' className='w-1/5 text-white bg-slate-400 rounded-lg py-4'>My Plans</a>
          <a href='/createplan/' className='w-1/5 text-white  bg-slate-400 rounded-lg py-4'>Create Plan</a>
          <a href='/tutorial/' className='w-1/5 text-white  bg-slate-400 rounded-lg py-4'>Workout Tutorial</a>
          <a href='/nutrition/' className='w-1/5 text-white  bg-slate-400 rounded-lg py-4'>Nutrition</a>
        </div>
        </div>
       
    </div>


    </div>
  )
}

export default page;