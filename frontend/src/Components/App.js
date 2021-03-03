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
// import Gallery from "./Gallery/Gallery";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <AuthProvider>
          <Container
            className=" d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Router>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute
                    path="/update-profile"
                    component={UpdateProfile}
                  />
                  {/* <Route path="/gallery" component={Gallery} /> */}

                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </Switch>
                <Button
                  className="btn btn-secondary"
                  onClick={() => themeToggler()}
                >
                  Change theme{" "}
                </Button>
              </Router>
            </div>
          </Container>
        </AuthProvider>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
