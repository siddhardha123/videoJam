import   lighthouse  from '@lighthouse-web3/sdk';


const uploadEncrypted = async (e,encryptionSignature) =>{
    const sig = await encryptionSignature();
    const response = await lighthouse.upload(
        e,
        "1d9f6c73.e3be180754104302a90ab64713dae2ef", // add api key here
      );
      console.log(response);

    return response.data.Hash;
}


 export  default uploadEncrypted;