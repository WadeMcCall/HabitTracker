import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import MainLayout from '../Components/MainLayout';
import HabitForm from '../Components/HabitForm';

const NewHabitPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const navigate = useNavigate();

  const dayShortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cookies = new Cookies();
    const token = cookies.get('authToken');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/habits`,
        { userId, name, description, daysOfWeek },
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
        <HabitForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          daysOfWeek={daysOfWeek}
          setDaysOfWeek={setDaysOfWeek}
          onSubmit={handleSubmit}
        />
      </div>
    </MainLayout>
  );
};

export default NewHabitPage;