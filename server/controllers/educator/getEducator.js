import Educator from '../../models/educator.js';

const getAllEducator = async (req, res) => {
  try {
    const educators = await Educator.find();
    res.status(200).json(educators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllEducator;
