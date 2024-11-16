import Sidebar from "@/components/singleEvent/sidebar";

const SingleEvent = () => {
  return (
    <div className="grid grid-cols-5 gap-5">
      <div className="col-span-3">
        <img src="https://social-images.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=800,height=419/api/event-one?calendar_avatar=https%3A%2F%2Fimages.lumacdn.com%2Fcalendars%2Fux%2Fc3056057-cb9d-4059-9b94-085e987f62a0&calendar_name=ETH%20Belgrade&color0=%23040504&color1=%231b201e&color2=%23f4f5f6&color3=%2336ad89&host_avatar=https%3A%2F%2Fimages.lumacdn.com%2Favatars%2Ffi%2F3fc53367-67da-4189-aead-76bec9e9f3a7&host_name=Tanja&img=https%3A%2F%2Fimages.lumacdn.com%2Fevent-covers%2F8z%2F85930f43-270a-4990-b74d-fdd156e966b0&name=Web3%20DevRel%20Night%20%40%20Devcon" alt="" />
        <p className="font-bold text-4xl my-6">Web3 DevRel Night</p>
        <p className="text-sm text-[--textcolor]">Lorem ipsum dolor sit amet</p>
      </div>
      <Sidebar />
    </div>
  );
}

export default SingleEvent;