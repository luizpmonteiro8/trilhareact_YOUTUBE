import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App.tsx";
import "./index.css";
import theme from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

//npm install --save-dev jest ts-jest @types/jest @testing-library/react @testing-library/jest-dom
//npm install --save-dev ts-node jest-environment-jsdom
