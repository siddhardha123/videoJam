import { useState } from 'react';
import axios from 'axios';

function Dashboard() {
 
const [meetNamePopup, setMeetNamePopup] = useState('');
const [meetTimePopup, setMeetTimePopup] = useState('');
const [meetDatePopup, setMeetDatePopup] = useState('');

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
    try {
      const response = await axios.post('', {
        name: name,
        time: time,
        date: date,
      });
      setScheduledMeetings([...scheduledMeetings, response.data]);
    } catch (error) {
      console.error(error);
    }
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
                 time: meetTimePopup,
                 date: meetDatePopup,
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
       
      )}
</div>
  )
        }
export default Dashboard;
           
