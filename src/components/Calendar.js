import React, { useState } from 'react';
import '../styles/home.css';
import MenuButtons from './MenuButtons';

const Calendar = () => {
  const [schedule, setSchedule] = useState({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: '',
  });

  const handleChange = (e, day) => {
    const { value } = e.target;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos ingresados, como enviarlos a un servidor o guardarlos en el estado de la aplicación
    console.log(schedule);
  };
  return (
    <div className="home">
      <header className="home-main-title">Calendar</header>

      <form onSubmit={handleSubmit} className="calendar-layout">
        <div>
          <label htmlFor="Monday">Monday:</label>
          <input
            type="text"
            id="Monday"
            value={schedule.Monday}
            onChange={(e) => handleChange(e, 'Monday')}
          />
        </div>
        <div>
          <label htmlFor="Tuesday">Tuesday:</label>
          <input
            type="text"
            id="Tuesday"
            value={schedule.Tuesday}
            onChange={(e) => handleChange(e, 'Tuesday')}
          />
        </div>
        <div>
          <label htmlFor="Wednesday">Wednesday:</label>
          <input
            type="text"
            id="Wednesday"
            value={schedule.Wednesday}
            onChange={(e) => handleChange(e, 'Wednesday')}
          />
        </div>
        <div>
          <label htmlFor="Thursday">Thursday:</label>
          <input
            type="text"
            id="Thursday"
            value={schedule.Thursday}
            onChange={(e) => handleChange(e, 'Thursday')}
          />
        </div>
        <div>
          <label htmlFor="Friday">Friday:</label>
          <input
            type="text"
            id="Friday"
            value={schedule.Friday}
            onChange={(e) => handleChange(e, 'Friday')}
          />
        </div>
        <div>
          <label htmlFor="Saturday">Saturday:</label>
          <input
            type="text"
            id="Saturday"
            value={schedule.Saturday}
            onChange={(e) => handleChange(e, 'Saturday')}
          />
        </div>
        <div>
          <label htmlFor="Sunday">Sunday:</label>
          <input
            type="text"
            id="Sunday"
            value={schedule.Sunday}
            onChange={(e) => handleChange(e, 'Sunday')}
          />
        </div>
        <button className="save-btn calendar-save-btn" type="submit">
          Save
        </button>
      </form>
      <MenuButtons />
    </div>
  );
};

export default Calendar;
