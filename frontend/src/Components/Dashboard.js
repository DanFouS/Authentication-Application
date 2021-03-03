import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../Context/authContext";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${currentUser.uid}`)
      .then((res) => {
        console.log("JUST WORK", res.data);

        setName(res.data.name);
        setBio(res.data.bio);
        setphoneNumber(res.data.phoneNumber);
        setImage(res.data.image);
      })
      .catch((err) => {
        console.error(err);
      });
  });

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
      {/* <Link to="/gallery" className="btn btn-primary w-100 mt-3">
        Gallery
      </Link> */}
      <Card>
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
          Update Profile
        </Link>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>

          {error && <Alert variant="danger"> {error} </Alert>}
          <div className="test">
            <Card.Img
              alt=""
              className="setting-image center mb-4  "
              height="300"
              width="300"
              src={image}
            />
          </div>

          <strong>Name: </strong>
          {name}
          <br />
          <strong>Bio: </strong>
          {bio}
          <br />
          <strong>Phone Number: </strong>
          {phoneNumber}
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
