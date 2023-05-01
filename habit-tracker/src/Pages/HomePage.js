import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import styles from '../css/HomePage.module.css'
import HabitCard from '../Components/HabitCard'
import MainLayout from '../Components/MainLayout';

const HomePage = () => {
  const [habits, setHabits] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get('authToken');

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
    
    <MainLayout>
      <div>
        <h1>Habits</h1>
        <div className={styles.header}>
          <div className={styles.linkContainer}>
              <Link to="/new-habit">
                <button className={styles.addHabitButton}>Add New Habit</button>
              </Link>
          </div>
        </div>
        <div className={styles.habitsGrid}>
          {habits.map((habit) => (
            <HabitCard key={habit._id} habit={habit} onDelete={deleteHabit} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
