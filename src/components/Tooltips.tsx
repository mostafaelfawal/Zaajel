import * as Tooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

type TooltipType = {
  label: string;
  children: ReactNode;
};

export default function Tooltips({ label, children }: TooltipType) {
  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={6}
            className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-lg animate-fade-in"
          >
            {label}
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
