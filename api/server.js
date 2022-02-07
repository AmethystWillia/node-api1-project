// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();
server.use(express.json());

// [GET] Requests
server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ message: "The users information could not be retrieved" });
        })
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then(user => {
            if (user === null || user === undefined) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else {
                res.status(200).json(user);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user information could not be retrieved" });
        })
});

// server.post();

// server.put();

// server.delete();

module.exports = server; // EXPORT YOUR SERVER instead of {}