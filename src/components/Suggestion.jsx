import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import url from "../url";

const Suggestion = ({setMessage}) => {
  const [messages, setMessages] = useState();
    const suggestMessages = async () => {
      try {
        const response = await axios.get(
          `${url}/user/suggestions`
        );
        setMessages(response.data.suggestions);
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(() => {
      suggestMessages();
    }, [])
  return (
    <>
      <div className="mt-8">
        <button
          className="bg-gray-900 text-white py-2 px-4 rounded-md text-sm"
          onClick={suggestMessages}
        >
          Suggest Messages
        </button>
        <p className="mt-5">Click on any message below to select it.</p>
        <div className="border rounded-md py-6 px-4">
          <h1 className="text-xl font-semibold mb-6">Messages</h1>
          {messages?.map((message, index) => (
            <div className="border py-2 px-4 text-center rounded-md cursor-pointer hover:bg-slate-100 text-sm font-medium transition-all duration-50 mb-6" key={index} onClick={() => {
              setMessage(message);
            }}>
              <p>{message}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-5">
        <h1 className="mb-5">Get Your Message Board</h1>
        <Link
          className="bg-gray-900 text-white py-2 px-4 rounded-md text-sm w-fit"
          to="/sign-up"
        >
          Create Your Account
        </Link>
      </div>
    </>
  );
};

export default Suggestion;
