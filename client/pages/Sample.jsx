// @ts-nocheck

import React from "react";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function Sample() {

  const encryptionSignature = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return({
      signedMessage: signedMessage,
      publicKey: address
    });
  }

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  /* Deploy file along with encryption */

  const uploadFileEncrypted = async(e) =>{
    /*
       uploadEncrypted(e, accessToken, publicKey, signedMessage, uploadProgressCallback)
       - e: js event
       - accessToken: your API key
       - publicKey: wallets public key
       - signedMessage: message signed by the owner of publicKey
       - uploadProgressCallback: function to get progress (optional)
    */
    const sig = await encryptionSignature();
    lighthouse.uploadEncrypted(
      e,
      "1d9f6c73.e3be180754104302a90ab64713dae2ef",
      sig.publicKey,
      sig.signedMessage,
    ).then((data)=>{
        console.log(data);
    });
    
    /*
      output:
        data: {
          Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
          Size: "318557",
          Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
        }
      Note: Hash in response is CID.
    */
  }

  return (
    <div className="App">
      <input onChange={(e)=>uploadFileEncrypted(e)} type="file" />
    </div>
  );
}

export default Sample;