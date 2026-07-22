import React from "react";
import type { UIAppState } from "../types";

type LaserModeToggleProps = {
  appState: UIAppState;
  setAppState: (stateUpdate: any) => void;
};

export const LaserModeToggle = ({
  appState,
  setAppState,
}: LaserModeToggleProps) => {
  // Safe-guard to ensure it only renders if the tool state is accurate
  if (appState.activeTool?.type !== "laser") {
    return null;
  }

  const isPersistent = appState.laserMode === "persistent";

  const handleToggle = () => {
    setAppState({
      laserMode: isPersistent ? "temporary" : "persistent",
    });
  };

  return (
    <div 
      className="laser-mode-toggle-container"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0.5rem 1rem",
        backgroundColor: "var(--island-bg-color, #ffffff)",
        borderRadius: "var(--border-radius-lg, 8px)",
        boxShadow: "var(--shadow-island, 0 1px 4px rgba(0,0,0,0.15))",
        border: "1px solid var(--color-gray-20, #e9ecef)",
        fontSize: "0.875rem",
        color: "var(--text-primary-color, #333333)",
      }}
    >
      <label 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          cursor: "pointer",
          gap: "0.5rem",
          margin: 0
        }}
      >
        <input
          type="checkbox"
          checked={isPersistent}
          onChange={handleToggle}
          style={{
            cursor: "pointer",
            width: "16px",
            height: "16px",
            accentColor: "var(--color-primary, #6965db)"
          }}
          aria-label="Toggle Persistent Laser Mode"
        />
        <span style={{ fontWeight: 500, whiteSpace: "nowrap" }}>
          Persistent Laser Trail
        </span>
      </label>
    </div>
  );
};
