"use client"
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube'
import Navbar from '../components/Navbar';

function Page() {
    const router = useRouter(); 
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null); // Track selected plan
    const [isModalOpen, setIsModalOpen] = useState(false);  // Track modal visibility
    useEffect(() => {
        const fetchPlans = async () => {
            const data = { token: Cookies.get('token') };
            try {
                const response = await axios.post('http://127.0.0.1:8000/myplans/', data);
                if (response.data.status === 200) {
                    setPlans(response.data.data);
                } else {
                    alert('Error in Fetching the plans');
                    console.log(response.data);
                }
            } catch (e) {
                alert(e);
                console.log(e);
            }
        };
        fetchPlans();
    }, []);

    // Function to open modal and set selected plan
    const openModal = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlan(null);
    };

    const deletePlan = async(id)=>{
        try {
            const response = await axios.get(`http://127.0.0.1:8000/deleteplan/${id}/`);
            if(response.data.status===200){
                router.push('/myplans');
            }else{
                console.log('Error');
            }

        } catch (error) {
            alert('error')
        }
        closeModal();
    }

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

    return (
        <div className='bg-slate-700 w-screen min-h-screen'>
            <Navbar/>

            <div className='flex justify-around flex-wrap py-10'>
                {plans.length > 0 ? (
                    plans.map((plan, index) => (
                        <div
                            key={index}
                            className='bg-white text-black p-4 rounded-lg shadow-lg cursor-pointer'
                            onClick={() => openModal(plan)} // Open modal on click
                        >
                            <h2 className='text-xl font-bold mb-2'>{plan.plan_name}</h2>
                            {/* <p>{plan.plan}</p> */}
                        </div>
                    ))
                ) : (
                    <p className='text-white'>No plans available. Create one to get started!</p>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && selectedPlan && (
                <div className='fixed inset-0 flex items-center justify-center bg-black '>
                    <div className='bg-white p-6 rounded-lg shadow-lg max-w-[80%] font-semibold w-full h-auto max-h-[80vh] overflow-auto text-black'>
                        <div className='flex justify-between'>
                            <h2 className='text-2xl font-bold mb-4'>{selectedPlan.plan_name}</h2>
                            <div className='flex justify-center my-4 gap-10'><input className='border-black border-2 rounded-lg  w-[80%] font-semibold text-center' onChange={(e)=>setSearch(e.target.value)} placeholder='Search Workouts'></input>
                                <button className='bg-slate-500 font-semibold text-white px-4 py-2 rounded-xl' onClick={searchFunction}>Search</button>
                            </div>
                        </div>


                        {/* Workout tutorial list */}
                        <div className='flex justify-center flex-wrap gap-10 py-10'>
                            {workouts && workouts.length > 0 ? (
                                workouts.map((workout, index) => (
                                    <div key={index} className='bg-gray-900 w-[40%]  text-white p-4 rounded-lg shadow-lg'>
                                        <h2 className='text-xl font-bold'>{workout.name}</h2>
                                        <p>{workout.description}</p>
                                        <ReactPlayer url={workout.link}  width='100%' />
                                    </div>
                                ))
                            ) : (
                                // <p className='text-white text-center font-bold '>No workouts found</p>
                                <></>
                            )}
                        </div>


                        <p className='whitespace-pre-line'>{selectedPlan.plan}</p>
                        <div className='flex justify-between'>
                        <button onClick={closeModal} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>
                            Close
                        </button>
                        <button onClick={()=>{deletePlan(selectedPlan.id)}} className='mt-4 bg-red-500 text-white px-4 py-2 rounded'>
                            Delete
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
