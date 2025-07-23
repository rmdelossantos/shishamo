import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <span className="font-semibold text-lg">World Bank Explorer</span>
        </Link>
      </div>
    </nav>
  );
}
