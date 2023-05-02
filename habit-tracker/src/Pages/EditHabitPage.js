import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import MainLayout from '../Components/MainLayout';
import HabitForm from '../Components/HabitForm';

const EditHabitPage = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState([]);

// Fetch habit data and set state
useEffect(() => {
    const fetchHabit = async () => {
      const cookies = new Cookies();
      const token = cookies.get('authToken');
      
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/habits/${habitId}`, {
          headers: { Authorization: `${token}` },
        });
        const fetchedHabit = response.data;
        setHabit(fetchedHabit);
        setName(fetchedHabit.name);
        setDescription(fetchedHabit.description);
        setDaysOfWeek(fetchedHabit.daysOfWeek);
      } catch (error) {
        console.error('Error fetching habit:', error);
      }
    };
  
    fetchHabit();
  }, [habitId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const cookies = new Cookies();
    const token = cookies.get('authToken');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/habits/${habitId}`,
        { userId, name, description, daysOfWeek },
        { headers: { Authorization: `${token}` } },
      );
  
      navigate("/");
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white p-6 w-full sm:w-96 mx-auto my-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Edit habit</h1>
        {habit ? (
          <HabitForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            daysOfWeek={daysOfWeek}
            setDaysOfWeek={setDaysOfWeek}
            onSubmit={handleSubmit}
          />
        ) : (
          <p>Loading habit...</p>
        )}
      </div>
    </MainLayout>
  );
};

export default EditHabitPage;
