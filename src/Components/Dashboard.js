import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../Context/authContext";
export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  function handleLogout() {}
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger"> {error} </Alert>}
          {/* <strong>Email:</strong> {currentUser.email} */}
          
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
