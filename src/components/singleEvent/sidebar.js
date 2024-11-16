import EventDetails from "@/components/singleEvent/eventDetails";

const Sidebar = ({date, startTime, endTime, stakingAmount, location, city}) => {
  return (
    <div className="sidebar col-span-2">
      <EventDetails
        date={date}
        timeStarts={startTime}
        timeEnds={endTime}
        address={location}
        city={city}
        stakeAmount={stakingAmount}
      />
    </div>
  );
}

export default Sidebar;