import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../Context/authContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Singup";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/signup" component={Signup} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
