import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  points: {
    type: Number,
    default: 0, // Initial points set to 0
  },
  eventsParticipated: [
    {
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },
      participationDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  registeredEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Users || mongoose.model('Users', usersSchema,"users");
