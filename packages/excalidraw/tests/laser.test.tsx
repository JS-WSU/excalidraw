import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Excalidraw } from "../index"; 

describe("Laser Pointer Tool", () => {
  it("should select the laser pointer tool and toggle persistence", async () => {
    // 1. Render Excalidraw with the laser pointer initialized as the active tool
    render(
      <Excalidraw 
        initialData={{ 
          appState: { 
            activeTool: { 
              type: "laser", 
              customType: null,
              lastActiveTool: null,
              locked: false,
              fromSelection: false
            } 
          } 
        }} 
      />
    );

    // 2. Wait for the asynchronously rendered document portal to mount
    const persistenceToggle = await screen.findByLabelText("Toggle Persistent Laser Mode");
    expect(persistenceToggle).toBeInTheDocument();
    
    // 3. Verify the default state is temporary (unchecked)
    expect(persistenceToggle).not.toBeChecked();

    // 4. Toggle the persistent mode on
    fireEvent.click(persistenceToggle);
    expect(persistenceToggle).toBeChecked();
  });
});
