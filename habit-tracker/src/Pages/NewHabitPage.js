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
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  const dayShortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  const handleDaysOfWeekChange = (e) => {
    const day = e.target.value;
    if (e.target.checked) {
      setDaysOfWeek([...daysOfWeek, day]);
    } else {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== day));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cookies = new Cookies();
    const token = cookies.get('authToken');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/habits`,
        { userId, name, description, frequency, daysOfWeek  },
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
              <option value="custom">Custom</option>
            </select>
          </label>
        {frequency === 'custom' && (
          <fieldset className="space-y-2">
            <legend className="text-gray-700">Days of the week:</legend>
            <div className="grid grid-cols-3 gap-2">
              {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day, index) => (
                <div key={day}>
                  <label
                    key={day}
                    className={`inline-flex items-center cursor-pointer w-full justify-center ${
                      daysOfWeek.includes(day)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    } px-3 py-1 rounded-md shadow-sm select-none`}
                  >
                    <input
                      type="checkbox"
                      value={day}
                      onChange={handleDaysOfWeekChange}
                      checked={daysOfWeek.includes(day)}
                      className="hidden"
                    />
                    <span className="ml-2 capitalize">{dayShortNames[index]}</span>
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        )}
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