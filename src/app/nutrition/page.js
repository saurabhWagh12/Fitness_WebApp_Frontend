'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Page() {
    const router = useRouter();
    const [nutrition, setNutrition] = useState([]);
    const [food, setFood] = useState("");
    const [selectedValue, setSelectedValue] = useState('protein_g'); // Default selected value
    const [graph, setGraphData] = useState([]);

    // Define the getNutritions function to fetch the data
    async function getNutritions() {
        const data = { token: Cookies.get('token') };
        try {
            const response = await axios.post('http://127.0.0.1:8000/getnutrition/', data);
            if (response.data.status === 200) {
                setNutrition(response.data.data);
                setFood('');
                setGraphData(response.data.graph);
                console.log(response.data.graph);
            } else {
                alert('Error in fetching the nutrition data');
                console.log(response.data);
            }
        } catch (e) {
            alert(e);
            console.log(e);
        }
    }

    // Call getNutritions when the component mounts
    useEffect(() => {
        getNutritions();
    }, []);

    // Function to add food and refresh the nutrition data
    async function nutritionFunction() {
        const data = { token: Cookies.get('token'), food: food };
        try {
            const response = await axios.post('http://127.0.0.1:8000/postnutrition/', data);
            if (response.data.status === 200) {
                // Call getNutritions to refresh the data
                getNutritions();
            } else {
                alert('Error in adding food');
            }
        } catch (error) {
            alert(error);
        }
    }

    // Prepare data for the chart
    const labels = nutrition.map(item => item.date); // Dates for x-axis
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: `Selected Value: ${selectedValue}`,
                data: nutrition.map(item => item[selectedValue]), // Dynamic data based on selection
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };


const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: 'white', // Set legend text color to white
            },
        },
        title: {
            display: true,
            text: `Nutritional Data Chart (${selectedValue})`,
            color: 'white', // Set title color to white
        },
        tooltip: {
            bodyColor: 'white', // Set tooltip body text color to white
            titleColor: 'white', // Set tooltip title text color to white
        }
    },
    scales: {
        x: {
            ticks: {
                color: 'white', // Set x-axis labels text color to white
            },
        },
        y: {
            ticks: {
                color: 'white', // Set y-axis labels text color to white
            },
        },
    },
};


    return (
        <div className='bg-slate-700 w-screen min-h-screen'>
            <Navbar />

            

            {/* Line Chart */}
            <div className='w-[100%] flex justify-center'>
            <div className='py-5'>
                <label className='text-white font-semibold mr-2'>Select Nutritional Value:</label>
                <select
                    className='bg-slate-800 text-white p-2 rounded'
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                >
                    <option value="protein_g">Protein (g)</option>
                    <option value="sugar_g">Sugar (g)</option>
                    <option value="fat_total_g">Total Fats (g)</option>
                    <option value="carbohydrates_total_g">Carbohydrates (g)</option>
                    <option value="fiber_g">Fiber (g)</option>
                    <option value="sodium_mg">Sodium (mg)</option>
                    <option value="cholesterol_mg">Cholesterol (mg)</option>
                    <option value="calories">Calories</option>
                </select>
            </div>
                <div className='w-[70%]'>
                <Line data={chartData} options={options} />
                </div>
            </div>

            <div className='py-10'>
                <div className='flex justify-center my-4 gap-10'>
                    <input
                        className='border-black border-2 rounded-lg text-white bg-slate-500 w-[40%] font-semibold text-center'
                        onChange={(e) => setFood(e.target.value)}
                        value={food}
                        placeholder='Add your meal'
                    />
                    <button className='bg-slate-500 font-semibold px-4 py-2 rounded-xl' onClick={nutritionFunction}>
                        Add
                    </button>
                </div>
            </div>

            <div className='py-10 flex flex-wrap gap-10 justify-center'>
                {nutrition.length > 0 ? (
                    nutrition.map((item, index) => (
                        <a href={`/nutrition/${item.id}/`} key={index} className='bg-slate-800 p-4 rounded-lg text-white w-[20%]'>
                            <h2 className='text-xl pb-5 font-bold'>{item.date}</h2>
                            <p>Calories: {item.calories}</p>
                            <p>Protein: {item.protein_g}g</p>
                            <p>Fiber: {item.fiber_g}g</p>
                            <p>Carbohydrates: {item.carbohydrates_total_g}g</p>
                            <p>Sugar: {item.sugar_g}g</p>
                            <p>Sodium: {item.sodium_mg}mg</p>
                            <p>Potassium: {item.potassium_mg}mg</p>
                            <p>Cholesterol: {item.cholesterol_mg}mg</p>
                            <p>Serving Size: {item.serving_size_g}g</p>
                            <p>Saturated Fats: {item.fat_saturated_g}g</p>
                            <p>Total Fats: {item.fat_total_g}g</p>
                        </a>
                    ))
                ) : (
                    <p className='text-white'>No nutrition data available</p>
                )}
            </div>
        </div>
    );
}

export default Page;
