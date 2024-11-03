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

        <div className='flex justify-center pt-10 '>
        <div className='flex flex-wrap gap-20 justify-center w-[90%] font-semibold text-center'>
          <a href='/myplans/'  className='w-1/5 text-white bg-slate-400 rounded-lg py-4'>
            <img src='https://media.istockphoto.com/id/928088390/photo/human-hand-preparing-workout-plan.jpg?s=612x612&w=0&k=20&c=5XRbw8ZTVRsw6UHxVjwUKFwMyGWqcDhr8io5oVVavgw=' />
            <p>My Plans</p>
          </a>
          <a href='/createplan/' className='w-1/5 text-white bg-slate-400 rounded-lg py-4'>
            <img src='https://media.istockphoto.com/id/675179390/photo/muscular-trainer-writing-on-clipboard.jpg?s=1024x1024&w=is&k=20&c=WNuBnKdaPcBho-CjmRrdBVlIy8TCegBTo4ZdmbTj7aE=' />
            <p>Create Plan</p>
          </a>
          <a href='/tutorial/' className='w-1/5 text-white bg-slate-400 rounded-lg py-4'>
            <img src='https://media.istockphoto.com/id/1387629073/photo/personal-trainer-assisting-a-man-in-training.jpg?s=1024x1024&w=is&k=20&c=0SX-AjIS37ngkgFfiW9xwx4f37GLhHiCmfyJ2pRFVCI=' />
            <p>Workout Tutorials</p>
          </a>
          <a href='/nutrition/'  className='w-1/5 text-white bg-slate-400 rounded-lg py-4'>
            <img  src='https://media.istockphoto.com/id/850904524/photo/healthy-food-take-away-top-view-at-wood-background.jpg?s=612x612&w=0&k=20&c=XIyRaW-paEbEx7UYWgkhVCya_5oXaZ9wi4l-zzva7no=' />
            <p>Nutrition</p>
          </a>

          {/* <a href='/recipe/'  className='w-1/5 text-white bg-slate-400 rounded-lg py-4'>
            <img  src='https://media.istockphoto.com/id/850904524/photo/healthy-food-take-away-top-view-at-wood-background.jpg?s=612x612&w=0&k=20&c=XIyRaW-paEbEx7UYWgkhVCya_5oXaZ9wi4l-zzva7no=' />
            <p>Recipe</p>
          </a> */}

         </div>
        </div>
       
    </div>


    </div>
  )
}

export default page;