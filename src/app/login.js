'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
import { NextResponse } from 'next/server'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Login() {
  const router = useRouter();
  const [user,setuser] = useState({username:"",password:""});

  async function login(e){
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/user/',user);
        if(response.data.status===200){
          Cookies.set('token',response.data.token)
          router.push('/home')
        }else{
          alert('Error in Login')
        }
      } catch (error) {
        alert('Error: '+error)
        console.log(error)
      }
  }

  return (
    <div className='bg-gray-700 h-screen w-screen'>
      <div className='pt-32 flex justify-center items-center'>
        <span className='border  border-gray-900 bg-gray-900 rounded-lg  sm:w-screen md:w-1/2 lg:w-1/3 xl:w-1/4'>

          <h1 className='text-white flex justify-center pt-6 font-mono text-4xl'>Login</h1>
          <form onSubmit={login}>
              <div class="flex items-center justify-center pt-16">
                <input type="text" className="px-4 py-2 font-mono border bg-transparent rounded-lg w-4/5" placeholder="Enter Username" onChange={(e)=>{setuser({...user,username:e.target.value})}}/>
              </div>

              <div className="flex items-center justify-center pt-8">
                <input type="password" className="px-4 py-2 font-mono border bg-transparent rounded-lg w-4/5" placeholder="Enter Password" onChange={(e)=>{setuser({...user,password:e.target.value})}}/>
              </div>

              <div className="flex items-center justify-center pt-8 pb-6">
                <button type='submit' className='bg-gray-700 font-mono px-10 py-3 text-xl rounded-lg hover:bg-gray-800'>Login</button>  
              </div>
          </form>
          <div className='text-center text-lg pb-6 px-3'>Don't have an account? <Link href={'/register/'}>Register</Link></div>


        </span>
      </div>



    </div>
  )
}
