import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../Context/authContext";
import Singup from "./Singup";
function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Singup />
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
