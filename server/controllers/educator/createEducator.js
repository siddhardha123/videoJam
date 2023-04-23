import Educator from '../../models/educator.js';

const createEducator = async (req, res) => {
  try {
    const { name, photo, wallet, about, price} = req.body;
    const existingEducator = await Educator.findOne({ wallet });
    if (existingEducator) {
      return res.status(201).json({ message: 'Wallet address already in use' });
    }
    const newEducator = new Educator({ name, photo, about, wallet, price});
    const savedEducator = await newEducator.save();
    res.status(201).json(savedEducator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createEducator;
