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

app.post('/signin', (req, res) => {
  // Realiza la consulta en la base de datos
  dbUsers.verifyUser(client, req.body.username,req.body.password)

  .then((data) =>  {
    console.log(data)
    return res.status(200).json({ Result: data.rowCount})})
  .catch((err) => {
    console.error('Error getting user:', err);
    res.status(500).json({ SignInErrors: err });
  });
  
  });

const port = 9000; // Specify the port number you want to use
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});