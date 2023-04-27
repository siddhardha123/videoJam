import axios from "axios";

const addMeet = async (form : any) => {
     
    const response = await axios.post("https://videojambackend.vercel.app/api/meetings/addMeeting",{
        ...form
    })
    return response.data
}

export default addMeet