import { memo } from "react";
import StoreModal from "@/components/store/modal";
import InventoryModal from "../inventory";
function BottomBar() {
  return (
    <div className=" bg-black border border-white/10 backdrop-blur-3xl rounded absolute bottom-10 right-10 z-10  flex items-center space-x-2 p-2">
      <StoreModal />
      <InventoryModal />
    </div>
  );
}

export default memo(BottomBar);
