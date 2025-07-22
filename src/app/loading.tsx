"use client";

import { Globe } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <Globe className="h-12 w-12 mx-auto animate-spin text-primary" />
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Loading World Bank Data</h2>
        <p className="text-muted-foreground">
          Fetching the latest economic insights...
        </p>
      </div>
    </div>
  );
}
