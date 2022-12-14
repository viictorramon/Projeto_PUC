const express = require('express');

const router = express.Router();

const Client = require('../model/client');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

//Get all Clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find({})

        return res.send(clients)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error to list clients' });
    }
})

//Get client by ID
router.get('/:clientid', async (req, res) => {
    const { params } = req

    try {
        const client = await Client.findOne({ _id: params.clientid })

        return res.send(client)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error to list clients' });
    }
})

//Get client by CPF
router.get('/clientbycpf/:cpf', async (req, res) => {
    const { params } = req

    try {
        const client = await Client.findOne({ cpf: params.cpf })

        return res.send(client)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error to list clients' });
    }
})

//New Client Register
router.post('/register', async (req, res) => {
    const { cpf, name, email, phoneNumber, dateOfBirthdate, address } = req.body;

    try {
        if (await Client.findOne({ cpf }))
            return res.status(400).send({ error: 'Client CPF Already exists' });

        const client = await Client.create({ cpf, name, email, phoneNumber, dateOfBirthdate, address });

        return res.send(client);
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: 'Client registration error' });
    }
});

//Edit Client
router.patch('/edit/:clientid', async (req, res) => {
    const { params } = req
    const { name, email, phoneNumber, dateOfBirthdate, address} = req.body

    try {
        const client = await Client.findOne({ _id: params.clientid })

        await client.updateOne({ name, email, phoneNumber, dateOfBirthdate, address})

        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error to list clients' });
    }
})

module.exports = app => app.use('/client', router);