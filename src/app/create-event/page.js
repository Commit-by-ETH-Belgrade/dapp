"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import EventCard from "@/components/common/eventCard";
import { useWriteContract } from 'wagmi';
import { PinataSDK } from "pinata";

import CommitContract from "@/constants/commitContract.json";
import { parseEther, zeroAddress } from "viem";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { toast } from 'react-toastify';

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: "emerald-mental-chinchilla-134.mypinata.cloud",
  pinataGatewayKey: process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY
});

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

  const { writeContractAsync } = useWriteContract();

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
          address: '0x5d2Fab79A78213eAD922e036E3a3e4320390330a',
          abi: CommitContract.abi,
          functionName: 'createEvent',
          args: [parseEther(amount)], // Ensure these arguments are correct
      }
      );
      console.log('Event created successfully:', data);
      setCreatingEventInProgress(false);
    } catch (error) {
      console.error('Failed to create event:', error);
      setCreatingEventInProgress(false);
      toast.error('Failed to create event');
    }
    // const event = {
    //   name: eventName,
    //   date: eventDate,
    //   time: eventTime,
    //   location: eventLocation,
    //   description: eventDescription
    // };
    //
    // const response = await fetch('http://localhost:3001/events', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(event)
    // });
    //
    // if (response.ok) {
    //   alert('Event created successfully');
    // } else {
    //   alert('Failed to create event');
    // }
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