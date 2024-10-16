import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import "./App.css";
import { ReactFlowProvider } from "@xyflow/react";

createRoot(document.getElementById("root")!).render(
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
);
