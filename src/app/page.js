import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/common/eventCard";

export default function Home() {
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
          <EventCard
            image="https://social-images.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=800,height=419/api/event-one?calendar_avatar=https%3A%2F%2Fimages.lumacdn.com%2Fcalendars%2Fux%2Fc3056057-cb9d-4059-9b94-085e987f62a0&calendar_name=ETH%20Belgrade&color0=%23040504&color1=%231b201e&color2=%23f4f5f6&color3=%2336ad89&host_avatar=https%3A%2F%2Fimages.lumacdn.com%2Favatars%2Ffi%2F3fc53367-67da-4189-aead-76bec9e9f3a7&host_name=Tanja&img=https%3A%2F%2Fimages.lumacdn.com%2Fevent-covers%2F8z%2F85930f43-270a-4990-b74d-fdd156e966b0&name=Web3%20DevRel%20Night%20%40%20Devcon"
            title="House ZeR0 Belgrade ::entropy series::"
            organizer="ETH Belgrade"
            startTime="18:00"
            endTime="22:00"
            address="Palata Beogradjanka"
            city="Belgrade"
            stakeAmount={0.25}
          />
          <EventCard
            image="https://social-images.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=800,height=419/api/event-one?calendar_avatar=https%3A%2F%2Fcdn.lu.ma%2Favatars-default%2Fcommunity_avatar_3.png&calendar_name&color0=%23181311&color1=%236a3f26&color2=%23ad3913&color3=%23b6f113&host_avatar=https%3A%2F%2Fcdn.lu.ma%2Favatars%2Fto%2F29c6d1e0-71c2-441b-9030-c240a477137c&host_name=Francesco%20Andreoli%20%F0%9F%A6%8A&img=https%3A%2F%2Fimages.lumacdn.com%2Fevent-covers%2Fo3%2Ff065eb59-4e31-49a7-82ac-d64ed9b8f5ef&name=Builder%20Nights%20Bangkok%20-%20Presented%20by%20MetaMask%20%F0%9F%A6%8A%20%2C%20Linea%2C%20Safe%2C%201inch%2C%20Wormhole%2C%20Brevis%2C%20Venn%20and%20Web3auth"
            title="Builder Nights"
            organizer="ETH Belgrade"
            startTime="18:00"
            endTime="22:00"
            address="Palata Beogradjanka"
            city="Belgrade"
            stakeAmount={0.25}
          />
        </TabsContent>
        <TabsContent value="past">No past events.</TabsContent>
      </Tabs>
    </div>
  );
}
