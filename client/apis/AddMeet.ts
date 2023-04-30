import axios from "axios";
import baseUrl from '../baseUrl.json'
const addMeet = async (form : any) => {
     
    const response = await axios.post(`${baseUrl.url}/api/meetings/addMeeting`,{
        ...form
    })
    return response.data
}

export default addMeet