import axios from "axios";
type educator = {
    name : string,
    photo : string,
    wallet : string,
    about : string,
    price : string
}
const addEducators = async (form : educator) => {
     
    const response = await axios.post("http://localhost:3001/api/educators/addEducators",{
        ...form
    })
    return response.data
}

export default addEducators