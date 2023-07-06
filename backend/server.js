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

   app.post('/register', (req, res) => {


    dbUsers.createUser(client, req.body.username, req.body.email, req.body.password)
    .then((data) => {
      console.log(data)
      res.status(200).json({ message: 'User created successfully' })})
    .catch((err) => {
      console.error('Error creating user: ---------->', err);
      res.status(500).json({ RegistingErrors: err.code });
    });
});

/* sign in fetch************/

app.post('/sign-in', (req, res) => {

  dbUsers.verifyUser(client, req.body.username,req.body.password)

  .then((data) =>  {
    console.log(data)
    return res.status(200).json({ Result: data.rowCount})})
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
    await  usersCrud.createUserFromAdmin(client, req.body)
    console.log(data)
    res.status(200).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ RegistingErrors: err.code });
  }
});

app.get('/get-all-users',(req,res) => {

})

app.get('/get-by-id',(req,res) => {
  
})

app.put('/update-user', async (req,res) => {
 try {
  await usersCrud.updateUser(client, req.body)
  res.status(200).json({ message: 'OK'})
 } catch (error) {
  res.status(500).json({ error: 'DAMN' }); ///********************** check out this later */
 }
})

app.delete('/delete-user',(req,res) => {
  
})
