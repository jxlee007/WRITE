"use client";
import React from "react";

export default function HeroContent() {
  return (
    <div className="hero-content absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center space-y-4">
        {/* This component can be used for additional interactive elements if needed */}
        {/* Main content is now handled in the Astro page for better SEO and performance */}
      </div>
    </div>
  );
}
