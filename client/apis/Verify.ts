import axios from 'axios'

const Verify = async (address : any) => {
     
    const res = await  axios.get(
     `https://polygon-mumbai.g.alchemy.com/nft/v3/s6Dbs5VQM5YfT02mh1emBMNqaGl0unZo/getNFTsForOwner?owner=${address}&contractAddresses=0xe503ca3d30d7104e9df531e225ccf7fe933189fd`
    )
    
     const owned = await res.data;

    return owned
}

export default Verify

