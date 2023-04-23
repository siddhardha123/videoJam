import Image from "next/image";
import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

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

// fvm
import { ethers } from "ethers";
import contract from "../../../contracts/DealClinet.json";
const CID = require("cids");

const Room = () => {
  // roomId logic
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  const roomIdFromUrl = router.query.roomId?.toString() || "";

  // refs
  const videoRef = useRef<HTMLVideoElement>(null);

  // fvm
  const [errorMessageSubmit, setErrorMessageSubmit] = useState("");
  const contractAddress =
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
    "0x08661959fdFFf3cB4C40DC75c10eb561c6642Ea6";
  const contractABI = contract.abi;
  const [commP, setCommP] = useState(
    "baga6ea4seaqkp2pjlh6avlvee6ib2maanav5sc35l5glf3zm6rd6hmfgcx5xeji"
  );
  const [carLink, setCarLink] = useState(
    "https://data-depot.lighthouse.storage/api/download/download_car?fileId=862fb115-d24a-4ff1-a1c8-eadbbbfd19cf.car"
  );
  const [pieceSize, setPieceSize] = useState("32768");
  const [carSize, setCarSize] = useState("18445");
  const [proposingDeal, setProposingDeal] = useState(false);
  const [txSubmitted, setTxSubmitted] = useState("");
  const [network, setNetwork] = useState("");
  const [dealID, setDealID] = useState("");
  const dealClient = useRef<ethers.Contract | null>(null);

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

  const handleSubmit = async () => {
    // This will be handling deal proposal submission sometime in the future.
    // do something with the carLink value, like send it to a backend API
    console.log(commP);
    console.log(carLink);
    console.log(pieceSize);
    console.log(carSize);

    try {
      setErrorMessageSubmit("");
      const cid = new CID(commP);
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        dealClient.current = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const extraParamsV1 = [
          carLink,
          carSize,
          false, // taskArgs.skipIpniAnnounce,
          false, // taskArgs.removeUnsealedCopy
        ];
        const DealRequestStruct = [
          cid.bytes, //cidHex
          pieceSize, //taskArgs.pieceSize,
          false, //taskArgs.verifiedDeal,
          commP, //taskArgs.label,
          520000, // startEpoch
          1555200, // endEpoch
          0, // taskArgs.storagePricePerEpoch,
          0, // taskArgs.providerCollateral,
          0, // taskArgs.clientCollateral,
          1, //taskArgs.extraParamsVersion,
          extraParamsV1,
        ];
        // console.log(await provider.getBalance("0x42c930a33280a7218bc924732d67dd84d6247af4"));
        console.log(dealClient.current.interface);
        const transaction = await dealClient.current.makeDealProposal(
          DealRequestStruct
        );
        console.log("Proposing deal...");
        setProposingDeal(true);
        const receipt = await transaction.wait();
        console.log(receipt);
        setProposingDeal(false);
        setTxSubmitted("Transaction submitted! " + receipt.hash);

        dealClient.current.on(
          "DealProposalCreate",
          (id, size, verified, price) => {
            console.log(id, size, verified, price);
          }
        );

        console.log("Deal proposed! CID: " + cid);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error: any) {
      console.log({ error });
      setErrorMessageSubmit(
        "Something went wrong. " + error.name + " " + error.message
      );
      return;
    }
  };

  const checkWalletIsConnected = async () => {
    const { ethereum } = window as any;
    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    const provider = new ethers.BrowserProvider(ethereum);
    const network = await provider.getNetwork();
    setNetwork(network.chainId as any);
    console.log(network.chainId);

    ethereum.request({ method: "eth_accounts" }).then((accounts: any) => {
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an account:", account);
      } else {
        console.log("No account found");
      }
    });
  };

  const dealIDHandler = async () => {
    setDealID("Waiting for acceptance by SP...");
    const cid = new CID(commP);
    var refresh = setInterval(async () => {
      console.log(cid.bytes);
      if (cid === undefined) {
        setDealID("Error: CID not found");
        clearInterval(refresh);
      }
      console.log("Checking for deal ID...");
      const dealID = await dealClient.current?.pieceDeals(cid.bytes);
      console.log(dealID);
      if (dealID && dealID !== "0") {
        // If your deal has already been submitted, you can get the deal ID by going to https://hyperspace.filfox.info/en/deal/<dealID>
        // The link will show up in the frontend: once a deal has been submitted, its deal ID stays constant. It will always have the same deal ID.
        setDealID("https://hyperspace.filfox.info/en/deal/" + dealID);
        clearInterval(refresh);
      }
    }, 5000);
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 min-w-fit mr-4">
          Room ID:&nbsp;
          <code className="font-mono font-bold">{roomId}</code>
        </p>
        <div className="absolute bg-red-400 top-0 left-1/2 -translate-x-1/2">
          {JSON.stringify(state.value)}
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
           
          </div>
        </div>
      </div>

      {/* Me Video */}
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <div className="flex flex-wrap gap-3 items-center justify-center ">
          <div className="h-80 aspect-video bg-zinc-800/50 rounded-2xl relative overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>

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
        </div>
        {Object.values(peers)
          .filter((peer) => peer.mic)
          .map((peer) => (
            <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
          ))}
      </div>

      {/* Buttons */}
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-5 lg:text-left gap-8">
        <div>
          <Button
            disabled={!joinLobby.isCallable}
            onClick={() => joinLobby(roomId)}
          >
            joinLobby()
          </Button>
          <div>isLobbyJoined: {isLobbyJoined.toString()}</div>
        </div>
        <div>
          <Button
            disabled={!fetchVideoStream.isCallable}
            onClick={() => fetchVideoStream()}
          >
            fetchVideoStream()
          </Button>
          <div>isLobbyJoined: {isLobbyJoined.toString()}</div>
        </div>
        <div>
          <Button disabled={!joinRoom.isCallable} onClick={() => joinRoom()}>
            joinRoom()
          </Button>
          <div>isLobbyJoined: {isLobbyJoined.toString()}</div>
        </div>
        <div>
          <Button
            disabled={!produceVideo.isCallable}
            onClick={() => produceVideo(camStream)}
          >
            produceVideo()
          </Button>
          <div>isLobbyJoined: {isLobbyJoined.toString()}</div>
        </div>
        <div>
          <Button
            disabled={!startRecording.isCallable}
            onClick={() => {
              console.log(`https://${window.location.host}/rec/${roomId}`);
              startRecording(`https://${window.location.host}/rec/${roomId}`);
            }}
          >
            startRecording()
          </Button>
          <div>error: {error}</div>
        </div>
        <div>
          <Button disabled={!stopRecording.isCallable} onClick={stopRecording}>
            stopRecording()
          </Button>
          <div>inProgress: {inProgress.toString()}</div>
        </div>

        <div>
          <Button onClick={handleSubmit}>Submit Deal</Button>
        </div>
        <div>
          <Button onClick={dealIDHandler}>Get Deal ID</Button>
        </div>
      </div>
      <div className="text-green-300">
        Deal Status: {proposingDeal ? "Proposing Deal" : dealID || "Idle"}
      </div>
      <div className="text-green-300">{(recordingData as any)?.s3Url}</div>
    </main>
  );
};

export default Room;
