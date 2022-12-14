const mongoose = require('../../database');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        lowecase: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: Number,
    },
    dateOfBirthdate: {
        type: Date,
    },
    address: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;