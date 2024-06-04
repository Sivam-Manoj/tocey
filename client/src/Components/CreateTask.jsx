import { useState } from "react";
import {
  useCreateTaskApiMutation,
  useGetTaskAPiQuery,
} from "../Store/Slices/taskAPiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleIsOpen } from "../Store/Slices/toggleSlice";

const CreateTask = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [createTaskApi] = useCreateTaskApiMutation();
  const { refetch } = useGetTaskAPiQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      toast.error("all fields needs to be filled");
    } else {
      await createTaskApi({
        text,
      }).unwrap();
      toast.success("task Added succesfully");
      setText("");
      dispatch(toggleIsOpen());
      refetch();
    }
  };

  return (
    <div className="w-full max-w-[600px] h-auto bg-[aliceblue] fixed top-[62%] md:top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg shadow-lg">
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
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
