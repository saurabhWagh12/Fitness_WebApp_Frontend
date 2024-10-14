import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function Navbar() {
    const router = useRouter();
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
    <nav className='w-screen h-16 bg-gray-800'>

        <a href='/' className='text-white font-mono text-lg sm:text-lg md:text-lg lg:text-2xl xl:text-2xl inline-block pt-3 pl-3 float-left'>My-Fit-Life</a>
                    
                <button onClick={logout} className='px-2 py-1 sm:text-md md:text-md lg:text-xl xl:text-xl bg-slate-300 text-black font-mono rounded-lg mx-8 float-right mt-3'>Logout</button>
        </nav>
  )
}

export default Navbar