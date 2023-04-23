import mongoose from 'mongoose';

const educatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  wallet: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Educator = mongoose.model('Educator', educatorSchema);

export default Educator;
