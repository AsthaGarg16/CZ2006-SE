import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LeakAddTwoTone, LiveTvTwoTone } from "@material-ui/icons";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [correctVerificationCode, setCorrectVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [currentform, setcurrentform] = useState(0);

  function validatePassword() {
    return password.length > 0;
  }
  function validateEmail() {
    return email.length > 0;
  }
  function validateVerificationCode() {
    return verificationCode.length > 0;
  }

  // const switchForm = {
  //   0: { function: validateEmail, text: "Send verification code" },
  //   1: { function: validateVerificationCode, text: "Submit verification code" },
  //   2: { function: validatePassword, text: "Reset password" },
  // };
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    let reqbody;
    switch (currentform) {
      case 0:
        reqbody = {
          email: email,
        };
        console.log(reqbody);
        axios
          .post("/user/forgotPassword/sendCode", reqbody)
          .then((response) => {
            console.log(response.data);
            // console.log(response.data.token);
            // setToken(response.data.token);
            // history.push("/planner");
            setCorrectVerificationCode(response.data.code);
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data.message);
            }
          });
        setcurrentform(1);
        break;
      case 1:
        if (verificationCode !== correctVerificationCode) {
          alert("Wrong code");
        } else {
          console.log(reqbody);
          setcurrentform(2);
        }

        break;
      case 2:
        reqbody = {
          email: email,
          password: password,
        };
        axios
          .post("/user/forgotPassword/reset", reqbody)
          .then((response) => {
            console.log(response.data);
            alert(response.data.message);
            history.push("/login");
            // console.log(response.data.token);
            // setToken(response.data.token);
            // history.push("/planner");
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data.message);
            }
          });
        break;
      default:
        break;
    }

    // alert(JSON.stringify(reqbody));
  }

  switch (currentform) {
    case 0:
      return (
        <div>
          <h4>Forgot password</h4>
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

            <Button
              block
              size="lg"
              type="submit"
              disabled={!validateEmail()}
              onclick={handleSubmit}
            >
              <span>Send code</span>
            </Button>
          </Form>
        </div>
      );
      break;
    case 1:
      return (
        <div>
          <h4>Forgot password</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="username">
              <Form.Label>Verification Code</Form.Label>
              <br />
              <Form.Control
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
              />
            </Form.Group>

            <Button
              block
              size="lg"
              type="submit"
              disabled={!validateVerificationCode()}
              onclick={handleSubmit}
            >
              <span>Verify code</span>
            </Button>
          </Form>
        </div>
      );
      break;
    case 2:
      return (
        <div>
          <h4>Forgot password</h4>
          <Form onSubmit={handleSubmit}>
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
              disabled={!validatePassword()}
              onclick={handleSubmit}
            >
              <span>Reset password</span>
            </Button>
          </Form>
        </div>
      );
      break;

    default:
      break;
  }
}

export default ForgotPassword;
