// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Landing from "./pages/Landing";
import CreateStream from "./pages/CreateStream";
import RedirectAll from "./pages/RedirectAll";
import Navbar from "./components/Navbar";

function App() {
  // const [count, setCount] = useState(0);

  const { chains, provider } = configureChains(
    [polygonMumbai],
    [alchemyProvider({ apiKey: import.meta.env.ALCHEMY_ID }), publicProvider()]
  );
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/create-update-stream" element={<CreateStream />} />
              <Route path="/redirect-all-streams" element={<RedirectAll />} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
