import axios from "axios";

const addMeet = async (form : any) => {
     
    const response = await axios.post("http://localhost:3001/api/meetings/addMeeting",{
        ...form
    })
    return response.data
}

export default addMeet