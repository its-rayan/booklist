import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  avatar: string;
  collections: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema({
  username: {
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

export default (mongoose.models.User as mongoose.Model<UserModel>) ||
  mongoose.model<UserModel>('User', userSchema);
