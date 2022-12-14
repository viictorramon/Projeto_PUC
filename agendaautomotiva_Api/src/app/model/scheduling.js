const mongoose = require('../../database');

const SchedulingSchema = new mongoose.Schema({
    dateOfScheduling: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    clientCpf: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    licensePlate: {
        type: String,
        required: true,
        uppercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Scheduling = mongoose.model('Scheduling', SchedulingSchema);

module.exports = Scheduling;