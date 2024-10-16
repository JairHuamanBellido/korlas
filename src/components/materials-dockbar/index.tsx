import { ResourceInventoryService } from "@/domain/services/ResourceInventoryService";
import { useLiveQuery } from "dexie-react-hooks";
import { Skeleton } from "../ui/skeleton";

export default function MaterialsDockBar() {
  const materialsStorage = useLiveQuery(() =>
    ResourceInventoryService.getCurrent()
  );

  return (
    <div className="absolute top-10 right-10 bg-black/60 backdrop-blur-3xl w-fit max-w-[600px] h-[60px] z-10 rounded-lg py-4">
      {!materialsStorage ? (
        <Skeleton className="w-full h-full " />
      ) : (
        <div className="flex items-center space-x-4 px-4">
          {Object.keys(materialsStorage.resources).map((material) => (
            <div key={`${material}-dockbar`} className="flex items-center space-x-2">
              <img
                width={24}
                height={16}
                src={`${material}-stone.png`}
                alt=""
              />
              <p>{materialsStorage.resources[material]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
