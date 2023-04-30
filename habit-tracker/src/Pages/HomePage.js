import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../css/HomePage.css'
import HabitCard from '../Components/HabitCard'

const HomePage = () => {
  const [habits, setHabits] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/habits`, {
          headers: { Authorization: `${token}` },
        });
        setHabits(response.data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    fetchHabits();
  }, []);

  const deleteHabit = async (habitId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/habits/${habitId}`, {
        headers: { Authorization: `${token}` },
      });
      // Remove the habit from the state
      setHabits(habits.filter((habit) => habit._id !== habitId));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <div>
      <h1>Habits</h1>
      <Link to="/new-habit">
        <button>Add New Habit</button>
      </Link>
      <div className="habits-grid">
        {habits.map((habit) => (
          <HabitCard key={habit._id} habit={habit} onDelete={deleteHabit} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
