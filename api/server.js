// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();
server.use(express.json());

// [ GET ] Requests
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

// [ POST ] Requests
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;

    Users.insert({ name, bio })
        .then(user => {
            if (name === undefined || bio === undefined) {
                res.status(400).json({ message: "Please provide name and bio for the user" });
            } else {
                res.status(201).json(user);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error while saving the user to the database" });
        })
});

// [ PUT ] Requests
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;

    Users.update(id, {name, bio})
        .then(user => {
            if (user === null || user === undefined) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else if (name === undefined || bio === undefined) {
                res.status(400).json({ message: "Please provide name and bio for the user" });
            } else {
                res.status(200).json(user);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user information could not be modified" });
        })
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(user => {
            if (user === null || user === undefined) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else {
                res.status(200).json(user);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user could not be removed" });
        })
});

module.exports = server; // EXPORT YOUR SERVER instead of {}