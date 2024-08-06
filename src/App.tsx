import { ThemeProvider } from "@/components/theme-provider";

import { Home } from "./components/home/home";
import { GlobalContextProvider } from "./contexts/global-context";

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GlobalContextProvider>
        <Home />
      </GlobalContextProvider>
    </ThemeProvider>
  );
}

export default App;
