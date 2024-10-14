'use client'
import Navbar from '@/app/components/Navbar';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function page({params}) {
    const {id} = params
    const [foods,setFoods] = useState([]);
    useEffect(()=>{
        async function call(){
            const response = await axios.get(`http://127.0.0.1:8000/getfoods/${id}/`)
            if(response.data.status===200){
                setFoods(response.data.data)
            }else{
                alert('Error in Fetching foods');
            }
        }
        call();
    },[])

  return (
    <div className='bg-slate-700 w-screen min-h-screen'>
        <Navbar/>
        <h1 className="text-white text-2xl text-center py-10">Foods List</h1>
            <div className="flex flex-wrap gap-10 justify-center py-10">
                {foods.length > 0 ? (
                    foods.map((food, index) => (
                        <div key={index} className="bg-slate-800 p-4 rounded-lg text-white w-[20%]">
                            <h2 className="text-xl font-bold pb-5">{food.food}</h2>
                            
                        </div>
                    ))
                ) : (
                    <p className="text-white">No food data available</p>
                )}
            </div>
    </div>
  )
}

export default page