const app = require('express')();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const users = require("./users");
const { response, json } = require('express');
// create application/json parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
/**
 * criar um id randomico para cada novo usuário
 */
const database = [];
const banco = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/bienevindo.html'));
  res.status(200).json;
  
});

app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname + '/form.html'));
});

app.post('/users',function(req, res){
var json = (req.body);
const myJSON =(users);
res.status(200).json(users);
 
  
  //console.log("adding user: " + JSON.stringify(req.body));
  //res.status(200).json({result:database});
  //const myJSON = JSON.parse(users)
 // console.log(myJSON);
});

app.get('/users', (req, res) => {
  console.log("listing " + users.length + " users");
  
  res.status(200).json({ database });
});

app.listen(8001);
console.log('Servidor rodando na porta 8001!');