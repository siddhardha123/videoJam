import mongoose from 'mongoose';

const { Schema } = mongoose;

const materialSchema = new Schema({
  
  educatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Educator',
    required: true,
  },
  link : {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
 
}, { timestamps: true });

const Material = mongoose.model('Material', materialSchema);

export default Material;
