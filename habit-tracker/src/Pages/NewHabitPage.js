import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import MainLayout from '../Components/MainLayout';

const NewHabitPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cookies = new Cookies();
    const token = cookies.get('authToken');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/habits`,
        { userId, name, description, frequency },
        { headers: { Authorization: `${token}` } },
      );
      
      navigate("/");
    } catch (error) {
      console.error('Error creating habit:', error);
    }
  };
  
  return (
    <MainLayout>
      <div className="bg-white p-6 w-full sm:w-96 mx-auto my-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Create a new habit</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Description:</span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Frequency:</span>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
          >
            Create Habit
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default NewHabitPage;