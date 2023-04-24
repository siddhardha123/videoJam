import mongoose from 'mongoose';

const { Schema } = mongoose;

const meetingSchema = new Schema({
  educatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Educator',
    required: true,
  },
  meetId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time : {
     type : String,
     required : true
  }
}, { timestamps: true });

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
