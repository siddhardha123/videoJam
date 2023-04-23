import Educator from '../../models/educator.js';

const getEducatorById = async (req, res) => {
  const { id } = req.params; // get the ID parameter from the request URL
  try {
    const educator = await Educator.findById(id); // find educator by ID
    if (!educator) { // handle case where no educator is found for the given ID
      res.status(404).json({ message: 'Educator not found' });
      return;
    }
    res.status(200).json(educator); // return the educator object
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getEducatorById;
