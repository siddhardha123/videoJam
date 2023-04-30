import axios from "axios";
import baseUrl from '../baseUrl.json'
type educator = {
    name : string,
    photo : string,
    wallet : string,
    about : string,
    price : string
}
const addEducators = async (form : educator) => {
     
    const response = await axios.post(`${baseUrl.url}/api/educators/addEducators`,{
        ...form
    })
    return response.data
}

export default addEducators