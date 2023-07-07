import React, { useState, useEffect } from 'react';
import '../styles/menuAdmin.css';
import { useNavigate, Link } from 'react-router-dom';

const MenuAdmin = () => {
  const navigate = useNavigate();

  const [getUsers, setGetUsers] = useState([])

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {

    const fetchAllUsers = async () => {

      try {
        const data = await fetch('http://localhost:9000/get-all-users', {
          method: 'GET'
        })
        const allUsers = await data.json();
        console.log('user ', allUsers)
        setGetUsers(allUsers)

      } catch (error) {
        console.error('Error obtaining the information', error);
      }

    }
    fetchAllUsers();
  }, [])

 const handleDelete = async (userId) => {
  try {
    
  } catch (error) {
    
  }
 }

  if (getUsers) {
    return (
      <div className="menu-admin">

        <header className="menu-admin-header">
          <div className='menu-admin-header-grid-container'>
            <button className="back-btn"
              onClick={() => handleNavigation('/home')}
            >
              &#8249;
            </button>
            <h3 className='title-h3'>Users</h3>

          </div>
        </header>

        <main className='main-layout'>
          <section className='main-buttons-container'>
            <button
              onClick={() => handleNavigation('/create-user')}
              className="create-user-button"
            >
              + Create User
            </button>

            <button
              onClick={() => handleNavigation('/create-user')}
              className="search-user-button"
            >
              Search user by Id
            </button>
          </section>



          <section className='tables-layout'>
            <table>
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Username</td>
                  <td>Email</td>
                  <td>Password</td>
                  <td>Options</td>
                </tr>
              </thead>
              <tbody>
                {getUsers.map((user) => (
                  <tr key={user.id} >
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <button
                        className='edit-btn'
                        onClick={() => handleNavigation('/update-user')}>Edit</button>
                      <button
                        className='dlt-btn'
                        onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

        </main>

      </div>
    );
  }
}

export default MenuAdmin;