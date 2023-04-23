import React from "react";
function ProfilePage({ data }: any) {
  return (
    <div className="mt-12 bg-black flex flex-col justify-center ">
      <div className="max-w-4xl w-full mx-auto flex flex-col ">
        {/* Profile Picture */}
        <div className="md:flex text-center justify-around items-center ">
          <img
            src={data.photo}
            alt="Profile"
            className="rounded-full ml-24 md:ml-0 w-48 h-48 border-4 border-white mb-8"
          />

          {/* Name */}
          <div className="flex flex-col">
            <h1 className="text-3xl text-white text-center md:text-justify font-bold mb-4">
              {data.name}
            </h1>
            <p className="text-white text-justify max-w-lg mb-8">
              {data.about}
            </p>
          </div>
        </div>
        <div className="bg-gray-900 text-white py-6 px-8 rounded-lg mb-8 flex">
          <div className="flex justify-between md:space-x-96 space-x-5 ">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-2">Membership</h2>
              <p className="text-3xl font-bold mb-4">{data.price}ETH</p>
              <p>* Exclusive live classes</p>
              <p>* Access to all recorded classes</p>
            </div>
            <div className="ml-">
              <button className="bg-white  text-gray-900 py-2 px-4 justify-between flex rounded-lg">
                Buy Membership
              </button>
              <p className="mt-5">an NFT will be minted to your wallet address which will act as a pass to all the activities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
