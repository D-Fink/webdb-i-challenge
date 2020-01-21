const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
//works
server.get('/api/accounts', (req, res) => {
    db('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to get users' });
    });
});
//works
server.get('/api/accounts/:id', (req, res) => {
    const {id} = req.params;
    db('accounts').where({id})
    .first()
    .then(account => {
        res.status(200).json(account);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get user' });
    });
});
//works
server.post('/api/accounts', (req, res) => {
    db('accounts').insert(req.body)
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json({message: 'error creating account'})
    })
})
//works
server.put('/api/accounts/:id', (req, res) => {
    const {id} = req.params;
    db('accounts').where({id})
    .update(req.body)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(err => {
        res.status(500).json({message: 'error updating account'})
    })
})
//works
server.delete('/api/accounts/:id', (req, res) => {
    const {id} = req.params;
    db('accounts').where({id})
    .del()
    .then(deleted => {
        res.status(200).json({message: 'account was deleted'})
    })
    .catch(err => {
        res.status(500).json({message: 'error deleting account'})
    })
})

module.exports = server;