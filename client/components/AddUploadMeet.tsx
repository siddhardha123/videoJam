import React from 'react'

const AddUploadMeet = ({meetNamePopup,setMeetNamePopup,meetTimePopup,setMeetTimePopup,meetDatePopup,setMeetDatePopup,handleCancelClick,handleAddMeet} : any) => {
  return (
    <div className="bg-white text-black rounded-lg p-5 ">
         <div className="mb-5">
           <h2 className="text-lg font-semibold">Add Meeting</h2>
           <input
             type="text"
             placeholder="Meeting Name"
             value={meetNamePopup}
             onChange={(e) => setMeetNamePopup(e.target.value)}
             className="border rounded-lg px-3 py-2 mt-2"
           />
           <input
             type="time"
             placeholder="Meeting Time"
             value={meetTimePopup}
             onChange={(e) => setMeetTimePopup(e.target.value)}
             className="border rounded-lg px-3 py-2 mt-2 ml-2"
           />
           <input
             type="date"
             placeholder="Meeting Date"
             value={meetDatePopup}
             onChange={(e) => setMeetDatePopup(e.target.value)}
             className="border rounded-lg px-3 py-2 mt-2 ml-2"
           />
         </div>
         <div className="flex justify-end">
           <button
             className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
             onClick={handleCancelClick}
           >
             Cancel
           </button>
           <button
             className="bg-[#CB1C8D] hover:bg-[#6f104e] text-white font-bold py-2 px-4 rounded"
             onClick={() => {
               handleAddMeet({
                 name: meetNamePopup,
                 time: meetTimePopup.toString(),
                 date: meetDatePopup.toString(),
               });
               setMeetNamePopup('');
               setMeetTimePopup('');
               setMeetDatePopup('');
             }}
           >
             Add
           </button>
         </div>
       </div>
  )
}

export default AddUploadMeet