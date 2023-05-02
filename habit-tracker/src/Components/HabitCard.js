import React from 'react';

const HabitCard = ({ habit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full mb-6">
      <h3 className="text-xl font-semibold mb-3">{habit.name}</h3>
      <p className="text-gray-700 mb-4">{habit.description}</p>
      <p className="text-gray-500 mb-6">Frequency: {habit.frequency}</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
        onClick={() => onDelete(habit._id)}
      >
        Delete Habit
      </button>
    </div>
  );
};

export default HabitCard;
