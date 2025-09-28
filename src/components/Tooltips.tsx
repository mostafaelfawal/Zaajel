import * as Tooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

type TooltipType = {
  label: string;
  side: "top" | "right" | "bottom" | "left";
  children: ReactNode;
};

export default function Tooltips({ label, children, side }: TooltipType) {
  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            sideOffset={6}
            className="z-3 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-lg"
          >
            {label}
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
