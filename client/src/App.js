import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Theme
//need to initialize or will cause error
import { DEFAULT_THEME } from "./themes";
import { applyTheme } from "./themes/utils";

//Theme Change Slice
import { useSelector, useDispatch } from "react-redux";
import { selectTheme } from "./features/changeThemeButton/changeThemeSlice";

//Components
import LandingPage from "./features/Page_landing/LandingPage";
import LoginPage from "./features/Page_login/LoginPage";
import HelpPage from "./features/Page_help/HelpPage";
import SettingPage from "./features/Page_Setting/SettingPage";
import ActivateUserPage from "./features/Page_ActivateUser/ActivateUserPage";
import ActiveTimerPage from "./features/Page_ActiveTimer/ActiveTimerPage";
import EditPage from "./features/Page_Edit/EditPage";
import CreatePage from "./features/Page_create/CreatePage";

//CSS
import "./App.css";

function App() {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            return <LandingPage></LandingPage>;
          }}
        ></Route>
        <Route
          exact
          path="/help"
          component={() => {
            return <HelpPage></HelpPage>;
          }}
        ></Route>
        <Route
          exact
          path="/setting"
          component={() => {
            return <SettingPage></SettingPage>;
          }}
        ></Route>
        <Route
          exact
          path="/login"
          component={() => {
            return <LoginPage></LoginPage>;
          }}
        ></Route>
        <Route
          exact
          path="/activate/:token"
          component={() => {
            return <ActivateUserPage></ActivateUserPage>;
          }}
        ></Route>
        <Route
          exact
          path="/activeTimer/"
          component={() => {
            return <ActiveTimerPage></ActiveTimerPage>;
          }}
        ></Route>
        <Route
          exact
          path="/editTimer/"
          component={() => {
            return <EditPage></EditPage>;
          }}
        ></Route>
        <Route
          exact
          path="/createTimer/"
          component={() => {
            return <CreatePage></CreatePage>;
          }}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
