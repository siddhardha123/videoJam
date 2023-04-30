import Link from 'next/link'
import Image from 'next/image';
import React,{useEffect, useState} from "react";
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import contractConfig from "../contractConfig.json";
import Verify from '@/apis/Verify';
import {
  UseContractConfig,
  useContractRead,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
} from "wagmi";
const  ProfilePage = ({ data,meetings,materials }: any)=> {


  const [disable,setDisable] = useState(false)
  const {address} = useAccount()
  const {  data: writeData, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: `0x${contractConfig.address}`,
    abi: contractConfig.abi,
    functionName: "buyNFT",
    args: [data.wallet],
    overrides : {
        value : ethers.utils.parseEther(data.price)
    }
  });
  const { data: waitForTransactionData ,isSuccess} = useWaitForTransaction({
    hash: writeData?.hash,
  });
 

 useEffect(()=>{

   if(address){
    console.log(address)
    Verify(address).then((data)=>{
      console.log(data);
      if (data.totalCount >= 1) {
        setDisable(true);
      } else {
        setDisable(false)
      }
     })
   }
 },[address])

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
              <button className="bg-white  text-gray-900 py-2 px-4 justify-between flex rounded-lg"
               disabled={!write} onClick={() => write?.()}
               >
                Buy Membership
              </button>
              <p className="mt-5">an NFT will be minted to your wallet address which will act as a pass to all the activities</p>
            </div>
          </div>
        </div>
        <div className=" overflow-hidden ">
  {meetings ? meetings.map((meeting: any) => (
    <div key={meeting.id} className="px-6 py-4 flex mt-10  justify-between rounded-lg bg-gray-800 shadow-lg">
      <div>
      <h2 className="text-2xl font-bold text-gray-300 mb-2">{meeting.name}</h2>
      <p className="text-lg font-medium text-gray-400 mb-1">{meeting.date}</p>
      <p className="text-lg font-medium text-gray-400">{meeting.time}</p>
      </div>
      <div>
      <Link href={`/room/${meeting.meetId}`}>
      <button className="bg-white  text-gray-900 py-2 px-4 justify-between flex rounded-lg">
                join meet
              </button>
      </Link>
      </div>
      
    </div>
  )): (<p className="text-gray-600">No meetings scheduled.</p>) }
  {materials ? materials.map((material: any) => (
    <div key={material.id} className="px-6 py-4 flex mt-10  justify-between rounded-lg bg-gray-800 shadow-lg">
      <div>
      <h2 className="text-2xl font-bold text-gray-300 mb-2">{material.name}</h2>
      </div>
      <div>
      <Link href={`${material.link}`}>
      <button className="bg-white  text-gray-900 py-2 px-4 justify-between flex rounded-lg"
        disabled={!disable}
       >
                open 
              </button>
      </Link>
      </div>
      
    </div>
  )): (<p className="text-gray-600">No materials found.</p>) }
</div>
      </div>
     

    </div>
  );
}

export default ProfilePage;
