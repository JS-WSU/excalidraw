import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Excalidraw } from "../components/Excalidraw";

describe("Laser Pointer Tool", () => {
  it("should select the laser pointer tool and toggle persistence", async () => {
    render(<Excalidraw />);

    // 1. Locate and click the laser pointer tool in the toolbar
    const laserButton = screen.getByTestId("toolbar-LaserPointer");
    fireEvent.click(laserButton);

    // Verify the tool is selected
    expect(laserButton).toHaveClass("ToolIcon_type_radio--checked");

    // 2. The persistence toggle should now be rendered in the popover
    const persistenceToggle = screen.getByLabelText("Toggle Persistent Laser Mode");
    expect(persistenceToggle).toBeInTheDocument();
    
    // Verify default state (temporary)
    expect(persistenceToggle).not.toBeChecked();

    // 3. Toggle the persistent mode on
    fireEvent.click(persistenceToggle);
    expect(persistenceToggle).toBeChecked();

    // 4. Deselect the laser tool (e.g., click the Selection tool)
    const selectionButton = screen.getByTestId("toolbar-selection");
    fireEvent.click(selectionButton);

    // Verify the popover completely unmounts/closes when tool is inactive
    expect(screen.queryByLabelText("Toggle Persistent Laser Mode")).not.toBeInTheDocument();
  });
});
