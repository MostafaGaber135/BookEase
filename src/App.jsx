import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout/Layout";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import BookNow from "./pages/BookNow/BookNow";
import NotFound from "./pages/NotFound/NotFound";
import MyBooking from "./pages/MyBooking/MyBooking";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "services", element: <Services /> },
        { path: "book", element: <BookNow /> },
        { path: "mybooking", element: <MyBooking /> },
        { path: "admin/dashboard", element: <AdminDashboard /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
