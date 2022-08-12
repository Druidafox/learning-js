const app = require('express')();
const express = require('express');
const path = require('path');

/**
 * criar um id randômico para cada novo usuário
 */
const database = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/form.html'));
});

app.post('/users', (req, res) => {
  console.log("adding user: " + JSON.stringify(req.body));
  res.status(200).json({ result: "ok" });
});

app.get('/users', (req, res) => {
  console.log("listing " + database.length + " users");
  res.status(200).json({ users: database });
});

app.listen(8001);
console.log('Servidor rodando na porta 8001!');