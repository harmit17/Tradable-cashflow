// import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">
        TCF <span className="absolute-logo">TCF</span>
      </span>
      <ConnectButton />
    </div>
  );
}

export default Navbar;
