import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

/**
 * This function is used for rendering the login page.
 * @param {*} param0 setTOken function
 * @returns the login page
 */
export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem(
          "userData",
          JSON.stringify(response.data.result)
        );

        console.log(response.data.token);

        setToken(response.data.token);
        history.push("/planner");
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  }

  function forgotPwd() {
    history.push("/forgotpwd");
  }

  function register() {
    history.push("/register");
  }

  return (
    <div className="login_container">
      <h1 className="head1"> Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Email:</label>
          <input
            type="text"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label>Password:</label>
          <input
            className="pass"
            type="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" className="btn2 btn2-block" />
        <div className="span2">
          <span class="psw">
            <a href="#" onClick={forgotPwd}>
              <b>
                <u> Forgot password?</u>
              </b>
            </a>
          </span>
          <span class="psw">
            <text /> Or{" "}
            <a href="#" onClick={register}>
              <b>
                <u>Create account</u>
              </b>
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
