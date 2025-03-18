import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});

export default mongoose.models.Collection ||
  mongoose.model('Collection', collectionSchema);
