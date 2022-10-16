const express = require('express');

const router = express.Router();

const Client = require('../model/client');

//New Client Register
router.post('/register', async (req, res) => {
    const { email, cpf } = req.body;

    try {
        if (await Client.findOne({ email }))
            return res.status(400).send({ error: 'Client Email Already exists' });

        if (await Client.findOne({ cpf }))
            return res.status(400).send({ error: 'Client CPF Already exists' });

        const client = await Client.create(req.body);

        return res.send(client);
    } catch (error) {
        res.status(400).send({ error: 'Client registration error' });
    }
});

module.exports = app => app.use('/client', router);