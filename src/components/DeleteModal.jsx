import {toast} from "react-toastify";
import Interceptor from "../Helper";
import url from "../url";

const DeleteModal = ({ modal, setModal, messageId }) => {
  const jwtInterceptor = Interceptor();
    const handleDelete = async () => {
      try{
        const response = await jwtInterceptor.delete(
          `${url}/user/${messageId}`
        );
        setModal(false);
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
    };
  return (
    <div
      className={`${
        modal
          ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg m-5 max-w-lg">
        <h1 className="text-lg font-semibold">Are you absolutely sure?</h1>
        <h1 className="text-sm text-[color:hsl(215.4,16.3%,46.9%)] my-4">
          This action cannot be undone. This will permanently delete this
          message.
        </h1>
        <div className="flex justify-end gap-3">
          <button
            className="font-medium text-sm px-4 py-2 bg-gray-50 hover:bg-gray-200 text-black rounded"
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
          <button
            className="font-medium text-sm px-4 py-2 bg-[color:hsl(222.2,47.4%,11.2%)] hover:bg-[color:hsl(222.2,47.4%,11.2%,90%)] text-white rounded"
            onClick={handleDelete}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
