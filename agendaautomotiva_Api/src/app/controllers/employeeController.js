const express = require('express');
const bcrypt = require('bcryptjs');
const secret = require('../../config/auth.json')

const Employee = require('../model/employee');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const unless = require('../helpers/unless');

router.use(unless(['/employee/login', '/employee/create'], authMiddleware));

const generateToken = require('../helpers/generateToken');

//Create new Employee - This route using only in development
router.post('/create', async (req, res) => {
  const { email, registrationNumber, masterKey } = req.body;

  try {
    if (await Employee.findOne({ email }))
      return res.status(400).send({ error: 'Employee email Already exists' });

    if (await Employee.findOne({ registrationNumber }))
      return res.status(400).send({ error: 'Employee registration number Already exists' });

    if (!registrationNumber)
      return res.status(400).send({ error: 'Registration Number cannot be empty' });

    if (!masterKey)
      return res.status(400).send({ error: 'Master key not found' })

    const masterKeyParts = masterKey.split('.')

    if (masterKeyParts.length !== 4)
      return res.status(400).send({ error: 'Master Key error' });

    if (masterKey !== secret.masterKey)
      return res.status(400).send({ error: 'Master key invalid' })

    const employee = await Employee.create(req.body);

    employee.password = undefined;

    return res.send(employee);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: 'Employee registration error' });
  }
});

//Employee Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email }).select("+password");

    if (!employee)
      return res.status(400).send({ error: 'Employee not found' });

    if (!await bcrypt.compare(password, employee.password))
      return res.status(400).send({ error: 'invalid password' });

    employee.password = undefined;

    return res.send({
      employee,
      token: generateToken({ id: employee.id })
    });

  } catch (error) {
    res.status(400).send({ error: 'Employee Login Error' });
  }
});

//Employee Validate Token
router.get('/validate', async (req, res) => {
  try {
    const token = req.headers.authorization
    return res.send({ token: token});
  } catch (error) {
    res.status(400).send({ error: 'Employee Login Error' });
  }
});

module.exports = app => app.use('/employee', router);