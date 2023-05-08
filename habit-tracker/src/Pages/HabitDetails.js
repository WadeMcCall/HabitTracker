import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../Components/Calendar/Calendar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import MainLayout from '../Components/MainLayout';

const HabitDetails = () => {
  const { habitId } = useParams();
  const [habit, setHabit] = useState(null);
  const [completions, setCompletions] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get('authToken');
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const daysOfWeekMap = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };
  
  const fetchHabitData = async () => {
    try {
      const habitResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/habits/${habitId}`, {
        headers: { Authorization: `${token}` },
      });
  
      setHabit(habitResponse.data);
      console.log(habitResponse.data);
      setCompletions(habitResponse.data.completions); // Set completions directly from the habit response
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchHabitData();
  }, [habitId]);

  const onDayClick = (date) => {
    console.log('Selected date:', date);
  };

  const shouldHabitBeCompletedOnDate = (date) => {
    const createdAtDate = new Date(habit.createdAt);
    if(date.getTime() < createdAtDate.getTime()) return false;
    if(habit.daysOfWeek.length === 0) {
      return true;
    }
    const dayOfWeek = daysOfWeekMap[date.getDay()];
    return habit.daysOfWeek.includes(dayOfWeek);
  }
  
  function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }
  
  const colorCodeFunction = (date) => {
    const today = new Date();
    const completionDates = completions.map((completion) => new Date(completion.completionDate));
  
    if (completionDates.some((completionDate) => isSameDay(completionDate, date))) {
      return 'green';
    } else if (shouldHabitBeCompletedOnDate(date) && date.getTime() > today.getTime()) {
      return 'purple';
    } else if (shouldHabitBeCompletedOnDate(date) && date.getTime() < today.getTime()) {
      if (isSameDay(date, today)) {
        return 'today';
      }
      return 'red';
    }
    return 'white';
  };
  
  

  if (!habit) return <p>Loading...</p>;

  return (
    <MainLayout>
        <div className="bg-white rounded-xl shadow-lg p-6 my-10 w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{habit.name}</h2>
          <p className="text-gray-500 mb-6">{habit.description}</p>
          <div className="border-t border-gray-200 pt-6">
            <Calendar
              year={currentYear}
              month={currentMonth}
              onDayClick={onDayClick}
              colorCodeFunction={colorCodeFunction}
            />
          </div>
        </div>
    </MainLayout>
  );
};

export default HabitDetails;
