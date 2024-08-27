import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationForm from "./consumer/form";
import ListConsumer from "./consumer/list";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListConsumer />,
  },
  {
    path: "/cliente/:consumerId?",
    element: <RegistrationForm />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

//bootstrap
/* npm install bootstrap
adicionar css
import 'bootstrap/dist/css/bootstrap.min.css';
 */
