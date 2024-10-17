import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IBaseSolider } from "@/domain/store";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { materialInventoryRepository } from "@/infrastructure/repository/materials-inventory.repository";

interface Props {
  data: IBaseSolider;
}
export default function CardItemStore({
  data: { imageSrc, name, requiredMaterials, type },
}: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onShopAction = async () => {
    setIsLoading(true);
    const currentInventory = await materialInventoryRepository.getCurrent();

    if (!currentInventory) {
      return;
    }

    await materialInventoryRepository
      .updateMaterialsQuantity({
        id: currentInventory.id as string,
        quantity,
        resourceType: type,
      })
      .then(async () => {
        for await (const requiredMaterial of requiredMaterials) {
          await materialInventoryRepository.updateMaterialsQuantity({
            id: currentInventory.id as string,
            quantity:
              currentInventory.resources[requiredMaterial.name] -
              quantity * requiredMaterial.quantity,
            resourceType: requiredMaterial.name,
          });
        }
      });

    setIsLoading(false);
  };
  return (
    <div key={`${type}-store-item`} className="flex flex-col space-y-4">
      <div className="w-[180px] flex flex-col items-center rounded p-4  space-y-4">
        <div className="w-full flex justify-end">
          <HoverCard openDelay={200} closeDelay={0}>
            <HoverCardTrigger>
              <Info size={24} />
            </HoverCardTrigger>
            <HoverCardContent
              className="bg-white/5 backdrop-blur-3xl"
              side="right"
            >
              <h2>Cost: </h2>
              <div className="mt-2 flex flex-col space-y-1">
                {requiredMaterials.map((material) => (
                  <div
                    key={`${material.name}-${type}-store-item`}
                    className="flex items-center space-x-2"
                  >
                    <img
                      width={16}
                      height={16}
                      src={`${material.name}-stone.png`}
                      alt=""
                    />
                    <p>{material.name}</p>
                    <p>{material.quantity * quantity}</p>
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <img width={48} height={48} src={imageSrc} alt="" />
        <p>{name}</p>
        <div className="w-full flex justify-between items-center">
          <Button
            disabled={quantity < 1}
            onClick={() => setQuantity((prev) => prev - 1)}
            variant={"ghost"}
          >
            -
          </Button>
          <p className="font-semibold">{quantity}</p>
          <Button
            onClick={() => setQuantity((prev) => prev + 1)}
            variant={"ghost"}
          >
            +
          </Button>
        </div>
        <Button onClick={onShopAction} disabled={isLoading} className="w-full">
          {isLoading ? "LOADING" : "SHOP"}
        </Button>
      </div>
    </div>
  );
}
