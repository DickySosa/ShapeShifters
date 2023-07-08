import React from 'react';
import '../adminStyles/createUser.css';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const GetUserById = () => {

    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };

    const [form, setForm] = useState({
        id: '',
    });

    const [userRcbd, setUserRcbd] = useState([])
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState([])
    const [response, setResponse] = useState([])

    const handleChange = (event) => {
        const newValue = event.target.value;
        setForm(newValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(form);
        setLoading(true)
        if (form.trim() === '') {
            console.log('ID is required');
            return;
        }
        let userId = form;
        try {
            const response = await fetch(`http://localhost:9000/get-by-id/${userId}`, {
                method: 'GET'
            })
            setLoading(false)

            const data = await response.json();

            console.log('data----------->', data)
            console.log('data length----------->', data.message.length)

            console.log('This data.message ---------------------->', data.message[0])
            setUserRcbd(data.message)

            if(data.message.length > 0){
                setResponse(true)
                setServerError('User exist in Database')
            } else {
            setServerError('User does not exist in Database')
            }
        } catch (error) {
            console.log('Error: ', error)
            
        }

    }

    // console.log(setForm)


    if(userRcbd){
        return (
            <form onSubmit={handleSubmit} className='create-user-layout'>
    
                <header className="create-user-header">
                    <div className='create-user-header-grid-container'>
                        <button className="back-btn"
                            onClick={() => handleNavigation('/menu-admin')}
                        >
                            &#8249;
                        </button>
                        <h3 className='create-user-title'>Get user by Id</h3>
    
                    </div>
                </header>
    
                <main className='main-layout'>
    
                    <section className='main-buttons-container'>
                        <button
                            type="submit"
                            value="SIGN IN"
    
                            className="create-user-button"
                        >
                            Get user
                        </button>
    
                    </section>
                </main>
    
    
                <input
                    type="number"
                    name="form"
                    placeholder="Please enter any Id"
                    className="username-input register-input-fields"
                    onChange={handleChange}
                    value={form}
                    required
                    style={{ marginBottom: '3rem' }}
                />

                <section className='tables-layout' style={{padding: '1rem'}}>
                <table>
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Username</td>
                  <td>Email</td>
                  <td>Password</td>
                </tr>
              </thead>
              <tbody>
                {userRcbd.map((user) => (
                  <tr key={user.id} >
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
                </section>
                <br />
                {loading && <Loader />}
                {response && <Message msg={`${serverError}`} bgColor="dc3545" />}
                <br />
    
            </form>
        );
    }
};

export default GetUserById;