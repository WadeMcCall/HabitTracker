import React from 'react';
import styles from '../css/HabitCard.module.css';

const HabitCard = ({ habit, onDelete }) => {
  return (
    <div className={styles.habitCard}>
      <h3>{habit.name}</h3>
      <p>{habit.description}</p>
      <p>Frequency: {habit.frequency}</p>
      <button className={styles.deleteHabitButton} onClick={() => onDelete(habit._id)}>Delete Habit</button>
    </div>
  );
};

export default HabitCard;
