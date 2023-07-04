import React from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';

const AddWorkout = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home">
      {/* hacer un input aquí */}
      <header className="home-main-title">Enter Workout´s name?</header>

      <main className="add-workout-btn-container">
        <button
          onClick={() => handleNavigation('/add-exercise')}
          className="add-workout-btn"
        >
          {' '}
          Add Exercise +{' '}
        </button>
      </main>
      <footer className="home-button-container">
        <button
          onClick={() => handleNavigation('/home')}
          className="delete-btn"
        >
          Delete Workout
        </button>

        <button className="save-btn">Save Workout</button>
      </footer>
    </div>
  );
};

export default AddWorkout;
