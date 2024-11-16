"use client";

import Sidebar from "@/components/singleEvent/sidebar";
import { useEffect, useState } from "react";
import { decodeHexArray } from "@/utils/helpers";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const SingleEvent = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [event, setEvent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchNotices = async () => {
      setIsPageLoading(true);
      try {
        const response = await fetch('https://cartesi-backend-1.fly.dev/inspect/');

        const result = await response.json();

        if (response.ok) {
          console.log('Data:', result);
          const decodedEvents = decodeHexArray(result?.reports[0]?.payload);
          console.log('Decoded events:', decodedEvents);
          const event = decodedEvents.filter((event) => {
            console.log('Event:', event);
            console.log('id:', id);
            return event.id == id
          });
          console.log('Decoded event:', event);
          setEvent(event[0]);
        } else {
          console.error('GraphQL Errors:', result.errors);
        }
        setIsPageLoading(false);
      } catch (error) {
        console.error('Network Error:', error);
        setIsPageLoading(false);
      }
    };

    fetchNotices();
  }, []);


  return (
    <div className="grid grid-cols-5 gap-5">
      {
        isPageLoading ? (
          <>
            <div className="col-span-3">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-[125px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-span-3">
              <img src={event.image} alt="" />
              <p className="font-bold text-4xl my-6">{event.title}</p>
              <p className="text-sm text-[--textcolor]">{event.description}</p>
            </div>
            <Sidebar
              date={event.date_event}
              startTime={event.start_time}
              endTime={event.end_time}
              stakingAmount={event.amount}
              location={event.location}
              city={event.city}
            />
          </>
        )
      }
    </div>
  );
}

export default SingleEvent;