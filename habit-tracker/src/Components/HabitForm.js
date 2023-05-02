// src/Components/HabitForm.js
import React from 'react';

const HabitForm = ({
  name,
  setName,
  description,
  setDescription,
  daysOfWeek,
  setDaysOfWeek,
  onSubmit,
}) => {
  const dayShortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDaysOfWeekChange = (e) => {
    const day = e.target.value;
    if (e.target.checked) {
      setDaysOfWeek([...daysOfWeek, day]);
    } else {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== day));
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Description:</span>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
        />
      </label>
      <fieldset className="space-y-2">
        <legend className="text-gray-700">Days of the week:</legend>
        <div className="grid grid-cols-3 gap-2">
          {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day, index) => (
            <div key={day}>
              <label
                key={day}
                className={`inline-flex items-center cursor-pointer w-full justify-center ${
                  daysOfWeek.includes(day)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                } px-3 py-1 rounded-md shadow-sm select-none`}
              >
                <input
                  type="checkbox"
                  value={day}
                  onChange={handleDaysOfWeekChange}
                  checked={daysOfWeek.includes(day)}
                  className="hidden"
                />
                <span className="ml-2 capitalize">{dayShortNames[index]}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500">If no days selected, the habit is daily.</div>
      </fieldset>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
      >
        Save Habit
      </button>
    </form>
  );
};

export default HabitForm;
