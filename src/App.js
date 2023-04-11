/* eslint-disable */
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import routes from "./screens/Routes";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
            <Router>
              <Switch>
                <Route path={routes.home} exact>
                  {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
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
    </ApolloProvider>
  );
}

export default App;