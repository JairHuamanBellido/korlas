import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IBaseSoldier } from "@/domain/store";
import {
  ChartNoAxesColumn,
  CheckCircle,
  DollarSign,
  Heart,
  Shield,
  Sword,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { materialInventoryRepository } from "@/infrastructure/repository/materials-inventory.repository";
import { ResourcesInventoryService } from "@/domain/services/ResourcesInventoryService";
import { queue } from "@/domain/queue";
import { useToast } from "@/hooks/use-toast";

interface Props {
  data: IBaseSoldier;
}
export default function CardItemStore({
  data: { imageSrc, name, requiredMaterials, type, stats },
}: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const onShopAction = async () => {
    setIsLoading(true);
    const currentInventory = await materialInventoryRepository.getCurrent();
    const currentResourcesInventory =
      await ResourcesInventoryService.getCurrent();
    if (!currentInventory || !currentResourcesInventory) {
      return;
    }

    const hasEnoughtMaterials =
      await ResourcesInventoryService.hasEnoughMaterials({
        requiredMaterials,
        quantity,
      });

    if (!hasEnoughtMaterials) {
      toast({
        variant: "destructive",
        title: "Not enough materials",
        description: "Build more factories!",
      });
    } else {
      for await (const _ of Array.from({ length: quantity })) {
        queue.push(
          async () =>
            await ResourcesInventoryService.addResource({ name, stats, type })
        );
      }

      for await (const requiredMaterial of requiredMaterials) {
        queue.push(
          async () =>
            await materialInventoryRepository.updateMaterialsQuantity({
              id: currentInventory.id as string,
              quantity:
                currentInventory.resources[requiredMaterial.name] -
                quantity * requiredMaterial.quantity,
              resourceType: requiredMaterial.name,
            })
        );
      }
      toast({
        description: (
          <>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-green-500" />
              <p>Successfully Purchase!</p>
            </div>
            <p className="text-muted-foreground ml-6">
              Items were adding in your inventory
            </p>
          </>
        ),
      });

      setQuantity(1);
    }
    setIsLoading(false);
  };
  return (
    <div key={`${type}-store-item`} className="flex flex-col space-y-4">
      <div className="w-[180px] flex flex-col items-center rounded p-4  space-y-4">
        <div className="w-full flex justify-between">
          <HoverCard openDelay={200} closeDelay={0}>
            <HoverCardTrigger>
              <ChartNoAxesColumn size={16} />
            </HoverCardTrigger>
            <HoverCardContent className="" side="right">
              <h2>Stats: </h2>
              <div className="space-y-1 mt-2">
                <div className="flex items-center space-x-2">
                  <Sword size={16} />
                  <p>Attack</p>
                  <p>{stats.attack}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield size={16} />
                  <p>Defense</p>
                  <p>{stats.defense}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart size={16} />
                  <p>Health</p>
                  <p>{stats.health}</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard openDelay={200} closeDelay={0}>
            <HoverCardTrigger>
              <DollarSign size={16} />
            </HoverCardTrigger>
            <HoverCardContent side="right">
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
            disabled={quantity < 2}
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
        <Button
          onClick={onShopAction}
          disabled={isLoading || quantity < 1}
          className="w-full"
        >
          {isLoading ? "LOADING" : "SHOP"}
        </Button>
      </div>
    </div>
  );
}
