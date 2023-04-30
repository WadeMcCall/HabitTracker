import React from 'react';

const HabitCard = ({ habit, onDelete }) => {
  return (
    <div className="habit-card">
      <h3>{habit.name}</h3>
      <p>{habit.description}</p>
      <p>Frequency: {habit.frequency}</p>
      <button onClick={() => onDelete(habit._id)}>Delete Habit</button>
    </div>
  );
};

export default HabitCard;
