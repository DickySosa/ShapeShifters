import React from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';

const MenuAdmin = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home">
      <header className="home-main-title">Users</header>

      <main className="add-workout-btn-container">
        <button
          onClick={() => handleNavigation('/create-user')}
          className="add-workout-btn"
          style={{width:  '100px', height: '30px', marginLeft:'75%', minWidth: '70px'}}
        >
          Create User 
        </button>
      </main>
    </div>
  );
};

export default MenuAdmin;