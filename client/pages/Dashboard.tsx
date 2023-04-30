import { useState } from 'react';
import AddUploadRec from '@/components/AddUploadRec';
import AddUploadMeet from '@/components/AddUploadMeet';
import addMeet from '../apis/AddMeet'
import { useAccount } from 'wagmi';
import LighthouseUpload from '@/apis/LighthouseUpload';
import addMaterials from '@/apis/AddMaterial';
import dynamic from "next/dynamic";
function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);
  const [cid, setCid] = useState(null)
  const {address} = useAccount()
  const [materialName,setMaterialName] = useState("")
  const uploadFile = async(e: any) =>{
    e.persist()
    LighthouseUpload(e, "a1e77544.b0f00ad1620a4877925859ef9856ee21").then((data)=>{
      setShowPopup(false);
      console.log('File Status:', data);
      setMaterialName(data.data.Name)
      setCid(data.data.Hash)

      const form = {
        "link" : `https://gateway.lighthouse.storage/ipfs/${data.data.Hash}`,
        "name" :  data.data.Name ,
        "wallet" : address
      }
   console.log(form)
   addMaterials(form).then((data) => {
         console.log(data)
   })
    })
    
   
    

    
  }
  

  
const [meetNamePopup, setMeetNamePopup] = useState('');
const [meetTimePopup, setMeetTimePopup] = useState('');
const [meetDatePopup, setMeetDatePopup] = useState('');
//recording logic
const [showUploadRecPopup, setShowUploadRecPopup] = useState(false);

function handleUploadRecClick() {
  setShowUploadRecPopup(true);
}
function handleUploadRecCancelClick() {
  setShowUploadRecPopup(false);
}
async function handleUploadRecConfirmClick() {
  setShowUploadRecPopup(false);
}


  const [scheduledMeetings, setScheduledMeetings] = useState<any>([]);
  
  function handleCancelClick() {
    setShowPopup(false);
  }
  function handleConfirmClick() {
    // Handle confirmation logic here
    setShowPopup(false);
  }
  const handleAddMeet = async ({ name, time, date } : any) => {
     const form = {
         name : name,
         time : time,
         date : date,
         wallet : address
     }
      addMeet(form).then((data)=>{
         console.log(data)
      })
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome back, {address ? address : "0xConnect wallet"}</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        onClick={() => setShowPopup(true)}
      >
        Add Meet
      </button>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 ml-2"
        onClick={handleUploadRecClick}
      >
        Upload Materials
      </button>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Scheduled Meetings:</h3>
        {scheduledMeetings.length > 0 ? (
          <ul className="bg-white rounded-lg shadow-lg p-6">
            {scheduledMeetings.map((meeting : any) => (
              <li key={meeting.id} className="text-gray-800 mb-2">
                {meeting.name} - {meeting.time}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No meetings scheduled.</p>
        )}
      </div>
      {showPopup && (
         
         <AddUploadMeet
         meetNamePopup={meetNamePopup} 
         setMeetNamePopup={setMeetNamePopup} 
         meetTimePopup={meetTimePopup} 
         setMeetTimePopup={setMeetTimePopup} 
         meetDatePopup={meetDatePopup} 
         setMeetDatePopup={setMeetDatePopup} 
         handleCancelClick={handleCancelClick} 
         handleAddMeet={handleAddMeet} 
         />
      )}
     {showUploadRecPopup &&  (
        <AddUploadRec 
        uploadFile={uploadFile}
        setNewRecFile
        setNewRecName
        handleUploadRecConfirmClick
        handleUploadRecCancelClick={handleUploadRecCancelClick}
        /> 
        
     )}

     </div>)
}
           
export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });