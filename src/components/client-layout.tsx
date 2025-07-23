"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <>
      {!isHome && <Navbar />}
      {children}
    </>
  );
}
