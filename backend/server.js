const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Enable parsing JSON bodies

const { Client } = require('pg');
const dbConfig = require('./dbConfig');

/*db modules users.js */

const dbUsers = require('./db/users')

/* users CRUD */

const usersCrud = require('./controlers/usersCRUD')

/** Client config to 
* be able to connect to local database
* @readonly This has to be created by each developer.
*/

const client = new Client(dbConfig);

client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the PostgreSQL database:', err);
  });

/* Registration fetch**************/
const user_data = `CREATE TABLE IF NOT EXISTS users_data (  
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  );`;

app.post('/register', async (req, res) => {

  try {
   const newUser = await dbUsers.createUser(client, req.body)
   console.log(newUser)
    res.status(200).json({ message: 'User created successfully' })
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ RegistingErrors: error.code });
  }
});
  
/* sign in fetch************/

app.post('/sign-in', (req, res) => {

  dbUsers.verifyUser(client, req.body.username, req.body.password)

    .then((data) => {
      console.log(data)
      return res.status(200).json({ Result: data.rowCount })
    })
    .catch((err) => {
      console.error('Error getting user:', err);
      res.status(500).json({ SignInErrors: err });
    });

});

const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*** USERS CRUD ***/

app.post('/create-new-user', async (req, res) => {

  try {
    const data = await usersCrud.createUserFromAdmin(client, req.body)
    console.log(data)
    res.status(200).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json('Error form the sever side');
  }
});

app.get('/get-all-users', async (req, res) => {

  try {
    const allUsers = await usersCrud.getAllUsers(client)
    res.status(200).json(allUsers.rows)
  } catch (error) {
    res.status(500).json({ error: err.code });
  }
});

app.get(`/get-by-id/:userId`, async (req, res) => {
  const userId = req.params.userId
  try {
    const response = await usersCrud.getUserById(client, userId )
    const respData = await response;
    console.log('The response is------------>', response)
    res.status(200).json({message: respData.rows})
  } catch (error) {
    console.log(error)
    res.status(500).json({error, error})
  }
});

/*********HERE**********/

app.put('/update-user/:userId', async (request, response) => {
  const userId = request.params.userId
  console.log('User Id is -------------->', request.params)
  console.log('User Id is -------------->', userId)
  try {
    await usersCrud.updateUser(client, userId, request.body)
    response.status(200).json({ message: 'OK' })
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: 'DAMN' }); ///********************** check out this later */
  }
});


/**********DONE***********/

app.delete(`/delete-user/:userId`, async (req, res) => {
  const userId = req.params.userId
  try {
    await usersCrud.deleteUser(client, userId)
    res.status(200).json('User deleted successfully')
  } catch (error) {
    res.status(500).json('Something  went wrong ' + error)
  }
});
