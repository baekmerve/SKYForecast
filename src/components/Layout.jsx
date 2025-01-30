/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Header from "./Header";
import { useTheme } from "@/context/theme-provider";

// Background images for light and dark modes
const lightBgImage = "url(/light.jpg)";
const darkBgImage = "url(/dark.jpg)";

const Layout = ({ children }) => {
  const { theme } = useTheme(); // Get current theme from context

  // Set background image based on the current theme
  const backgroundStyle = {
    backgroundImage: theme === "dark" ? darkBgImage : lightBgImage,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Full viewport height
    filter: "blur(5px)", // Apply blur effect to background image
    position: "absolute", // Make background take the full space
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Ensure background stays behind content
  };

  return (
    <div className="relative ">
      {/* Background image with blur effect */}
      <div style={backgroundStyle}></div>
      <div className="relative z-10">
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
