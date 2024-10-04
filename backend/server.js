const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Create Express app
const app = express();
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: '<DATABASE_SERVER>',
    user: '<DB_USER>',
    password: '<DB_PASSWORD>',
    database: '<DB_NAME>',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// API endpoint to store data
app.post('/data', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO users (name) VALUES (?)';

    db.query(sql, [name], (err, result) => {
        if (err) throw err;
        res.json({ message: `Data received: ${name}` });
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
