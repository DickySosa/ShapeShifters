import './App.css';
import ConfirmationCode from './components/ConfirmationCode';
// import useState
import { useState } from 'react';
// import Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import SwitchScreens from './components/SwitchScreens';
import Home from './components/Home';
import Settings from './components/Settings';
import TrainingSplit from './components/TrainingSplit';
import Calendar from './components/Calendar';
import AddWorkout from './components/AddWorkout';
import AddExercise from './components/AddExercise';
import AddSet from './components/AddSet';
import ForgotPassword from './components/ForgotPassword';
// import Admin menu
import MenuAdmin from './admin/MenuAdmin'
import CreateUser from './admin/CreateUser'
import GetUserById from './admin/GetUserById'
import UpdateUser from './admin/UpdateUser'
// context API
import { MyContext } from './MyContext';

function App() {
  const [text, setText] = useState('');
  return (
    <div>
      <Router>
        <MyContext.Provider value={{ text, setText }}>
          <Routes>
            {/*Sign in Screens*/}
            <Route path="/" element={<SwitchScreens />} />
            <Route path="/confirmation-code" element={<ConfirmationCode />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/*App Screens*/}
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/training-split" element={<TrainingSplit />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/add-workout" element={<AddWorkout />} />
            <Route path="/add-exercise" element={<AddExercise />} />
            <Route path="/add-set" element={<AddSet />} />
            {/* Admin menu */}
            <Route path="/menu-admin" element={<MenuAdmin />} />
            <Route path="/create-user" element={<CreateUser />} />
            {/* <Route path="/get-user-by-id" element={<GetUserById />} /> */}
            <Route path="/update-user" element={<UpdateUser />} />
          </Routes>
        </MyContext.Provider>
      </Router>
    </div>
  );
}

export default App;
