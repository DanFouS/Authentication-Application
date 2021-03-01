import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../Context/authContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <Card>
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
          Update Profile
        </Link>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>

          {error && <Alert variant="danger"> {error} </Alert>}
          <strong>Name: </strong>
          {currentUser.name}
          <br />
          <strong>Bio: </strong>
          {currentUser.name}
          <br />
          <strong>Phone Number: </strong>
          {currentUser.name}
          <br />
          <strong>Email: </strong>
          {currentUser.email}
        </Card.Body>
      </Card>
      <div className="w-100 text text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
}
