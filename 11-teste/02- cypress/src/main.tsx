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

//jest
//npm install --save-dev jest ts-jest typescript @types/jest jest-environment-jsdom

//cypress
//npm install --save-dev cypress @cypress/react18 @types/react@18
//npm i --save-dev @types/mocha
//npm install --save-dev @types/cypress

/*
warning[cypress/react]: You are using cypress/react, 
which is designed for React <= 17. 
Consider changing to cypress/react18, which is designed for React 18.
*/
