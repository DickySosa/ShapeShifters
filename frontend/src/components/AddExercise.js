import React, { useContext } from 'react';
import { MyContext } from '../MyContext';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';

const AddExercise = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const workout = useContext(MyContext);

  return (
    <div className="home">
      <header className="home-main-title">Enter Exercise name</header>

      <main className="add-workout-btn-container">
        <p>
          Weight: {workout.weight} {workout.unit}
        </p>
        <p>Reps: {workout.reps}</p>
        <p>Effort {workout.effort}</p>
        <button
          onClick={() => handleNavigation('/add-set')}
          className="add-workout-btn"
        >
          Add Set +
        </button>
      </main>
      <footer className="home-button-container">
        <button
          onClick={() => handleNavigation('/add-workout')}
          className="delete-btn"
        >
          Delete Sets
        </button>

        <button className="save-btn">Save Sets</button>
      </footer>
    </div>
  );
};

export default AddExercise;
