"use client";

import React from "react";

// Light mode only — ThemeProvider is a simple passthrough wrapper
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
