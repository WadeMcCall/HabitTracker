import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import Day from './Day';

  function generateDaysArray(year, month) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const daysArray = [];
  
    // Add days from the previous month to fill in the first week
    for (let i = startDate.getDay() - 1; i >= 0; i--) {
      daysArray.push(new Date(year, month, -i));
    }
  
    // Add days of the current month
    for (let i = 1; i <= endDate.getDate(); i++) {
      daysArray.push(new Date(year, month, i));
    }

    // Add days from the next month to fill in the last week
    let nextMonthDay = 1;
    while (daysArray.length % 7 !== 0) {
      daysArray.push(new Date(year, month + 1, nextMonthDay));
      nextMonthDay++;
    }
  
    return daysArray;
  }
  
  const Calendar = ({ year, month, onDayClick, colorCodeFunction }) => {
    const [currentMonth, setCurrentMonth] = useState(month);
    const [currentYear, setCurrentYear] = useState(year);
    const [selectedDate, setSelectedDate] = useState(null);
    const [daysArray, setDaysArray] = useState(generateDaysArray(year, month));

    
    useEffect(() => {
      setDaysArray(generateDaysArray(currentYear, currentMonth));
    }, [currentYear, currentMonth]);
  
    const handleDayClick = (date) => {
      setSelectedDate(date);
      onDayClick(date);
    };

    const handlePreviousMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    };
    
    const handleNextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    };

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    return (
      <div className={`${styles.calendar}`}>
        <div className={`${styles.monthNav}`}>
          <button className={`${styles.prevButton}`} onClick={handlePreviousMonth}>
            &lt;
          </button>
          <span className={`${styles.monthName}`}>
            {new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button className={`${styles.nextButton}`} onClick={handleNextMonth}>
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {dayNames.map((day, index) => (
            <div key={index} className={`${styles.dayName}`}>
              {day}
            </div>
          ))}
          {daysArray.map((date, index) => (
              <Day
                key={index}
                date={date}
                selected={selectedDate === date}
                onClick={handleDayClick}
                colorCode={colorCodeFunction(date)}
              />
            ))}
          </div>
        </div>
      );
  };
  
  export default Calendar;