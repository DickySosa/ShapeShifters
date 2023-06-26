const express = require('express');
const app = express();
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: '5432',
  database: 'users',
  user: 'postgres',
  password: 'AdminMaster2023@',
});

client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the PostgreSQL database:', err);
  });

  app.get('/users', (req, res) => {
  // Retrieve users from the database
  client.query('SELECT * FROM users')
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
