import React, { useState } from 'react';
import '../styles/userProfile.css';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  const [user, setUser] = useState({
    name: {
      first: '',
      last: '',
    },
    height: {
      value: '', 
      unit: '',
    },
    weight: {
      value: '',
      unit: '',
    },
    dateOfBirth: {
      date: '',
    },
    gender: {
      option: '',
    },
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const [parentKey, childKey] = name.split('.');

    setUser((prevState) => ({
      ...prevState,
      [parentKey]: {
        ...prevState[parentKey],
        [childKey]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    navigate('/home')

  };

  return (
    <div className="user-layout">
      <header className="user-layout-header">
        <h1 className="title">User Profile</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="name-container ">
          <input
            className="first-name user-profile-inputs"
            type="text"
            id="firstName"
            name="name.first"
            value={user.name.first}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            className="last-name user-profile-inputs"
            type="text"
            id="last-name"
            name="name.last"
            value={user.name.last}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </div>

        <div className="heigth-container">
          <input
            className="user-profile-inputs body-info"
            type="text"
            id="height"
            name="height.value" 
            value={user.height.value}
            onChange={handleInputChange}
            placeholder="Height"
            maxLength="5"
          />
          <select
            className="body-info-unit"
            value={user.height.unit}
            name="height.unit"
            onChange={handleInputChange}
          >
            <option value="">Select unit</option>
            <option value="cm">cm</option>
            <option value="ft">ft</option>
          </select>
        </div>

        <div className="weight-container">
          <input
            className="user-profile-inputs body-info"
            type="text"
            id="weight"
            name="weight.value"
            placeholder="Weight"
            maxLength="6"
            value={user.weight.value}
            onChange={handleInputChange}
          />
          <select
            className="body-info-unit"
            value={user.weight.unit}
            name="weight.unit"
            onChange={handleInputChange}
          >
            <option value="">Select unit</option>
            <option value="lb">lb</option>
            <option value="kg">kg</option>
          </select>
        </div>

        <select
          value={user.gender.option}
          name="gender.option"
          onChange={handleInputChange} 
        >
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="date-of-birth">Date of Birth:</label>
        <input
          type="date"
          id="date-of-birth"
          name="dateOfBirth.date"
          value={user.dateOfBirth.date}
          onChange={handleInputChange} 
          className="user-profile-inputs"
        />

        <button type="submit" className="save-btn">
          Save
        </button>

        <Link to="/home" style={{ marginLeft: '46%', color: 'rgba(46, 204, 113, 1)', marginBottom: '2rem' }}>SKIP</Link>

      </form>
    </div>
  );
};
export default UserProfile;