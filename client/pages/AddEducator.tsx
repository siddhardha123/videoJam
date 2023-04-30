import React from 'react'
import {useState,useEffect} from 'react';
import dynamic from "next/dynamic";
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import Alert from '@/components/Alert';
import Error from '@/components/Error';
import addEducators from '@/apis/AddEducators';
import contractConfig from "../contractConfig.json";
import { BigNumber } from 'ethers';
import {
    UseContractConfig,
    useContractRead,
    usePrepareContractWrite,
    useWaitForTransaction,
    useContractWrite,
  } from "wagmi";
const AddEducator = () => {
    const {address,isConnected } = useAccount()
    const [success,setSuccess] = useState(false)
    const [error,setError]  = useState(false)
    const [message,setMessage] = useState("")
    const [wei,setWei] = useState(BigNumber.from(0))
    const [form,setForm] = useState({
        name : "",
        photo: "",
        wallet : address || "",
        about : "",
        price : ""
    })

    const { config } = usePrepareContractWrite({
        address: `0x${contractConfig.address}`,
        abi: contractConfig.abi,
        functionName: "addTeacher",
        args: [form.wallet,form.name,wei,form.photo],
      });
      const { data: writeData, write } = useContractWrite(config);
      const { data: waitForTransactionData ,isSuccess} = useWaitForTransaction({
        hash: writeData?.hash,
      });
       
     useEffect(()=>{
         console.log(waitForTransactionData)
         console.log(writeData)
     },[isConnected,address,writeData,waitForTransactionData])

    const handleChange = (event : any) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (event : any) => {
        event.preventDefault();
        // Add your logic to submit the form data here
        setWei(ethers.utils.parseEther(form.price))
        write?.()
        addEducators(form).then((data)=>{
            console.log(data)
            if(data){
                if(data.message){
                    setError(true)
                    setMessage(data.message)
                }else{
                    setSuccess(true)
                    setMessage("educator registered")
                    console.log(data)
                }
               
            }
        })
        console.log(form)
    };

    return (
        <main className="py-14 text-white">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
              
                <div className="max-w-lg mx-auto space-y-3 sm:text-center">
                   

                    <p className=" text-3xl font-semibold sm:text-4xl">
                        Join Our Platform as Educator
                    </p>
                    <p>
                        Your content, your value, your rewards.
                    </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                            <div>
                                <label className="font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    required
                                    onChange={handleChange}
                                    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">
                                Wallet Address
                            </label>
                            <input
                                type="text"
                                name="walletAddress"
                                value={form.wallet}
                                required
                                onChange={handleChange}
                                className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Photo
                            </label>
                            <div className="relative mt-2">
                                <input
                                    type="text"
                                    name="photo"
                                    value={form.photo}
                                    required
                                    onChange={handleChange}
                                    className="w-full px-3  pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">
                                About
                            </label>
                            <textarea
                                name="about"
                                value={form.about}
                                required
                                onChange={handleChange}
                                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            ></textarea>
                        </div>
                        <div>
                            <label className="font-medium">
                                    Price of the membership
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        placeholder=""
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3  pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                </div>
                            </div>
                            <button
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                                disabled={!isConnected}
                            >
                                {isConnected ? "Join" : "connect your wallet to join"}
                            </button>
                        </form>

                        { success && <Alert message={message} />}
                        { error && <Error message={message} />}
                    </div>
                </div>
            </main>
        )
}


export default dynamic(() => Promise.resolve(AddEducator), { ssr: false });