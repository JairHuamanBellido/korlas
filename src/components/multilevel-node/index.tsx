import { NodeMaterialsType } from "@/core/nodeMaterialsType";
import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
export function MultilevelNodeContainer({
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        `w-[280px] border  flex flex-col rounded pb-2`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function MultiLevelHeaderNodeContainer({
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        `flex space-x-2 items-center  p-2 relative`,
        className
      )}
    >
      {children}
    </div>
  );
}

interface IProps {
  material: NodeMaterialsType;
  children: ReactNode;
  className?: string;
}
export function SectionHeaderMultiLevelNode({
  material,
  children,
  className,
}: IProps) {
  return (
    <>
      <div
        style={{
          background: `color-mix(in srgb, black, hsl(var(--${material})) 20%)`,
        }}
        className={cn("relative", className)}
      >
        {children}
      </div>
    </>
  );
}

export function SectionContentMultiLevelNode({
  children,
  className,
}: Pick<IProps, "children" | "className">) {
  return (
    <div className={cn("py-1 space-y-0", className)}>
      <div className="w-full relative px-2">{children}</div>
    </div>
  );
}
