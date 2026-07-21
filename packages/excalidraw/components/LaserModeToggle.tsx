import React from "react";
import type { AppState } from "../types";

interface LaserModeToggleProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<Partial<AppState>>>;
}

export const LaserModeToggle: React.FC<LaserModeToggleProps> = ({
  appState,
  setAppState,
}) => {
  // Only render the UI toggle if the laser tool is currently selected
  if (appState.activeTool.type !== "laser") {
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
        padding: "0.5rem",
        backgroundColor: "var(--island-bg-color, #ffffff)",
        borderRadius: "var(--border-radius-lg, 8px)",
        boxShadow: "var(--shadow-island, 0 1px 4px rgba(0,0,0,0.15))",
        fontSize: "0.875rem",
        color: "var(--text-primary-color, #333333)",
        marginTop: "0.5rem",
        pointerEvents: "auto",
      }}
    >
      <label 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          cursor: "pointer",
          gap: "0.5rem" 
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
        <span style={{ fontWeight: 500 }}>
          Persistent Laser Trail
        </span>
      </label>
    </div>
  );
};
