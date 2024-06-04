import { useState } from "react";
import {
  useGetTaskAPiQuery,
  useUpdateTaskApiMutation,
} from "../Store/Slices/taskAPiSlice";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const UpdateForm = ({ taskId, initialText, onClose }) => {
  const [text, setText] = useState(initialText);
  const [updateTaskApi] = useUpdateTaskApiMutation();

  const { refetch } = useGetTaskAPiQuery();

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTaskApi({ id: taskId, data: { text } }).unwrap();
      toast.success("Task updated succesfully");
      refetch();
      onClose(); // Optionally close the form after updating
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="w-full max-w-[600px] h-auto bg-[aliceblue] fixed top-[62%] md:top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg shadow-lg">
      <IoMdClose
        className=" float-right text-2xl cursor-pointer"
        onClick={handleClose}
      />
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full max-w-[400px] h-[50px] mt-4 text-center rounded-lg outline-none shadow-sm"
          placeholder="Enter your task"
        />
        <button
          type="submit"
          className="w-full max-w-[400px] h-[50px] mt-4 text-center rounded-lg bg-blue-500 text-white shadow-sm hover:bg-blue-600"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
