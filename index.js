//conf inicial
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
app.use(express.static(path.join(__dirname, '/src')));
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())//permite as respostas serem enviadas e recebidas com json

const personRoutes = require('./routes/PersonRoutes.js')
app.use('/person', personRoutes)

//Ligação ao banco de dados Mongo com a promisse de iniciar o servidor junto ao Db
mongoose
    .connect('mongodb://localhost:27017/mynodeproject')
    .then(() => {
        console.log("Banco de Dados MongoDB conectado com sucesso!")
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err)
    })

    app.get('/form',(req,res)=>{
      
            res.sendFile(path.join(__dirname, 'src/form.html'));
            
        
            
      
    })
