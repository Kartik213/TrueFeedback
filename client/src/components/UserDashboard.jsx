import { useEffect, useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { TailSpin } from "react-loader-spinner";
import MessagesCard from "./MessagesCard";
import Interceptor from "../Helper";
import { toast } from "react-toastify";
import url from "../url";

const UserDashboard = () => {
  const jwtInterceptor = Interceptor();
  const [acceptMessages, setAcceptMessages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try{
      setLoading(true);
      const response = await jwtInterceptor.get(`${url}/user`);
      setUser(response?.data?.user);
      setAcceptMessages(response?.data?.user?.acceptMessages);
      setLoading(false);
    }catch(err){
      toast.error(err.response.data.message);
      console.error(err);
    }
  };

  const handleAcceptMessages = async () => {
    try{
      const response = await jwtInterceptor.patch(`${url}/user/messages`, {
        acceptMessages: !acceptMessages,
      });
      if(response.status === 200){
        setAcceptMessages(response?.data?.acceptMessages);
        toast.success(response.data.message, {
          position: "bottom-right",
          theme: "dark",
        });
      }
    }catch(err){
      toast.error(err.response.data.message, {
        position: "bottom-right",
        theme: "dark",
      });
  }
  };

  const handleCopyUrl = () => {
    const urlToCopy = user?.url;
    if (urlToCopy) {
      navigator.clipboard.writeText(urlToCopy)
        .then(() => toast.success("URL Copied!", {
          position: "bottom-right",
          theme: "dark",
        }))
        .catch((error) => {
          toast.error("Failed to copy url.", {
            position: "bottom-right",
            theme: "dark",
          });
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getUser();
  }, [modal]);


  return (
    <>
      <main className="m-14 lg:mx-60">
        <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
        <h1 className="text-xl font-semibold mb-4">Copy Your Unique Link</h1>
        <div className="flex gap-2">
          <p className="w-full bg-gray-200 py-2 px-2 rounded-md">{user?.url}</p>
          <button className="bg-gray-900 px-4 text-white rounded-md text-sm" onClick={handleCopyUrl}>
            Copy
          </button>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div
            className={`cursor-pointer flex items-center w-14 h-7 rounded-full transition-all duration-50
              ${acceptMessages ? "bg-black" : "bg-slate-300"}`}
            onClick={handleAcceptMessages}
          >
            <span
              className={`h-5 w-5 shadow-lg transition-all duration-50 rounded-full bg-white ${
                acceptMessages ? "ml-8" : "ml-1"
              }`}
            ></span>
          </div>
          <h1>Accept Messages: {` ${acceptMessages ? "On" : "Off"} `}</h1>
        </div>
        <div
          className="mt-4 text-sx font-medium py-2 px-4 border border-slate-400 rounded-md h-10 w-fit flex justify-center items-center bg-slate-100 cursor-pointer"
          onClick={getUser}
        >
          <LuRefreshCw className={`${loading ? "hidden" : "block"}`} />
          <TailSpin
            visible={loading}
            height="16"
            width="16"
            color="#000"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      </main>
        <MessagesCard messages={user?.messages} modal={modal} setModal={setModal}/>
    </>
  );
};

export default UserDashboard;
