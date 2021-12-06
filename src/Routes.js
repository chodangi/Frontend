import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./styles/Global";
import { dark, light } from "./styles/Theme";
import MyPage from "./pages/MyPage/MyPage";

const AppRouter = () => {
  const [themeMode, setThemeMode] = useState("dark");
  const theme = themeMode === "dark" ? dark : light;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="myPage" element={<MyPage theme={theme} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRouter;
