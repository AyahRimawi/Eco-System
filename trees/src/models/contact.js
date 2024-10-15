import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        maxlength: [100, 'Email cannot be more than 100 characters'],
    },
    topic: {
        type: String,
        required: [true, 'Please select a topic'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
    },
}, {
    timestamps: true,
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);