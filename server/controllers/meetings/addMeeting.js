import Meeting from '../../models/meeting.js';
import Educator from '../../models/educator.js'
import axios from 'axios';

const addMeeting = async (req, res) => {
try {
const { name, date, time, wallet } = req.body;


// Call the create-room API to get the meetingId
const response = await axios.post(
  'https://iriko.testing.huddle01.com/api/v1/create-room',
  {
     "title" : name,
     "hostWallets" : [wallet]
  },
  { headers: { 'x-api-key': 'VwTZ4AGTxme9snANex9tep3NwvVMGfYd' } }
);
const meetId = response.data.data.roomId;
console.log(meetId)

// Query the database to get the educatorId associated with the wallet
const educator = await Educator.findOne({ wallet });
const educatorId = educator._id;

// Create a new Meeting object with the meetId and educatorId
const meeting = new Meeting({ educatorId, meetId, name, date, time });

// Save the Meeting object to the database
const savedMeeting = await meeting.save();
res.status(201).json(savedMeeting);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

export default addMeeting;
