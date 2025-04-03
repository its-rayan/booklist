import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  avatar: {
    type: String
  },
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection'
    }
  ]
});

export default mongoose.models.User || mongoose.model('User', userSchema);
