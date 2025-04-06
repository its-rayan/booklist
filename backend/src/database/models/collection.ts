import mongoose from 'mongoose';

export interface CollectionModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  userId: mongoose.Types.ObjectId;
  books: {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string;
  }[];
}

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  books: {
    type: Array,
    default: []
  }
});

export default (mongoose.models
  .Collection as mongoose.Model<CollectionModel>) ||
  mongoose.model<CollectionModel>('Collection', collectionSchema);
