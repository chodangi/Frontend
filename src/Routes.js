import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./styles/Global";
import { dark, light } from "./styles/Theme";
import MyPage from "./pages/MyPage/MyPage";
import SignIn from "./pages/SignIn/SignIn";
import UserSettings from "./pages/UserSettings/UserSettings";
import PopularBoard from "./pages/Community/PopularBoard";
import WritePost from "./pages/WritePost/WritePost";

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
            path="settings"
            element={
              <UserSettings theme={theme} darkModeHandler={setThemeMode} />
            }
            path="/"
            element={<PopularBoard theme={theme} darkModeHandler={setThemeMode} />}
          />
          <Route
            path="writePost"
            element={<WritePost theme={theme} darkModeHandler={setThemeMode} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRouter;
