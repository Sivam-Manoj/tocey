import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import TaskList from "./TaskList";


const RootLayout = () => {
  return (
    <>
      <Navbar />
      <TaskList/>
      <Outlet />
    </>
  );
};

export default RootLayout;
