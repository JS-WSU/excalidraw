import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Popover } from "radix-ui";

import { IconButton } from "./IconButton";
import { laserPointerToolIcon } from "./icons";
import { useExcalidrawContainer } from "./App";
import { LaserModeToggle } from "./LaserModeToggle";
import type { UIAppState } from "../types";

type LaserPointerButtonProps = {
  title?: string;
  checked: boolean;
  onChange?(): void;
  isMobile?: boolean;
  appState: UIAppState;
  setAppState: (stateUpdate: any) => void;
};

export const LaserPointerButton = (props: LaserPointerButtonProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { container } = useExcalidrawContainer();
  const SIDE_OFFSET = 16;

  // Automatically close the popover if the laser pointer is deselected
  useEffect(() => {
    if (!props.checked && isPopupOpen) {
      setIsPopupOpen(false);
    }
  }, [props.checked, isPopupOpen]);

  return (
    <Popover.Root open={isPopupOpen}>
      <Popover.Trigger asChild>
        <IconButton
          className={clsx("ToolIcon__LaserPointer", {
            "is-mobile": props.isMobile,
          })}
          type="toggle"
          size="small"
          icon={laserPointerToolIcon}
          checked={props.checked}
          title={`${props.title}`}
          aria-label={`${props.title}`}
          data-testid="toolbar-LaserPointer"
          onSelect={() => {
            props.onChange?.();
            setIsPopupOpen((prev) => !prev);
          }}
        />
      </Popover.Trigger>

      <Popover.Content
        className="tool-popover-content"
        sideOffset={SIDE_OFFSET}
        collisionBoundary={container ?? undefined}
        style={{ zIndex: 100 }}
      >
        <LaserModeToggle 
          appState={props.appState} 
          setAppState={props.setAppState} 
        />
      </Popover.Content>
    </Popover.Root>
  );
};
