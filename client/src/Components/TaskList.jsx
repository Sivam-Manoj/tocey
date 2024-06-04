import { useState } from "react";
import { useGetTaskAPiQuery } from "../Store/Slices/taskAPiSlice";
import DeleteTask from "./DeleteTask";
import UpdateForm from "./UpdateForm";
import { GrDocumentUpdate } from "react-icons/gr";

const TaskList = () => {
  const { data: tasks, error, isLoading } = useGetTaskAPiQuery();
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const toggleTaskFinished = (taskId) => {
    setFinishedTasks((prevFinishedTasks) =>
      prevFinishedTasks.includes(taskId)
        ? prevFinishedTasks.filter((id) => id !== taskId)
        : [...prevFinishedTasks, taskId]
    );
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowUpdateForm(true);
  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };

  if (isLoading) {
    return (
      <div className="animate-bounce text-center text-blue-600 font-semibold text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-bounce text-center text-red-600 font-semibold text-xl">
        Please check your internet
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {tasks && tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`p-2 rounded-lg border select-none ${
                finishedTasks.includes(task._id)
                  ? "line-through bg-green-100"
                  : ""
              } cursor-pointer`}
              onClick={() => toggleTaskFinished(task._id)}
            >
              {task.text}
              <div className=" ">
                <DeleteTask taskId={task._id} />

                <GrDocumentUpdate
                  onClick={() => handleEdit(task)}
                  className="ml-2 text-blue-600 text-2xl relative left-[75%] bottom-3"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500">No tasks available</div>
      )}
      {showUpdateForm && currentTask && (
        <UpdateForm
          taskId={currentTask._id}
          initialText={currentTask.text}
          onClose={closeUpdateForm}
        />
      )}
    </div>
  );
};

export default TaskList;
