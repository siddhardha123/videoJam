import axios from "axios";
type educator = {
    name : string,
    photo : string,
    wallet : string,
    about : string,
    price : string
}
const addEducators = async (form : educator) => {
     
    const response = await axios.post("https://videojambackend.vercel.app/api/educators/addEducators",{
        ...form
    })
    return response.data
}

export default addEducators