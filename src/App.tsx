import "@xyflow/react/dist/style.css";
import Sidebar from "./components/sidebar";

import NodeInfoSidebar from "./components/sidebar/node-info-sidebar";
import Board from "./components/board";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import { MaterialsInventoryService } from "./domain/services/MaterialsInventoryService";
import { FlowGraphService } from "./domain/services/FlowGraphService";

function App() {
  const flowGraph = useLiveQuery(() => FlowGraphService.getCurrent())!;

  useEffect(() => {
    MaterialsInventoryService.create();
    FlowGraphService.create();
  }, []);

  return (
    <div className="w-full h-full relative flex">
      <Sidebar />
      {!!flowGraph && <Board flowGraph={flowGraph} />}
      <NodeInfoSidebar />
    </div>
  );
}

export default App;
