import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationForm from "./consumer/form";
import ListConsumer from "./consumer/list";
import "./globals.css";
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

//shadcn ui
/* https://ui.shadcn.com/docs/installation/vite */

/* npx shadcn-ui@latest add button
npx shadcn-ui@latest add table */

/* npm install lucide-react */

/* npx shadcn-ui@latest add card  */
/* npx shadcn-ui@latest add input  */
/* npx shadcn-ui@latest add checkbox  */
/* npx shadcn-ui@latest add label  */
