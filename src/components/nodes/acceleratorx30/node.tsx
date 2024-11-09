import { cn } from "@/lib/utils";
import acceleratorx30Logo from "/acceleratorx30-tool.png";

export default function Acceleratorx30Tool({ id, data }: any) {
  return (
    <div className={cn("bg-transparent w-fit h-fit p-4 ")}>
      <img src={acceleratorx30Logo} width={64} height={64} alt="" />
      <h2 className="text-xl ">Accelerator x30</h2>
      <p className="opacity-75">Reduce 30% Time generation</p>
      <p className="opacity-75">Cycles: {data.cycles}</p>
    </div>
  );
}
