import React from 'react'

const AddUploadRec = ({uploadFileEncrypted,handleUploadRecConfirmClick,handleUploadRecCancelClick} : any) => {
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Upload a Recording</h3>
      <label className="block mb-2 font-bold text-gray-700" htmlFor="file">
        File
      </label>
        <input className="border border-gray-400 p-2 mb-4 rounded-lg w-full" onChange={e=>uploadFileEncrypted(e)} type="file" />
     
      <div className="flex

continue the code
justify-end">
<button
       className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mr-2"
       onClick={handleUploadRecConfirmClick}
     >
Upload
</button>
<button
       className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition duration-200"
       onClick={handleUploadRecCancelClick}
     >
Cancel
</button>
</div>
</div>
</div>
)

}
   

export default AddUploadRec