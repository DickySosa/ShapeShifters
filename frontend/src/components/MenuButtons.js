import React from 'react';
import '../styles/home.css'
import { useNavigate } from 'react-router-dom';

const MenuButtons = () => {
   const navigate = useNavigate();

   const handleNavigation = (path) => {
      navigate(path)
   }

  return ( 
  <div>
    
    <footer className="home-button-container">
     <button 
        onClick={() => handleNavigation('/user-profile')}
        className="menú-buttons">
        Profile
        <img 
        src='https://freesvg.org/img/abstract-user-flat-4.png' 
        alt='user profile'         
        style={{width: '100%'}}/>
     </button>

     <button 
        onClick={() => handleNavigation('/settings')}
        className="menú-buttons">
        Settings
        <img 
        src='https://www.freeiconspng.com/thumbs/settings-icon/settings-icon-4.png' 
        alt='settings'
        style={{width: '100%'}}
        />
     </button>

     <button 
        onClick={() => handleNavigation('/home')}
        className="menú-buttons">
        Home
        <img 
        src='https://cdn.icon-icons.com/icons2/2248/PNG/512/home_circle_icon_137496.png' 
        alt='Home'
        style={{width: '100%'}}
        />
     </button>

     <button 
        onClick={() => handleNavigation('/menu-admin')}
        className="menú-buttons">
        Admin
        <img 
        src='https://static.vecteezy.com/system/resources/previews/014/649/447/non_2x/outsource-manager-icon-simple-style-vector.jpg' 
        alt='Admin'
        style={{width: '100%'}}
        />
     </button>

     <button
        onClick={() => handleNavigation('/training-split')}
        className="menú-buttons">
        Training split
        <img 
        src='https://www.freepnglogos.com/uploads/dumbbell-png/dumbbell-sponsored-native-company-native-desc-6.png' 
        alt='Workout'
        style={{width: '100%'}}
        />
     </button>
     
     <button 
        onClick={() => handleNavigation('/calendar')}
        className="menú-buttons">
        Calendar
        <img 
        src='https://www.freeiconspng.com/thumbs/calendar-image-png/calendar-image-png-15.png' alt='Calendar'
        style={{width: '100%'}}
        />
     </button>
   </footer>
  </div>

  )
};

export default MenuButtons;