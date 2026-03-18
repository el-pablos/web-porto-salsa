import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Contact } from "@/components/Contact";

describe("Contact", () => {
  it("renders section title", () => {
    render(<Contact />);
    expect(screen.getByText("Ayo")).toBeInTheDocument();
    expect(screen.getByText("Terhubung")).toBeInTheDocument();
  });

  it("renders contact info labels", () => {
    render(<Contact />);
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("Lokasi")).toBeInTheDocument();
  });

  it("does not render email address", () => {
    render(<Contact />);
    expect(screen.queryByText("adndaaryadi@gmail.com")).not.toBeInTheDocument();
  });

  it("renders contact form fields", () => {
    render(<Contact />);
    expect(screen.getByText("Nama Kamu")).toBeInTheDocument();
    expect(screen.getByText("Pesan")).toBeInTheDocument();
    expect(screen.getByText("Kirim Pesan via Email")).toBeInTheDocument();
  });

  it("renders form inputs with placeholders", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
  });
});
