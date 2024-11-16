"use client";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import EventCard from "@/components/common/eventCard";

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [file, setFile] = useState();
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [eventCity, setCity] = useState('');
  const [amount, setAmount] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const createEvent = async () => {
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
          <Button size="lg" onClick={createEvent}>Create Event</Button>
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