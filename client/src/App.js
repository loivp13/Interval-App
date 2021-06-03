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
import HelpPage from "./features/Page_help/HelpPage";
import ActivateAccount from "./features/activateAccount/ActivateAccount.js";

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
        <Route path="/activate/:token" component={ActivateAccount}></Route>
      </Switch>
    </Router>
  );
}

export default App;
