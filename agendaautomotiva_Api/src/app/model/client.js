const mongoose = require('../../database');

const ClientSchema = new mongoose.Schema({
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
    cpf: {
        type: Number,
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