const express = require('express');

const router = express.Router();

const Scheduling = require('../model/scheduling');

//Create New Scheduling
router.post('/create', async (req, res) => {
    try {
        const { dateOfScheduling, clientCpf, licensePlate } = req.body;

        if (!licensePlate) {
            return res.status(400).send({ error: '"license plate" is empty. Please fill the field' });
        }

        if (!clientCpf) {
            return res.status(400).send({ error: '"clientCpf" is empty. Please fill the field' });
        }

        if (!dateOfScheduling) {
            return res.status(400).send({ error: '"dateOfScheduling" is empty. Please fill the field' });
        }

        const now = Date.now()

        if (new Date(dateOfScheduling) < now) {
            return res.status(400).send({ error: 'Select a time in the future' });
        }

        const scheduling = await Scheduling.create(req.body);

        return res.send(scheduling);
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Scheduling creation error' });
    }
});

module.exports = app => app.use('/scheduling', router);