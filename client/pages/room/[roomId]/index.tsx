import WalletNotConnected from "@/components/WalletNotConnected";
import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import Verify from "@/apis/Verify";
import ControlBar from "@/components/ControlBar";
import LobbyController from "@/components/LobbyController";
// huddle01
import { useEventListener } from "@huddle01/react";
import { Video, Audio } from "@huddle01/react/components";
import {
  useVideo,
  useAudio,
  useLobby,
  useRoom,
  useRecording,
  usePeers,
  useMeetingMachine,
} from "@huddle01/react/hooks";

const Room = () => {
  // roomId logic
  const { address, isConnected } = useAccount();
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  const roomIdFromUrl = router.query.roomId?.toString() || "";

  // refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const AudioRef = useRef<HTMLAudioElement>(null);

  //bool logic
  const [verified, setVerified] = useState(false);
  const [block, setBlock] = useState(false);

  const handleVerify = () => {
    Verify(address).then((data) => {
      console.log(data);
      if (data.totalCount >= 1) {
        setVerified(true);
      } else {
        setBlock(true);
        setVerified(false);
      }
    });
  };
  // huddle01
  const { state } = useMeetingMachine();
  const {
    stream: camStream,
    fetchVideoStream,
    produceVideo,
    stopProducingVideo,
    stopVideoStream,
  } = useVideo();
  const {
    stream: micStream,
    fetchAudioStream,
    produceAudio,
    stopProducingAudio,
    stopAudioStream,
  } = useAudio();
  const { joinLobby, isLobbyJoined } = useLobby();
  const { joinRoom, isRoomJoined } = useRoom();
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
  }, [roomIdFromUrl,router.query.roomId]);

  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });
  useEventListener("lobby:mic-on", () => {
    if (micStream && AudioRef.current) AudioRef.current.srcObject = micStream;
  });
  useEffect(() => {}, [isConnected]);

  return (
    <>
      {isConnected && !block ? (
        <>
          <div className="z-10    font-mono text-sm lg:flex">
            <div className="absolute bg-red-400 top-0 left-1/2 -translate-x-1/2">
              {JSON.stringify(state.value)}
              <div className="text-green-300">{(recordingData as any)?.s3Url}</div>
            </div>
          </div>

          {/* Me Video */}

          <div>

        {isLobbyJoined && <div className="vid ">
            <p className="">
              Room ID:&nbsp;
              <code className="font-mono font-bold">{roomId}</code>
            </p>
            <div className="h-80 aspect-video  bg-zinc-800/50 rounded-2xl relative overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
          
             </div>
            <LobbyController
              fetchVideoStream={fetchVideoStream}
              stopVideoStream={stopVideoStream}
              fetchAudioStream={fetchAudioStream}
              stopAudioStream={stopAudioStream}
              camStream={camStream}
              micStream={micStream}
            />
<Button
                    disabled={!joinRoom.isCallable}
                    onClick={() => joinRoom()}
                  >
                    joinRoom()
                  </Button>

        </div>}

         <div className="flex items-center justify-center mt-48 ">
              <div className=" flex ">
                {!isLobbyJoined && !verified  &&  !isRoomJoined &&(
                  <div className="">
                    {" "}
                    <p className="text-5xl ">Verify your membership to join the meet</p>
                     <br/>
                    <button
  className="bg-gray-300 hover:translate-y-1 transform transition duration-200 ease-in-out text-black rounded-md px-5 py-3 w-48 shadow-md"
  onClick={handleVerify}
>
  {verified ? "verified" : "verify"}
</button>

                  </div>
                )}
                {verified  && !isLobbyJoined && !isRoomJoined &&(
                  <div className="flex flex-col">
                  <p className="text-5xl">
                  Congratulations!! you have access to this meet 🥳🥳
                  </p>
                  <br/>
                  <Button
                    disabled={!joinLobby.isCallable}
                    onClick={() => joinLobby(roomId)}
                  >
                    joinLobby()
                  </Button>
                   
                  </div>
                  
                )}
                
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

        

          {isRoomJoined && (
            <>
            <ControlBar
              produceVideo={produceVideo}
              produceAudio={produceAudio}
              stopProducingVideo={stopProducingVideo}
              stopProducingAudio={stopProducingAudio}
              micStream={micStream}
              camStream={camStream}
              startRecording={startRecording}
              stopRecording={stopRecording}
              roomId={roomId}
            />
            </>
          )}

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
                <Audio
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={peer.mic}
                />
              ))}
          </div>
        </>
      ) : (
        <WalletNotConnected />
      )}{" "}
    </>
  );
};

export default dynamic(() => Promise.resolve(Room), { ssr: false });
