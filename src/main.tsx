import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./Routes/ErrorPage.tsx";
import Auth from "./Routes/auth.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} index />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/auth" element={<Auth />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
