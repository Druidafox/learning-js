// vamos começar, carregando o express e criando a app
const app = require('express')()
const express = require('express');
const path = require('path')

// então, criamos uma rota para '/'
app.get('/', (req, res) => {
  // aqui precisamos enviar o index.html para o cliente
  res.sendFile(path.join(__dirname + '/formulario.html'))
})

//Estou mapeando a minha rota
app.post('/users', (req, res) => {
  console.log(req.body);
  res.json({ result: "ok" }).send();
})

app.use(express.static('public'))

app.post('/resultado', (req, res) => {
  // aqui precisamos enviar o index.html para o cliente
  res.sendFile(path.join(__dirname + '/resultado.html'))
})
app.listen(8001)
console.log('Servidor rodando na porta 8001!')