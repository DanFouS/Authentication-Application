import React, { useRef } from "react";
import { Card, Button, Form } from "react-bootstrap";

export default function Singup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfimRef = useRef();
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfimRef}
                required
              ></Form.Control>
            </Form.Group>
            <button className="w-100" type="submit">
              {" "}
              Sign Up
            </button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text text-center mt-2">
        Already Have an account? Log in
      </div>
    </>
  );
}
