import { createRoot } from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
