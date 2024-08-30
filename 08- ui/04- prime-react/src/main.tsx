import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationForm from "./consumer/form";
import ListConsumer from "./consumer/list";
import "./index.css";
import "/node_modules/primeflex/primeflex.css";

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
  <PrimeReactProvider>
    <RouterProvider router={router} />
  </PrimeReactProvider>
);

//prime react
/*
npm install primereact primeicons primeflex

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';    

import "/node_modules/primeflex/primeflex.css";
*/
