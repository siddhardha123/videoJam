import axios from "axios";
import baseUrl from '../baseUrl.json'
const addMaterials = async (form : any) => {
     
    const response = await axios.post(`${baseUrl.url}/api/meetings/addMaterial`,{
        ...form
    })
    return response.data
}

export default addMaterials