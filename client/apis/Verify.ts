import axios from 'axios'

const Verify = async (address : any) => {
     
    const res = await  axios.get(
        `https://polygon-mumbai.g.alchemy.com/nft/v2/s6Dbs5VQM5YfT02mh1emBMNqaGl0unZo/getNFTs?owner=${address}&contractAddresses\[\]=0x5c84F8BcE86E9624858CC76a8968E12544Ae596b&withMetadata=true&pageSize=100`
    )
    
     const owned = await res.data;
     
     console.log(owned)
    return owned
}

export default Verify



