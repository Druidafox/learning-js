const app = require('express')();
const express = require('express');
const path = require('path');

const database = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/form.html'));
});

app.post('/users', (req, res) => {
  console.log("adding...");
  res.status(200).json({ result: "ok" });
});

app.get('/users', (req, res) => {
  console.log("listing...");
  res.status(200).json(database);
});

app.use(express.static('public'));

app.listen(8001);
console.log('Servidor rodando na porta 8001!');