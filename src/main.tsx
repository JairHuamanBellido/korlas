import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import "./App.css";
import { ReactFlowProvider } from "@xyflow/react";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <ReactFlowProvider>
    <Toaster />
    <App />
  </ReactFlowProvider>
);
