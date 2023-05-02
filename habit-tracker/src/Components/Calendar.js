import React from 'react';
import ReactCalendar from 'react-calendar';
import '../css/Calendar.css';

const Calendar = ({ completions }) => {
  const completedDates = completions.map((completion) => new Date(completion.completionDate));

  const isCompleted = (date) => {
    return completedDates.some(
      (completedDate) => completedDate.toDateString() === date.toDateString()
    );
  };

  const tileClassName = ({ date }) => {
    return isCompleted(date) ? 'completed' : null;
  };

  return (
    <ReactCalendar
      className="react-calendar" // Add this line to apply the styles
      tileClassName={tileClassName}
    />
    );
};

export default Calendar;
