import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import { SentimentVerySatisfiedTwoTone } from "@material-ui/icons";
import axios from "axios";

export default function Register({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [cos, setCos] = useState(""); //course of study
  const [yos, setYos] = useState(""); //year of study
  const history = useHistory();

  function validateForm() {
    return (
      email.length > 0 &&
      username.length > 0 &&
      password.length > 0 &&
      cos.length > 0 &&
      yos.length > 0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (password.length < 6) {
      alert(
        "The password must contain at least 6 characters. Please try again."
      );
    } else if (password !== cpassword) {
      alert("Password doesn't match!");
    } else {
      const reqbody = {
        email: email,
        name: username,
        password: password,
        courseOfStudy: cos,
        yearOfStudy: yos,
      };
      console.log(reqbody);
      axios
        .post("/user/register", reqbody)
        .then((response) => {
          console.log(response.data);
          setToken(response.data.token);
          alert("Your account is registered successfully!");
          sessionStorage.setItem(
            "userData",
            JSON.stringify({ timetables: [] })
          );
          history.push("/login");
          // console.log(response.data.token);
          // setToken(response.data.token);
          // history.push("/planner");
        })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <br />
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <br />
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="cos">
          <Form.Label>Course of study</Form.Label>
          <br />
          <Form.Control
            type="text"
            value={cos}
            onChange={(e) => setCos(e.target.value)}
            placeholder="Enter Course of study"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="yos">
          <Form.Label>Year of study (number)</Form.Label>
          <br />
          <Form.Control
            type="number"
            value={yos}
            onChange={(e) => setYos(e.target.value)}
            placeholder="Enter Year of study"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <br />
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <br />
          <Form.Control
            type="password"
            value={cpassword}
            onChange={(e) => setcPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
          onclick={handleSubmit}
        >
          <span>Register</span>
        </Button>
      </Form>
    </div>
  );
}
