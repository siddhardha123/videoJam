import { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [meetName, setMeetName] = useState('');
  const [meetTime, setMeetTime] = useState('');
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  function handleCancelClick() {
    setShowPopup(false);
  }
  function handleConfirmClick() {
    // Handle confirmation logic here
    setShowPopup(false);
  }
  const handleAddMeet = async () => {
    try {
      const response = await axios.post('/api/meetings', {
        name: meetName,
        time: meetTime,
      });
      setScheduledMeetings([...scheduledMeetings, response.data]);
      setMeetName('');
      setMeetTime('');
      setShowAddMeetModal(false);
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
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-5">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Are you sure?</h2>
              <p className="text-gray-600">proposed amount will be transfered to freelancer</p>
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
                onClick={handleConfirmClick}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
</div>
  )
        }
export default Dashboard;
           
