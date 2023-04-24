import WalletNotConnected from "@/components/WalletNotConnected"
import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAccount} from "wagmi";
import dynamic from "next/dynamic";
import Verify from "@/apis/Verify";
// huddle01
import { useEventListener } from "@huddle01/react";
import { Video, Audio } from "@huddle01/react/components";
import {
  useVideo,
  useLobby,
  useRoom,
  useRecording,
  usePeers,
  useMeetingMachine,
} from "@huddle01/react/hooks";


const Room = () => {
  // roomId logic
  const {address,isConnected } = useAccount()
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  const roomIdFromUrl = router.query.roomId?.toString() || "";

  // refs
  const videoRef = useRef<HTMLVideoElement>(null);

  // fvm
  const [errorMessageSubmit, setErrorMessageSubmit] = useState("");

  const [network, setNetwork] = useState("");

  //bool logic 
  const [verified,setVerified] = useState(false)
  const [block,setBlock] = useState(false)
  const [allowVideo,setAllowVideo] = useState(false)
  const [allowRecord,setAllowRecord] = useState(false)

  const handleVerify = () => {
     Verify(address).then((data)=>{
      console.log(data)
      if(data.totalCount >= 1 )
      {
         setVerified(true)
      }else{
         setBlock(true)
         setVerified(false)
      }
     })
  }
  // huddle01
  const { state } = useMeetingMachine();
  const { stream: camStream, fetchVideoStream, produceVideo } = useVideo();
  const { joinLobby, isLobbyJoined } = useLobby();
  const { joinRoom } = useRoom();
  const {
    startRecording,
    stopRecording,
    error,
    data: recordingData,
    inProgress,
  } = useRecording();
  const { peers } = usePeers();

  useEffect(() => {
    console.log({ peers });
  }, [peers]);

  useEffect(() => {
    setRoomId(router.query.roomId?.toString() || "");
  }, [roomIdFromUrl]);

  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });
  useEffect(()=>{
    
  },[isConnected])

  const handleSubmit = async () => {
  
  };

  const checkWalletIsConnected = async () => {
      if(!isConnected){
          console.log("please connect your  wallet")
          
      }
  };


  return (
    <>{isConnected && !block ?  
      (<>
      {/* <div className="z-10    font-mono text-sm lg:flex">
        
        <div className="absolute bg-red-400 top-0 left-1/2 -translate-x-1/2">
        {!isConnected && (<p>Connect your wallet to verify your membership</p>)}
          {JSON.stringify(state.value)}
        </div>
       
      </div> */}

      {/* Me Video */}
      <p className="">
          Room ID:&nbsp;
          <code className="font-mono font-bold">{roomId}</code>
        </p>
       <div className="flex justify-evenly">
      
       <div className="h-80 aspect-video  bg-zinc-800/50 rounded-2xl relative overflow-hidden">
        
            <video
              ref={videoRef}
              autoPlay
              muted
              className="object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>

      <div className="flex ">
         <div className="flex flex-col space-x-2">
          { !isLobbyJoined &&
             (<> <p className="">Verify your membership to join the meet</p>
             <button className="bg-green-300 px-5 py-3 w-48 text-black" onClick={handleVerify}
             >{verified ? "verified" : "verify"}</button>
             </>)
          }
         
         <Button
            disabled={!joinLobby.isCallable}
            onClick={() => {
              joinLobby(roomId)}}
          >
            Join Lobby
          </Button>
          <div>
          <Button
            disabled={!fetchVideoStream.isCallable}
            onClick={() => fetchVideoStream()}
          >
            fetchVideoStream()
          </Button>
          <Button disabled={!joinRoom.isCallable} onClick={() => joinRoom()}>
            joinRoom()
          </Button>
          <Button
            disabled={!produceVideo.isCallable}
            onClick={() => produceVideo(camStream)}
          >
            produceVideo()
          </Button>
          <Button
            disabled={!startRecording.isCallable}
            onClick={() => {
              console.log(`https://${window.location.host}/rec/${roomId}`);
              startRecording(`https://${window.location.host}/rec/${roomId}`);
            }}
          >
            startRecording()
          </Button>
          <Button disabled={!stopRecording.isCallable} onClick={stopRecording}>
            stopRecording()
          </Button>
            
          </div>
          
         </div>
        
          
       {/* <div className="flex flex-col"> 
       <div>isLobbyJoined: {isLobbyJoined.toString()}</div>
          <div>isLobbyJoined: {isLobbyJoined.toString()}</div>
          <div>isLobbyJoined: {isLobbyJoined.toString()}</div>
          <div>isLobbyJoined: {isLobbyJoined.toString()}</div>
          <div>error: {error}</div>
          <div>inProgress: {inProgress.toString()}</div>
          <div className="text-green-300">{(recordingData as any)?.s3Url}</div>


       </div> */}
          

      
      </div>


       </div>
          
  

     {/* peers */}
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
    {Object.values(peers)
      .filter((peer) => peer.cam)
      .map((peer) => (
        <div
          key={peer.peerId}
          className="h-80 aspect-video bg-zinc-800/50 rounded-2xl relative overflow-hidden"
        >
          <Video
            peerId={peer.peerId}
            track={peer.cam}
            className="object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            debug
          />
        </div>
      ))}
{Object.values(peers)
    .filter((peer) => peer.mic)
    .map((peer) => (
      <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
    ))}
    </div>
    </>) : <WalletNotConnected/>} </>
  );
};

export default dynamic(() => Promise.resolve(Room), { ssr: false });
