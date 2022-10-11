const router = require('express').Router()
const Person = require('../models/Person.js')


//Rotas de recebimento das requisições
router.post('/', async (req, res) => {
    const { name, lastname, age, email, phone } = req.body;
    const person = {
        name,
        lastname,
        phone,
        email,
        age,
    }


    try {
        await Person.create(person);
        res.status(201).json(person)
        console.log("registro criado com Sucesso!");
    } catch (error) {
        console.log(error);
    }
})


router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const person = await Person.find({ _id: id })
        console.log("registro deletado com sucesso!")

    } catch (error) {
        res.status(500).json({ error: error });
        return

    }

})


router.get('/', async (req, res) => {
    var name = "vitorhugo";

    try {
        const person = await Person.find()
        res.send(person);

    } catch (error) {
        res.status(500).json({ error: error });
        return

    }

})


router.delete('/delete/:id', async (req, res) => {
    const id = req.params;
    console.log(req.params)
    try {
        const personid = await Person.deleteOne({ id })
        console.log(personid)

    } catch (error) {
        res.status(500).json({ error: error });
    }

})

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { name, lastname, age, email, phone } = req.body;
    const person = {
        name,
        lastname,
        phone,
        email,
        age,
    }


    try {

        await Person.findByIdAndUpdate(id,person);
        res.status(201).json(person)
        console.log("registro atualizado com sucesso!");
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;