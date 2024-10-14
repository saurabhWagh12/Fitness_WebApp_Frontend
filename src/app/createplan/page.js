'use client'
import axios from 'axios';
import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      height: '',
      weight: '',
      age: '',
      level: 'beginner',
      equipmentAccess: '',
      injuryStatus: '',
      workoutDays: '',
      preferredTime: 'morning',
      timeCommitment: '',
      fitnessGoal: 'stay fit',
      plan: null, // State for the workout plan
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { name, location, height, weight, age, level, equipmentAccess, injuryStatus, workoutDays, preferredTime, timeCommitment, fitnessGoal } = this.state;

    const summary = `
  I am looking for a personalized workout routine that is unique to my situation.
  Here are my details:
  - Age: ${age} years
  - Height: ${height} cm
  - Weight: ${weight} kg
  - Fitness level: ${level} (${fitnessGoal} focus)
  - Equipment available: ${equipmentAccess}
  - Health concerns: ${injuryStatus}
  - Available workout days: ${workoutDays} days per week (preferred time: ${preferredTime})
  - Time commitment: ${timeCommitment} hours per week

  Please create a custom workout routine for my personal fitness journey that is unique to my needs. 
  Ensure the plan is tailored specifically for me, considering my goals and constraints.
`;


    try {
      const response = await axios.post('http://127.0.0.1:8000/callgpt/', { data: summary,name:name,token:Cookies.get('token')});
      if (response.data.status === 200) {
        this.setState({ plan: response.data.data });
        console.log(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const {
      name,
      height,
      weight,
      age,
      level,
      equipmentAccess,
      injuryStatus,
      workoutDays,
      preferredTime,
      timeCommitment,
      fitnessGoal,
      plan, // Accessing plan from state
    } = this.state;

    return (
      <>
        {plan === null ? (
          <div className="max-w-lg mx-auto p-6 text-black bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Tell us about yourself</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Plan Name:</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter Plan Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Height (cm):</label>
                <input
                  type="number"
                  name="height"
                  value={height}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Weight (kg):</label>
                <input
                  type="number"
                  name="weight"
                  value={weight}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Level:</label>
                <select
                  name="level"
                  value={level}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Access to Equipment:</label>
                <textarea
                  name="equipmentAccess"
                  value={equipmentAccess}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Describe your access to equipment"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Injury or Health condition:</label>
                <textarea
                  name="injuryStatus"
                  value={injuryStatus}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Describe your injury status and any specific health conditions"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Days per Week for Workout:</label>
                <input
                  type="text"
                  name="workoutDays"
                  value={workoutDays}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Preferred Time:</label>
                <select
                  name="preferredTime"
                  value={preferredTime}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Time Commitment (hours per week):</label>
                <input
                  type="number"
                  name="timeCommitment"
                  value={timeCommitment}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">What do you want to do?</label>
                <select
                  name="fitnessGoal"
                  value={fitnessGoal}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="bulk">Bulk</option>
                  <option value="cut">Cut</option>
                  <option value="stay fit">Stay Fit</option>
                </select>
              </div>
              <button onClick={this.handleSubmit} type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold  py-10">Your Workout Plan is Ready</h1>
            <a href='/myplans/' className="text-xl font-medium">Check Plan</a>
          </div>
        )}
      </>
    );
  }
}

export default Form;