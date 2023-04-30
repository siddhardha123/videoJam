import Material from "../../models/material.js";

const getMaterialsById = async (req, res) => {
  try {
    const { educatorId } = req.params;
    // Find all materials associated with the given educatorId
    const materials = await Material.find({ educatorId });
    
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getMaterialsById;
