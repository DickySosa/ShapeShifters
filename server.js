const express = require('express');
const app = express();
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

  

  app.get('/users', (req, res) => {
  // Retrieve users from the database
  client.query('INSERT INTO users')
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

const port = 8000; // Specify the port number you want to use
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
