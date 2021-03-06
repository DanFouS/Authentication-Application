import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../Context/authContext";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const nameRef = useRef();
  const bioRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");

  const [image, setImage] = useState("");

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function changeName(e) {
    setName(e.target.value);
  }
  function changeBio(e) {
    setBio(e.target.value);
  }
  function changePhoneNumber(e) {
    setphoneNumber(e.target.value);
  }

  function updateInfo(e) {
    e.preventDefault();
    console.log("tiraaaaaaaaaaaaaaaaaa", { name, bio, phoneNumber });
    axios.post("http://localhost:8000/createInfo", {
      name: name,
      bio: bio,
      phoneNumber: phoneNumber,
      uid: currentUser.uid,
      image: image,
    });
    history.push("/");
  }

  function deleteProfile(e) {
    e.preventDefault();
    axios.delete("http://localhost:8000/deleteProfile/:uid");
    history.push("/login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const uploadImage = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "safasafa");
    formData.append("file", files);
    setLoading(true);
    axios
      .post("https://api.cloudinary.com/v1_1/dvfjc4vsu/image/upload", formData)
      .then((res) => {
        setImage(res.data.secure_url);
        console.log("image", image);
      })
      .then(setLoading(false))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center ">Update Profile</h2>
          {error && <Alert variant="danger"> {error} </Alert>}

          <div>
            <div
              id="ntba"
              className="file btn btn-primary w-100 text text-center "
            >
              <div id="brr">update profile picture</div>
              <input name="file" type="file" onChange={uploadImage} />
            </div>
            {loading ? (
              <h1>Loading</h1>
            ) : (
              <img
                alt=""
                className="w-100 text text-center mt-2"
                height="150"
                width="150"
                src={image}
              />
            )}
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={changeName}
                type="text"
                ref={nameRef}
                defaultValue={currentUser.name}
                placeholder="Your Name"
              ></Form.Control>
            </Form.Group>

            <Form.Group id="bio">
              <Form.Label>bio</Form.Label>
              <Form.Control
                onChange={changeBio}
                type="text"
                ref={bioRef}
                defaultValue={currentUser.bio}
                placeholder="Add a bio"
              ></Form.Control>
            </Form.Group>

            <Form.Group id="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={changePhoneNumber}
                type="number"
                ref={phoneNumberRef}
                defaultValue={currentUser.phoneNumber}
                placeholder="+44 444 444 444"
              ></Form.Control>
            </Form.Group>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
                placeholder="Example@email.com"
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep it the same"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep it the same"
              ></Form.Control>
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              onClick={updateInfo}
            >
              Update
            </Button>
            <Button
              disabled={loading}
              className="btn btn-secondary w-100 mt-2"
              type="submit"
              onClick={deleteProfile}
            >
              Delete Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
