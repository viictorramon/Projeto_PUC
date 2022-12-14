const express = require('express');

const router = express.Router();

const unless = require('../helpers/unless')
const authMiddleware = require('../middlewares/auth');

router.use(unless(['/scheduling/create'], authMiddleware));

const Client = require('../model/client');

const Scheduling = require('../model/scheduling');
//Get all Scheduling
router.get('/', async (req, res) => {
    try {
        const schedulings = await Scheduling.find({}).populate('client')

        return res.send(schedulings)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error to list schedulings' });
    }
})

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

        let client = await Client.findOne({ cpf: clientCpf })

        if (!client){
            await Client.create({cpf: clientCpf})
        }

        client = await Client.findOne({ cpf: clientCpf })

        const scheduling = await Scheduling.create({
            ...req.body,
            client
        });

        return res.send(scheduling);
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Scheduling creation error' });
    }
});

//Create New Scheduling and Client
router.post('/fullcreate', async (req, res) => {
    try {
        const { dateOfScheduling, clientCpf, licensePlate, description, clientInfos } = req.body;

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

        const client = await Client.create(clientInfos)

        const scheduling = await Scheduling.create({
            dateOfScheduling,
            clientCpf,
            licensePlate,
            description,
            client
        });

        return res.send(scheduling);
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Scheduling creation error' });
    }
});

module.exports = app => app.use('/scheduling', router);