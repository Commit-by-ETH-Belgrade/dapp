"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import EventCard from "@/components/common/eventCard";
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { PinataSDK } from "pinata";
import { ethers, toUtf8Bytes } from 'ethers';

import CommitContract from "@/utils/commitContract.json";
import InputBoxContract from "@/utils/inputBox.json";
import { parseEther, zeroAddress } from "viem";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { toast } from 'react-toastify';

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: "emerald-mental-chinchilla-134.mypinata.cloud",
  pinataGatewayKey: process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY
});

const COMMIT_CONTRACT = '0x5d2Fab79A78213eAD922e036E3a3e4320390330a';

const CreateEvent = () => {
  const isLoggedIn = useIsLoggedIn();
  const [creatingEventInProgress, setCreatingEventInProgress] = useState(false);
  const [eventName, setEventName] = useState('');
  const [file, setFile] = useState();
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [eventCity, setCity] = useState('');
  const [amount, setAmount] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const account = useAccount();

  const eventId = useReadContract({
    abi: CommitContract.abi,
    address: COMMIT_CONTRACT,
    functionName: 'eventId',
  })
  const { writeContractAsync } = useWriteContract();

  const rpcProviderUrl = 'https://arbitrum-sepolia.gateway.tenderly.co/4YMRN8fKu2SV1JSNsGlbMZ';
  const privateKey = process.env.NEXT_PUBLIC_DEV_WALLET;
  const contractAddress = '0x59b22D57D4f067708AB0c00552767405926dc768';

  console.log("EventId", eventId.data);
  const createEvent = async () => {
    try {
      if (creatingEventInProgress) return;
      setCreatingEventInProgress(true);

      const upload = await pinata.upload.file(file)
      console.log(upload);
      console.log("upload.cid", upload.cid);
      const url = await pinata.gateways.createSignedURL({
        cid: upload.cid,
        expires: 120000
      })
      console.log(url);

      console.log('Attempting to create event...');
      const data = await writeContractAsync({
          // TODO: make dynamic
          address: COMMIT_CONTRACT,
          abi: CommitContract.abi,
          functionName: 'createEvent',
          args: [parseEther(amount)], // Ensure these arguments are correct
      });
      console.log('Event created successfully on contract:', data);

      // Cartesi input STARTSs
      const provider = new ethers.getDefaultProvider(rpcProviderUrl);
      const wallet = new ethers.Wallet(privateKey, provider);
      const contract = new ethers.Contract(contractAddress, InputBoxContract.abi, wallet);

      console.log("account", account)

      const payload = {
        "id": Math.floor(Math.random() * 10000000) + 100,
        "title": eventName,
        "description": eventDescription,
        "image": url,
        "date_event": eventDate,
        "start_time": startTime,
        "end_time": endTime,
        "location": eventAddress,
        "address": eventAddress,
        "city": eventCity,
        "organiser": account.address,
        "amount": amount,
        "guests": "0",
        "status": "Scheduled",
        "dummy_1": `${Number(eventId.data) + 1}`,
        "action": "add"
      };

      const jsonString = JSON.stringify(payload);
      const bytesPayload = toUtf8Bytes(jsonString);

      // Call the smart contract function
      const tx = await contract.addInput('0x61f35052e6d3aB5170cc949193B30Dba81127a95', bytesPayload);
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log('Transaction successful:', receipt);
     // Cartesi ENDS

      setCreatingEventInProgress(false);
      toast.success('Event created successfully');
      setEventName('');
      setAmount('');
      setEventAddress('');
      setFile(undefined);
      setCity('');
      setEventDate('');
      setStartTime('');
      setEndTime('');
      setEventDescription('');
    } catch (error) {
      console.error('Failed to create event:', error);
      setCreatingEventInProgress(false);
      toast.error('Failed to create event');
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        <p>Please log in to create events</p>
      </div>
    )
  }

  return (
    <div>
      <p className="font-bold text-2xl mb-10">Create Event</p>
      <div className="grid grid-cols-5 items-start gap-5">
        <div className="form flex flex-col gap-3 col-span-3">
          <Input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <Input
            id="picture"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Input
            type="text"
            placeholder="Date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Start time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            type="text"
            placeholder="End time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Event Address"
            value={eventAddress}
            onChange={(e) => setEventAddress(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Event City"
            value={eventCity}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount to stake"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Textarea
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <Button size="lg" onClick={createEvent}>{creatingEventInProgress ? "Creating event, hang on..." : "Create event"}</Button>
        </div>
        <EventCard
          className="col-span-2"
          title={eventName}
          image={file && URL.createObjectURL(file)}
          startTime={startTime}
          endTime={endTime}
          address={eventAddress}
          city={eventCity}
          stakeAmount={amount}
          guests={[]}
        />
      </div>
    </div>
  );
}

export default CreateEvent;