import { Card } from "@/components/ui/card";

const EventCard = ({ image, title, organizer, startTime, endTime, address, city, stakeAmount, className, guests }) => {
  return (
      <Card className={`p-3 bg-[#161616] rounded-sm flex flex-col justify-between cursor-pointer ${className}`}>
        <div>
          <img src={image} alt="" />
          <p className="mt-5 font-semibold text-2xl">{title}</p>
          <p className="text-[--textcolor]">{organizer}</p>
        </div>

        <div>
          <div className="flex gap-2 items-center mt-8">
            {
              guests?.length > 0 ? (
                <>
                  <div className="flex">
                    <div className="w-[30px] h-[30px] rounded-full bg-pink-600" />
                    <div className="w-[30px] h-[30px] rounded-full bg-emerald-600 ml-[-15px]" />
                    <div className="w-[30px] h-[30px] rounded-full bg-white ml-[-15px]" />
                  </div>
                  <p>{guests.length}</p>
                </>
              ) : (
                <>
                  <div className="flex">
                    <div className="w-[30px] h-[30px] rounded-full bg-pink-600" />
                    <div className="w-[30px] h-[30px] rounded-full bg-emerald-600 ml-[-15px]" />
                    <div className="w-[30px] h-[30px] rounded-full bg-white ml-[-15px]" />
                  </div>
                  <p>{guests?.length || "0 guests"}</p>
                </>
              )
            }

          </div>

          <div className="bg-[#222] p-2 mt-4">
            <p className="text-[--textcolor] mb-1">{startTime} {endTime && ` - ${endTime}`}</p>
            <p className="text-[--textcolor] mb-1">{address} {city && `, ${city}`}</p>
            <p>Stake ${stakeAmount} to commit</p>
          </div>
        </div>
      </Card>
  );
}

export default EventCard;