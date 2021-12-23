import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./styles/Global";
import { dark, light } from "./styles/Theme";
import MyPage from "./pages/MyPage/MyPage";
import SignIn from "./pages/SignIn/SignIn";
import PopularBoard from "./pages/Community/PopularBoard";

const AppRouter = () => {
  const currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "dark";
  const [themeMode, setThemeMode] = useState(currentTheme);
  const theme = themeMode === "dark" ? dark : light;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            path="myPage"
            element={<MyPage theme={theme} darkModeHandler={setThemeMode} />}
          />
          <Route
            path="signIn"
            element={<SignIn theme={theme} darkModeHandler={setThemeMode} />}
          />
          <Route
            path="/"
            element={<PopularBoard theme={theme} darkModeHandler={setThemeMode} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRouter;
