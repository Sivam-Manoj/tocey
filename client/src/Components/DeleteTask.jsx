import { IoCheckmarkDoneCircle } from "react-icons/io5";
import {
  useDeleteTaskApiMutation,
  useGetTaskAPiQuery,
} from "../Store/Slices/taskAPiSlice";
import { toast } from "react-toastify";

const DeleteTask = ({ taskId }) => {
  const [deleteTaskApi] = useDeleteTaskApiMutation();
  const { refetch } = useGetTaskAPiQuery();

  const handleDelete = async () => {
    try {
      await deleteTaskApi(taskId).unwrap();
      toast.success("Task Deleted succesfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete task:");
    }
  };

  return (
    <IoCheckmarkDoneCircle
      className="text-4xl relative text-green-400 bottom-5 float-right cursor-pointer"
      onClick={handleDelete}
    />
  );
};

export default DeleteTask;
