import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EventDetails = ({stakeAmount, date, timeStarts, timeEnds, address, city}) => {
  return (
    <Card className="p-3 bg-[#161616] rounded-sm">
      <div className="mb-5">
        <p className="border-b border-white pb-2 mb-5">Event details</p>
        <div className="mb-3">
          <p>{date}</p>
          <p className="text-[--textcolor] text-sm">{timeStarts} - {timeEnds}</p>
        </div>
        <div>
          <p>{address}</p>
          <p className="text-[--textcolor] text-sm">{city}</p>
        </div>
      </div>

      <div className="mb-5">
        <p className="border-b border-white pb-2 mb-5">Registration</p>
        <p className="text-[--textcolor] text-sm mb-2">Please click on the button below to register. You will be required to stake ${stakeAmount} worth of ETH.</p>
        <p className="text-sm">Learn more about how staking works ↗</p>
        <Button className="w-full mt-4">Commit to attend</Button>
      </div>

      <div>
        <p className="border-b border-white pb-2 mb-5">Who&apos;s coming</p>
        <div className="flex gap-2 items-center">
          <div className="flex">
            <div className="w-[30px] h-[30px] rounded-full bg-pink-600" />
            <div className="w-[30px] h-[30px] rounded-full bg-emerald-600 ml-[-15px]" />
            <div className="w-[30px] h-[30px] rounded-full bg-white ml-[-15px]" />
          </div>
          <p>120 guests</p>
        </div>
      </div>

    </Card>
  );
}

export default EventDetails;