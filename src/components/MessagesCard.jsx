import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import DeleteModal from "./DeleteModal";

const MessagesCard = ({ messages, modal, setModal }) => {
  const [messageId, setMessageId] = useState("");
  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <>
      <div className="mx-14 lg:mx-60 flex gap-5 flex-wrap">
      {messages?.map((message, index) => (
        <div className="mt-4 border w-fit flex p-8 rounded-xl gap-6" key={index}>
          <div>
            <h1 className="tracking-tight text-2xl font-semibold">
              {message?.message}
            </h1>
            <h1 className="text-sm">{formatDate(message?.createdAt)}</h1>
          </div>
          <div
            className="bg-rose-600 w-fit h-fit px-3 py-2 text-white text-xl rounded-md cursor-pointer"
            onClick={() => {
              setModal(true);
              setMessageId(message._id)
            }}
          >
            <IoCloseOutline />
          </div>
        </div>
      ))}
      </div>
      <DeleteModal modal={modal} setModal={setModal} messageId={messageId} />
    </>
  );
};

export default MessagesCard;
