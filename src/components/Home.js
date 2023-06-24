import React from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import MenuButtons from './MenuButtons';
import { useContext } from 'react';
import { MyContext } from '../MyContext';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home">
      <header className="home-main-title">ShapeShifters</header>

      <main className="add-workout-btn-container">
        <button
          onClick={() => handleNavigation('/add-workout')}
          className="add-workout-btn"
        >
          {' '}
          Add Workout +{' '}
        </button>
      </main>
      <MenuButtons />
    </div>
  );
};

export default Home;
