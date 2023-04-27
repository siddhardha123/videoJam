import { useState } from 'react';
import lighthouse from '@lighthouse-web3/sdk';
import AddUploadRec from '@/components/AddUploadRec';
import AddUploadMeet from '@/components/AddUploadMeet';
import {ethers} from 'ethers'
import addMeet from '../apis/AddMeet'
import { useAccount } from 'wagmi';
import uploadEncrypted from '../apis/upload.js'





function Dashboard() {
  const [cid, setCid] = useState(null)
  const [status, setStatus] = useState(null)
  const encryptionSignature = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return({
      signedMessage: signedMessage,
      publicKey: address
    });
  }
  const uploadFileEncrypted = async(e : any) =>{
    // const sig = await encryptionSignature();
    // const response = await upload(
    //   e,
    //   "1d9f6c73.e3be180754104302a90ab64713dae2ef", // add api key here
    // );
    // console.log(response);
    // setCid(response.data.Hash);
    uploadEncrypted(e,encryptionSignature).then((data)=>{
        setCid(data)
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
const {address} = useAccount()

  const [scheduledMeetings, setScheduledMeetings] = useState<any>([]);
  const [showPopup, setShowPopup] = useState(false);
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
        setScheduledMeetings([...scheduledMeetings, data]);
      })
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome back, sid!</h2>
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
        Upload Recording
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
        setNewRecFile
        uploadFileEncrypted={uploadFileEncrypted}
        setNewRecName
        handleUploadRecConfirmClick
        handleUploadRecCancelClick
        /> 
        
     )}

     </div>)
}
export default Dashboard;
           
