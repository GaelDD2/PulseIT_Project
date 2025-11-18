import React from "react";
import { Copyright } from "lucide-react";

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full h-18 bg-secondary/95 text-white flex items-center justify-center px-4 py-3 shadow-md">
      <div className="w-full max-w-7xl text-center">
        <div className="flex items-center justify-center gap-2">
          <Copyright className="w-4 h-4 text-primary" />
          <p className="text-md font-medium text-primary">PulseIT</p>
        </div>
        <p className="text-xs text-muted text-primary">{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}