// src/components/HabitDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../Components/Calendar';
import axios from 'axios';
import Cookies from 'universal-cookie';

const HabitDetails = () => {
  const { habitId } = useParams();
  const [habit, setHabit] = useState(null);
  const [completions, setCompletions] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get('authToken');

  const fetchHabitData = async () => {
    try {

      const habitResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/habits/${habitId}`, {
        headers: { Authorization: `${token}` },
      });

      const completionsResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/habits/habitCompletions/${habitId}`, {
        headers: { Authorization: `${token}` },
      });

      setHabit(habitResponse.data);
      setCompletions(completionsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHabitData();
  }, [habitId]);

  if (!habit) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{habit.name}</h2>
        <p className="text-gray-500 mb-6">{habit.description}</p>
        <div className="border-t border-gray-200 pt-6">
          <Calendar completions={completions} />
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
