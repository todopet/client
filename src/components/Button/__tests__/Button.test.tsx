import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/Button";

describe("Button Component", () => {
  it("should render with text", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Click" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply custom className", () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByRole("button", { name: "Button" });

    expect(button.className).toContain("custom-class");
  });
});
