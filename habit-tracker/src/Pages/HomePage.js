import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/habits`, {
          headers: { Authorization: `${token}` },
        });
        console.log(response.data);
        setHabits(response.data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div>
      <h1>Habits</h1>
      <Link to="/new-habit">
        <button>Add New Habit</button>
      </Link>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            <h3>{habit.name}</h3>
            <p>{habit.description}</p>
            <p>Frequency: {habit.frequency}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
