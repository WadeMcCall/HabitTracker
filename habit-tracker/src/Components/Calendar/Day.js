import React from 'react';
import styles from './Day.module.css';

const Day = ({ date, selected, onClick, colorCode }) => {
    const handleClick = () => {
      onClick(date);
    };
  
    if(selected) console.log(date);
    return (
      <div
        className={`${styles.day} ${selected ? styles.selected : styles[colorCode]}`}
        onClick={handleClick}
      >
        {date.getDate()}
      </div>
    );
};

export default Day;
  