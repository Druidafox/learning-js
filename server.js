const app = require('express')()
const express = require('express');
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/formulario.html'))
})

app.post('/users', (req, res) => {
  console.log(req.body);
  res.status(200).json({ result: "ok" });
})

app.use(express.static('public'));

app.post('/resultado', (req, res) => {
  res.sendFile(path.join(__dirname + '/resultado.html'))
})

app.listen(8001)
console.log('Servidor rodando na porta 8001!')