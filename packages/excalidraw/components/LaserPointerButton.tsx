import React from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import { IconButton } from "./IconButton";
import { laserPointerToolIcon } from "./icons";
import { LaserModeToggle } from "./LaserModeToggle";
import { useExcalidrawContainer } from "./App";
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
  const { container } = useExcalidrawContainer();

  return (
    <>
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
        }}
      />

      {/* Teleport the toggle to the root container to bypass toolbar hidden overflows */}
      {props.checked && container &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: "70px", // Pushed below the top toolbar
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999999, // Float above all canvas elements
              pointerEvents: "none", // Prevent this wrapper wrapper from blocking canvas clicks
            }}
          >
            <div style={{ pointerEvents: "auto" }}>
              <LaserModeToggle 
                appState={props.appState} 
                setAppState={props.setAppState} 
              />
            </div>
          </div>,
          container
        )}
    </>
  );
};
