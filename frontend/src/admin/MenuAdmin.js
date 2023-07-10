import React, { useState, useEffect } from 'react';
import '../adminStyles/menuAdmin.css';
import { useNavigate } from 'react-router-dom';
import UpdateUser from './UpdateUser';

const MenuAdmin = () => {
  const navigate = useNavigate();

  const [getUsers, setGetUsers] = useState([])

  const handleNavigation = (path, state) => {
    navigate(path, state);
  };

  /* Fetch all users*/
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

  /*Delete user using Id as parameter */

  const handleDelete = async (userId) => {
    try {
      const deleteFetch = await fetch(`http://localhost:9000/delete-user/${userId}`, {
        method: 'DELETE'
      })
      const deleteResponse = await deleteFetch.json();
      alert(deleteResponse)
      window.location.reload();
    } catch (error) {
      alert('Error deleting user')
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
              onClick={() => handleNavigation('/get-user-by-id')}
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
                        onClick={() => handleNavigation(`/update-user/${user.id}`, {state: {user}})}>
                        Edit
                      </button>
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