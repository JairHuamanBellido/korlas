import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useLiveQuery } from "dexie-react-hooks";
import { ResourcesInventoryService } from "@/domain/services/ResourcesInventoryService";
import { useState } from "react";
import { ISoldierIndexDB } from "@/infrastructure/interface/IResourcesInventory";

function InventoryModal() {
  const inventory = useLiveQuery(() => ResourcesInventoryService.getCurrent());

  const [resourceSelected, setResourceSelected] =
    useState<ISoldierIndexDB | null>(null);
  return (
    <Dialog
      onOpenChange={(val) => {
        if (!val) {
          setResourceSelected(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <p>Inventory</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3/4 h-3/4 max-w-full flex flex-col ">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-2xl">Invetory</DialogTitle>
          <DialogDescription>
            See all your items and resources
          </DialogDescription>
        </DialogHeader>
        <div className="h-full w-full relative flex ">
          <div className="h-full overflow-auto w-3/4">
            {!!inventory && (
              <>
                <div className="w-full bg-background  flex flex-wrap gap-4">
                  {inventory.resources.map((resource) => (
                    <div
                      onClick={() => setResourceSelected(resource)}
                      className="p-4 flex flex-col border border-white/5 w-24  items-center justify-center rounded cursor-pointer hover:bg-white/5 space-y-2"
                    >
                      <img
                        width={36}
                        height={36}
                        src={`${resource.type}-soldier.png`}
                        alt=""
                      />
                      <p className="text-sm">{resource.type}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="w-1/4  h-full rounded bg-[#101010] flex flex-col space-y-4 p-4">
            {!!resourceSelected && (
              <>
                <img
                  className="mx-auto"
                  width={128}
                  height={128}
                  src={`${resourceSelected.type}-soldier.png`}
                  alt=""
                />
                <div className="space-y-2">
                  <p>{resourceSelected.name}</p>
                  <p className="px-1 py-0 text-sm w-fit border border-green-500 rounded text-green-500 bg-green-500/10 ">
                    {resourceSelected.type}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p>Stats:</p>
                  <p>Attack: {resourceSelected.stats.attack}</p>
                  <p>Defense: {resourceSelected.stats.defense}</p>
                  <p>Health: {resourceSelected.stats.health}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InventoryModal;
