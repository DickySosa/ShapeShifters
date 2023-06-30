const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Enable parsing JSON bodies

const { Client } = require('pg');
const dbConfig = require('./dbConfig');

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

  /** Write SQL commands to automatically 
   * create the tables in the database
   * @example client.query('CREATE TABLE IF NOEXISTS users')
   */ 

  const user_data = `CREATE TABLE IF NOT EXISTS users_data (  
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  );`;

app.post('/register', (req, res) => {
  const createTableQuery = {
    text: user_data,
  };

  const registerQuery = {
    text: 'INSERT INTO users_data (username, email, password) VALUES ($1, $2, $3)',
    values: [req.body.username, req.body.email, req.body.password],
  };

  client.query(createTableQuery)
    .then(() => client.query(registerQuery))
    .then(() => res.status(200).json({ message: 'User created successfully' }))
    .catch((err) => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

const port = 8000; // Specify the port number you want to use
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});