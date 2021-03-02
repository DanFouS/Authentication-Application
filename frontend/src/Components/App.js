import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { AuthProvider } from "../Context/authContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Singup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PricvateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme";

function App() {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const StyledApp = styled.div`
    font-color: ${(props) => props.theme.fontColor};
  `;

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Router>
              <AuthProvider>
                <Button
                  className=" w-100 text text-center mt-4"
                  onClick={() => themeToggler()}
                >
                  Change Theme
                </Button>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute
                    path="/update-profile"
                    component={UpdateProfile}
                  />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </Switch>
              </AuthProvider>
            </Router>
          </div>
        </Container>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
