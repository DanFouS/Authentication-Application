import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../Context/authContext";
import { Link, useHistory } from "react-router-dom";
import {
  facebookProvider,
  githubProvider,
  googleProvider,
} from "./service/authMethods";
import socialMedia from "./service/auth";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
 
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
  const HandleOnClick = async (provider) => {
    const res = await socialMedia(provider);
    history.push("/");
    console.log(res);
  };

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
              <div>
                <h6 className="text-center mt-3">Login With Social Media :</h6>
                <div className="w-100 text text-center mt-3 ">
                  <Button
                    disabled={loading}
                    className="btn btn-secondary w-100 mb-3  mt-1"
                    onClick={() => HandleOnClick(facebookProvider)}
                  >
                    <FaFacebook /> Facebook
                  </Button>
                  <Button
                    disabled={loading}
                    className="btn btn-secondary w-100 mb-3 mt-1"
                    onClick={() => HandleOnClick(googleProvider)}
                  >
                    <FaGoogle /> Google
                  </Button>
                  <Button
                    disabled={loading}
                    className="btn btn-secondary w-100 mb-3  mt-1"
                    onClick={() => HandleOnClick(githubProvider)}
                  >
                    <FaGithub /> Github
                  </Button>
                </div>
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
