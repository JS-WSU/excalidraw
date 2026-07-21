import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Excalidraw } from "../index"; 

describe("Laser Pointer Tool", () => {
  it("should select the laser pointer tool and toggle persistence", async () => {
    // 1. Render Excalidraw with all required activeTool properties
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

    // 2. Because the tool is active, the popup will automatically mount.
    // Wait for the asynchronous render of the DOM elements.
    const persistenceToggle = await screen.findByLabelText("Toggle Persistent Laser Mode");
    expect(persistenceToggle).toBeInTheDocument();
    
    // 3. Verify the default state is temporary (unchecked)
    expect(persistenceToggle).not.toBeChecked();

    // 4. Toggle the persistent mode on
    fireEvent.click(persistenceToggle);
    expect(persistenceToggle).toBeChecked();
  });
});
