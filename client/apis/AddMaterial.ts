import axios from "axios";
const addMaterials = async (form : any) => {
     
    const response = await axios.post("http://localhost:3001/api/meetings/addMaterial",{
        ...form
    })
    return response.data
}

export default addMaterials