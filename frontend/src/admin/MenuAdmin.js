import React, {useState,useEffect} from 'react';
import '../styles/home.css';
import { useNavigate, Link } from 'react-router-dom';

const MenuAdmin = () => {
  const navigate = useNavigate();

  const  [getUsers, setGetUsers] = useState([])

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect (() => {

    const fetchAllUsers = async () => {
        
        try {
            const data = await fetch('http://localhost:9000/get-all-users',{
                method: 'GET'
            })
            const allUsers = await data.json();
            console.log(allUsers)
            setGetUsers(allUsers)

        } catch (error) {
            console.error('Error obtaining the information', error);
        }

    }
    fetchAllUsers();
  }, [])

  
  

    // let getUsersHook = getUsers.Message[0].id;
    // console.log(getUsersHook)

    
        // getUsers.Message.map((user) => (
        //     <li key={user.id} >
        //       {user.id} - {user.username} - {user.email} - {user.password}
        //     </li>
        //   ))
    
  console.log(getUsers.Message[0].id)

  return (
    <div className="home">
        <Link
        className="back-btn"
        to={'/home'}
        style={{
          display: 'inline-block',
          marginRight: '100%',
          marginBottom: '-3px',
          borderBottom: 'none',
        }}
      >
        &#8249;
      </Link>
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

      <ul style={{ color: 'white' }}>
        {
            getUsers.Message.map((user) => (
                <li key={user.id} >
                  {user.id} - {user.username} - {user.email} - {user.password}
                </li>
              ))
        }
      </ul> 

    </div> 
  );
};

export default MenuAdmin;