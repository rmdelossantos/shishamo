import React, { FC } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  isNavbarDark?: boolean;
  isHome?: boolean;
};

const Navbar: FC<NavbarProps> = ({ isNavbarDark = false, isHome = false }) => {
  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        isNavbarDark ? "bg-transparent text-black" : "bg-background text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            <span className="font-semibold text-lg">World Bank Explorer</span>
          </Link>
        </div>
        {isHome && (
          <div className="hidden md:flex items-center gap-6">
            <Link href="/countries">
              <Button
                size="sm"
                className={`text-base px-4 transition-colors ${
                  isNavbarDark
                    ? "bg-white/20 backdrop-blur-md border border-white/30 text-black hover:bg-white/30"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                Get started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
