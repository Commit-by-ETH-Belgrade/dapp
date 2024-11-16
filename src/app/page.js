"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/common/eventCard";
import { useEffect, useState } from "react";
import { decodeHexArray } from "@/utils/helpers";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsPageLoading(true);
      try {
        const response = await fetch('https://cartesi-backend-1.fly.dev/inspect/');

        const result = await response.json();

        if (response.ok) {
          console.log('Data:', result);
          const decodedEvents = decodeHexArray(result?.reports[0]?.payload);
          setEvents(decodedEvents);
          console.log('Decoded events:', decodedEvents);

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
    <div>
      <Tabs defaultValue="upcoming">
        <div className="flex items-center justify-between mb-20">
          <p className="font-bold text-2xl">Events</p>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className="grid grid-cols-3 gap-5" value="upcoming">
          {
            isPageLoading ? (
              <>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </>
            ) :
            events.map((event, index) => (
              <Link className="block" href={`/event/${event.id}`} key={index}>
                <EventCard
                  className="h-full"
                  key={index}
                  image={event.image}
                  title={event.title}
                  organizer={event.organizer}
                  date={event.date}
                  startTime={event.start_time}
                  endTime={event.end_time}
                  address={event.address}
                  city={event.city}
                  stakeAmount={event.amount}
                />
              </Link>
            ))
          }
        </TabsContent>
        <TabsContent value="past">No past events.</TabsContent>
      </Tabs>
    </div>
  );
}
