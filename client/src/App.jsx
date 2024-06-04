import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import Home from "./Pages/Home";
import ErrorElement from "./Pages/ErrorElement";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedPage from "./Pages/ProtectedPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        element: <ProtectedPage />,
        children: [{ index: true, element: <Home /> }],
      },
    ],
  },

  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer limit={1} />
    </>
  );
};

export default App;
