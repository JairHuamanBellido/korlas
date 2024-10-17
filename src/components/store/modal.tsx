import { storeData } from "@/domain/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Store } from "lucide-react";
import CardItemStore from "./component/card";

export default function StoreModal() {
  return (
    <Dialog>
      <DialogTrigger className="absolute bottom-10 right-10 z-10" asChild>
        <Button variant={"outline"}>
          <Store />
          <p>Store</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3/4 h-3/4 max-w-full flex flex-col bg-black/5 backdrop-blur-xl">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-2xl">Store</DialogTitle>
          <DialogDescription>Choose our multiples resources</DialogDescription>
        </DialogHeader>
        <div className="h-[400px] w-full overflow-auto">
          <div className="flex space-x-3 items-center">
            {storeData.map((data) => (
              <CardItemStore key={`${data.type}-store-item`} data={data} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
