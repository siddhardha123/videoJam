import React from "react";
import Image from "next/image";
import Link from "next/link";
const EducatorCard = ({props} : any) => {
  return (
   
    <div key={props.id} className="card rounded-lg bg-gray-500 text-white p-8">
      <img
        src={props.photo}
        alt="Profile picture"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h3 className="text-center text-xl font-bold mb-2">{props.name}</h3>
      <p className="text-center mb-4">About me : {props.about}</p>
      <h4 className="text-center text-lg font-bold mb-4">${props.price}</h4>
      <button className="block mx-auto py-2 px-4 rounded-lg bg-white text-black font-bold">
        Buy NFT
      </button>
    </div>

  );
};

export default EducatorCard;
