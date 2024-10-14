"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Register() {

    const router = useRouter();

    const [userDetails,setUserDetail] = useState({username:"",email:"",password:""})

    const register = async(e)=>{
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/register/',userDetails);
        console.log(response.data)
        if (response.data && response.data.status === 200) {
          alert("Successfully Registered");
          router.push('/');
        }
          
      } catch (error) {
        alert('Error in Registration(user exist)')
        console.log(error)
      }
      
    }


  return (
    <div className='bg-gray-700 h-screen w-screen'>
      <div className='pt-32 flex justify-center items-center'>
        <span className='border  border-gray-900 bg-gray-900 rounded-lg  sm:w-screen md:w-1/2 lg:w-1/3 xl:w-1/4'>

          <h1 className='text-white flex justify-center pt-6 font-mono text-4xl'>Register</h1>
            <form onSubmit={register}>
                <div class="flex items-center justify-center pt-16">
                    <input type="text" name='username' className="px-4 py-2 font-mono border bg-transparent rounded-lg w-4/5" placeholder="Enter Username" onChange={(e) => {setUserDetail({...userDetails, username: e.target.value, })}} />
                </div>

                <div className="flex items-center justify-center pt-8">
                    <input type="email" name='email' className="px-4 py-2 font-mono border bg-transparent rounded-lg w-4/5" placeholder="Enter Email" onChange={(e)=>{setUserDetail({...userDetails,email:e.target.value})}} />
                </div>

                <div className="flex items-center justify-center pt-8">
                    <input type="password" name='password' className="px-4 py-2 font-mono border bg-transparent rounded-lg w-4/5" placeholder="Enter Password" onChange={(e)=>{setUserDetail({...userDetails,password:e.target.value})}} />
                </div>

                <div className="flex items-center justify-center pt-8 pb-6">
                    <button type='submit' className='bg-gray-700 font-mono px-10 py-3 text-xl rounded-lg hover:bg-gray-800'>Register</button>  
                </div>

            </form>
          <div className='text-center text-lg pb-6 px-3'>Already have an account? <Link href={'/'}>Login</Link></div>


        </span>
      </div>



    </div>
  )
}
