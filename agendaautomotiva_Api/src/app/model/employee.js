const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowecase: true,
  },
  registrationNumber: {
    type: Number,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

EmployeeSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;