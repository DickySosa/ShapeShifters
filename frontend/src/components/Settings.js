import React, {useState} from 'react';
import '../styles/home.css'
import MenuButtons from './MenuButtons';


const Settings = () => {
    const [select, setSelect] = useState('')
   const handleChange = (e) => {
    setSelect(e.target.value)
   }

    return(
        <div className='home'>
        <header className='home-main-title'>Settings</header>
    
        <main className='settings-style'>
    
        <label htmlFor="Settings">Settings:</label>
        <select
          value={select}
          name="select"
          onChange={handleChange} 
        >
          <option value="male">Dark</option>
          <option value="female">Light</option>
          
        </select>

        </main>
        <MenuButtons/>
      </div>
    )
};

export default Settings;

