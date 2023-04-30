import Material from '../../models/material.js';
import Educator from '../../models/educator.js';


const addMaterial = async (req, res) => {
    try {
  
      // Extract data from the request body
      const { link, name, wallet } = req.body;
  
      // Query the database to get the educatorId associated with the wallet
      const educator = await Educator.findOne({ wallet });
      const educatorId = educator._id;
  
      // Create a new Material object with the extracted data and educatorId
      const material = new Material({ educatorId, link, name });
  
      // Save the Material object to the database
      const savedMaterial = await material.save();
      res.status(201).json(savedMaterial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
export default addMaterial;
