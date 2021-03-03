import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../Context/authContext";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const responseGoogle = (res) => {
  console.log(res);
};

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to Sign in");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger"> {error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="example@email.com"
                type="email"
                ref={emailRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="password"
                type="password"
                ref={passwordRef}
                required
                maxLength="15"
                minLength="10"
              ></Form.Control>

              <div className="w-100 text text-center mt-3">
                <GoogleLogin
                  clientId="136826018616-72oh0ipsqgdq46tqhb3t7jlu0b6bhpb5.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
              </div>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text text-center mt-3">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
