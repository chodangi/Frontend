import React, { useState } from "react";

import Footer from "./components/Footer";
import styled, { ThemeProvider } from "styled-components";
import { dark, light } from "./styles/Theme";

function App() {
  const [themeMode, setThemeMode] = useState("dark");
  const theme = themeMode === "dark" ? dark : light;
  return (
    <div>
      <Footer theme={theme} />
    </div>
  );
}

export default App;
