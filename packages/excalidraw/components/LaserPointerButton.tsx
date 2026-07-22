import React from "react";
import clsx from "clsx";

import { IconButton } from "./IconButton";
import { laserPointerToolIcon } from "./icons";
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

      {/* Surface the toggle globally when active, bypassing hidden overflow issues */}
      {props.checked && (
        <div 
          style={{
            position: "fixed",
            top: "var(--sat, 1rem)", // Accommodates safe area
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "60px", // Clears the top Excalidraw UI toolbar
            zIndex: 999999, // Ensures it renders above all canvas elements
          }}
        >
          <LaserModeToggle 
            appState={props.appState} 
            setAppState={props.setAppState} 
          />
        </div>
      )}
    </>
  );
};
