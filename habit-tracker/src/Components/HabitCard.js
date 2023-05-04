import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const HabitCard = ({ habit, onDelete, onComplete, completedToday }) => {
  const daysOrder = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const sortedDaysOfWeek = habit.daysOfWeek.sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  );

  const daysOfWeekFormatted =
    sortedDaysOfWeek.length === 0
      ? 'Daily'
      : sortedDaysOfWeek
          .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
          .join(', ');

  return (
    <div className="flex flex-col w-full mb-6">
      <Link to={`/habit/${habit._id}`} className="flex-grow">
        <div className="bg-white shadow-lg p-6 w-full hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <h3 className="text-xl font-semibold mb-3">{habit.name}</h3>
          <p className="text-gray-700 mb-4">{habit.description}</p>
          <p className="text-gray-500 mb-6">Days: {daysOfWeekFormatted}</p>
        </div>
      </Link>
      <button
        className={`bg-green-300 text-white w-full p-4 rounded-b-lg ${
          completedToday ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-400'
        } focus:outline-none transition-colors duration-200`}
        onClick={() => onComplete(habit._id)}
        disabled={completedToday}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
};

export default HabitCard;
