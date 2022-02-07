// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ message: "The users information could not be retrieved" });
        })
});

// server.post();

// server.put();

// server.delete();

module.exports = server; // EXPORT YOUR SERVER instead of {}