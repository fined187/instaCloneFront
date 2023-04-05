/* eslint-disable */
import { useReactiveVar } from "@apollo/client";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import routes from "./screens/Routes";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? (
                <Home />
                ) : (
                <Login />
                )}
              </Route>
              
                {!isLoggedIn ? (
                  <Route path={routes.SignUp}>
                    <SignUp />
                  </Route>
                ): null}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;