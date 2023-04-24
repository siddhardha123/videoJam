import Meeting from '../../models/meeting.js';

const getMeetingsById = async (req, res) => {
  try {
    const { educatorId } = req.params;
    // Find all meetings associated with the given educatorId
    const meetings = await Meeting.find({ educatorId });
    
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getMeetingsById;
