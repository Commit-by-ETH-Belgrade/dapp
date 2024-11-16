import EventDetails from "@/components/singleEvent/eventDetails";

const Sidebar = () => {
  return (
    <div className="sidebar col-span-2">
      <EventDetails
        date="Monday, 3 June"
        timeStarts="18:00"
        timeEnds="22:00"
        address="Beogradjanka, Palata Beograd, 3rd floor"
        city="Belgrade"
        stakeAmount={0.05}
      />
    </div>
  );
}

export default Sidebar;