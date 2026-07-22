import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  // Track mount state to safely access document.body for the React Portal
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      {/* Teleport the toggle directly to the document body to bypass ALL Excalidraw hidden overflows */}
      {props.checked && mounted && typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: "80px", // Safely positioned below the top toolbar UI
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999999, // Floating above the entire Excalidraw canvas
              pointerEvents: "none", // Prevent this wrapper from blocking canvas clicks
            }}
          >
            <div style={{ pointerEvents: "auto" }}>
              <LaserModeToggle 
                appState={props.appState} 
                setAppState={props.setAppState} 
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
