import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationForm from "./consumer/form";
import ListConsumer from "./consumer/list";
import "./index.css";
import { store } from "./store/store";

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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
