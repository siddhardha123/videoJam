import Educator from '../../models/educator.js';

const deleteEducatorById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEducator = await Educator.findByIdAndDelete(id);
    if (!deletedEducator) {
      return res.status(404).json({ message: 'Educator not found' });
    }
    res.status(200).json({ message: 'Educator deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default deleteEducatorById;
