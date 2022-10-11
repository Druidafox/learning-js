import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import path from 'path';
import personRoutes from './routes/PersonRoutes.js';

const app = express();
app.use(express.static(path.dirname('/src')));
app.use(urlencoded({ extended: true, }),);
app.use(json());

app.use('/person', personRoutes);

app.get('/form', (req, res) => {
    res.sendFile(path.resolve("src/form.html"));
})

app.listen(3000, () => {
    console.log("server on")
    connect('mongodb://localhost:27017/mynodeproject')
        .then(() => {
            console.log("Banco de Dados MongoDB conectado com sucesso!")
        })
        .catch((err) => {
            console.log(err)
        });
});
