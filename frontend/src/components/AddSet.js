import React, { useState } from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

const AddSet = ({ set }) => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({
    weight: '',
    unit: '',
    reps: '',
    effort: '',
  });

  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteSet = () => {
    navigate('/add-exercise');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(workout);
    navigate('/add-exercise');
  };
  return (
    <MyContext.Provider value={workout}>
      <div className="home">
        <header className="home-main-title">
          Set #
          <br />
          Exercise name
        </header>

        <form onSubmit={handleSubmit} className="add-set-style">
          <label htmlFor="select-weight">Weight = </label>
          <input
            className="user-profile-inputs add-set-input"
            type="number"
            id="weight"
            name="weight"
            value={workout.weight}
            onChange={handleChange}
            maxLength="5"
          />
          <select value={workout.unit} name="unit" onChange={handleChange}>
            <option value="">Select unit</option>
            <option value="Lb">Lb</option>
            <option value="Kg">Kg</option>
          </select>{' '}
          <br />
          <label htmlFor="reps">Reps = </label>
          <input
            className="user-profile-inputs add-set-input"
            type="number"
            id="reps"
            name="reps"
            value={workout.reps}
            onChange={handleChange}
            maxLength="5"
          />{' '}
          <br />
          <label htmlFor="effort">Effort = </label>
          <input
            className="user-profile-inputs add-set-input"
            type="number"
            id="effort"
            name="effort"
            value={workout.effort}
            onChange={handleChange}
            min={0}
            max={100}
            maxLength={3}
          />{' '}
          <label>%</label>
          <footer className="home-button-container">
            <button
              onClick={handleDeleteSet}
              className="delete-btn"
              style={{ marginTop: '-3rem' }}
            >
              Delete Set
            </button>

            <button
              // onClick={() => onSave(workout)}
              className="save-btn"
              style={{ marginTop: '-3rem' }}
            >
              Complete Set
            </button>
          </footer>
        </form>
      </div>
    </MyContext.Provider>
  );
};

export default AddSet;
