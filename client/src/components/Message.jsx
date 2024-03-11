import { useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import url from "../url";

const Message = ({message, setMessage}) => {
  // const [message, setMessage] = useState("");
  const {username} = useParams();

  const sendMessage = async() => {
    try{
      const response = await axios.post(
        `${url}/user/send-message`,
        {
          username,
          message,
        },
      );
      toast.success(response.data.message, {
        position: "bottom-right",
        theme: "dark",
      });
    }catch(err){
      console.error(err);
      toast.error(err.response.data.message, {
        position: "bottom-right",
        theme: "dark",
      });
    }
    setMessage("");
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold mb-6">
        Public Profile Link
      </h1>
      <h1 className="leading-none font-medium text-sm mb-4">
        Send Anonymous Message to @{username}
      </h1>
      <textarea
        value={message}
        placeholder="Write your anonymous message here"
        className="py-2 px-3 text-sm border rounded-md w-full min-h-[80px]"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <div className="flex justify-center mt-4">
        <button
          className={`rounded-md bg-gray-900 py-2 px-4 h-10 text-white font-semibold text-sm flex items-center justify-center ${
            !message ? "opacity-50" : "opacity-100"
          }`}
          onClick={sendMessage}
        >
          Send It
        </button>
      </div>
    </>
  );
};

export default Message;
