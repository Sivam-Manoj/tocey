import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CreateTask from "../Components/CreateTask";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.toggle);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return <>{!isOpen ? "" : <CreateTask />}</>;
  }
};

export default Home;
