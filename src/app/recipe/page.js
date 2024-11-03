'use client'
import React, { useState } from 'react'
import Navbar from '../components/Navbar';

function Page() {
    const [search, setSearch] = useState("");      // For search input
    const [recipes, setRecipes] = useState([]);    // To store the search results

    async function searchFunction() {
        try {
            const response = await fetch(`https://api.calorieninjas.com/v1/recipe?query=${search}/`, {
                method: 'GET',
                headers: { 'X-Api-Key': 'WfQlyJ5CRE9zrkVYz4qo1w==U9FklGEjrJAPesks' }
            });

            if (response.ok) {
                const result = await response.json();
                setRecipes(result.items || []);   // Update the state with the search results
                console.log(result);
            } else {
                console.error('Error fetching recipes');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='bg-slate-700 w-screen min-h-screen'>
            <div>
                <Navbar />

                <h1 className='text-white font-bold text-center mt-10'>Workout Tutorials</h1>

                <div className='flex justify-center my-4 gap-10'>
                    <input 
                        className='border-black border-2 rounded-lg text-white bg-slate-500 w-[30%] font-semibold text-center' 
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for recipes"
                    />
                    <button className='bg-slate-500 font-semibold px-4 py-2 rounded-xl' onClick={searchFunction}>
                        Search
                    </button>
                </div>

                <div className='flex justify-center flex-wrap gap-10'>
                    {recipes && recipes.length > 0 ? (
                        recipes.map((recipe, index) => (
                            <div key={index} className='bg-gray-900 text-white p-4 rounded-lg shadow-lg'>
                                <h2 className='text-xl font-bold'>{recipe.title}</h2>
                                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                <p><strong>Servings:</strong> {recipe.servings}</p>
                                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            </div>
                        ))
                    ) : (
                        <p className='text-white'>No recipes found. Try searching for something else.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page;
