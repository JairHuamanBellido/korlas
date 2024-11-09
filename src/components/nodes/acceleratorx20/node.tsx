import { cn } from "@/lib/utils";
import acceleratorx20Logo from "/acceleratorx20-tool.png";

export default function Acceleratorx20Tool({ id, data }: any) {
  return (
    <div className={cn("bg-transparent w-fit h-fit p-4 ")}>
      <img src={acceleratorx20Logo} width={64} height={64} alt="" />
      <h2 className="text-xl ">Accelerator x20</h2>
      <p className="opacity-75">Reduce 20% Time generation</p>
      <p className="opacity-75">Cycles: {data.cycles}</p>
    </div>
  );
}
