import { cn } from "@/lib/utils";
import acceleratorx10Logo from "/acceleratorx10-tool.png";

export default function Acceleratorx10Tool({ id, data }: any) {
  return (
    <div className={cn("bg-transparent w-fit h-fit p-4 ")}>
      <img src={acceleratorx10Logo} width={64} height={64} alt="" />
      <h2 className="text-xl ">Accelerator x10</h2>
      <p className="opacity-75">Reduce 10% Time generation</p>
      <p className="opacity-75">Cycles: {data.cycles}</p>
    </div>
  );
}
