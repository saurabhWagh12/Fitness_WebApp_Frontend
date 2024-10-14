'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import Navbar from '../components/Navbar';

function Page() {

    const [workouts, setWorkouts] = useState([]);
    const [search,setSearch] = useState("");

    async function searchFunction(){
        const response = await axios.get(`http://127.0.0.1:8000/searchworkout/?q=${search}`);
        try {
            if(response.data.status===200){
                setWorkouts(response.data.data);
            }else{
                console.log('Error in Fetching Searched Workouts');
            }
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        async function getAllTutorials() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/tutorials/');
                if (response.data.status === 200) {
                    setWorkouts(response.data.data);
                } else {
                    console.log('Error');
                }
            } catch (error) {
                alert(error);
            }
        }
        getAllTutorials();
    }, []);


    useEffect(()=>{
        console.log(workouts);
    },workouts)
    return (
        <div className='bg-slate-700 w-screen  min-h-screen'>
            <div>
                <Navbar/>

                <h1 className='text-white font-bold text-center mt-10'>Workout Tutorials</h1>

                <div className='flex justify-center my-4 gap-10'><input className='border-black border-2 rounded-lg text-white bg-slate-500 w-[30%] font-semibold text-center' onChange={(e)=>setSearch(e.target.value)}></input>
                    <button className='bg-slate-500 font-semibold px-4 py-2 rounded-xl' onClick={searchFunction}>Search</button>
                </div>

                <div className='flex justify-center flex-wrap gap-10'>
                    {workouts && workouts.length > 0 ? (
                        workouts.map((workout, index) => (
                            <div key={index} className='bg-gray-900 text-white p-4 rounded-lg shadow-lg'>
                                <h2 className='text-xl font-bold'>{workout.name}</h2>
                                <p>{workout.description}</p>
                                <ReactPlayer url={workout.link} />
                            </div>
                        ))
                    ) : (
                        <p className='text-white text-center font-bold '>No workouts found</p>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Page;
