import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Planner from "./pages/PlanTimetable";
import Discuss from "./pages/DiscussionForum";
import DiscussionDetail from "./pages/DiscussionDetail";
import Login from "./pages/Login";
import Common from "./pages/FindCommon";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import { AppContextProvider, useApp } from "./context/AppContextProvider";
import SavedTimetables from "./pages/SavedTimetables";
import axios from "axios";

/**
 * This function uses the context created by the AppContexttProvider.
 * The context contains the states which serve as variables that can be changed throughout a session
 * The context also contains functions that can be used to change the states.
 * @returns
 */
function AppContextConsumer() {
  const appContext = useApp();
  const setToken = appContext.setToken;

  function fetchAllCourse() {
    axios
      .get("/sendCourseList/getCourseList", {})
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("discuss", JSON.stringify(response.data));
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  }

  function fetchAllCourseTimes() {
    axios
      .get("/sendAllCourses/getAllCourses", {})
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  }

  useEffect(() => {
    console.log(
      "FETCHING all courses for discussion forum and course schedules"
    );
    fetchAllCourse();
    fetchAllCourseTimes();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/login"
            component={() => <Login setToken={setToken} />}
          />
          <Route exact path="/discuss" component={() => <Discuss />} />
          <Route path="/discuss/:courseCode" component={DiscussionDetail} />
          <Route path="/findcommon" component={Common} />
          <Route path="/planner" component={Planner} />
          {/* <Route path="/share" component={Share} /> */}
          <Route path="/forgotpwd" component={ForgotPassword} />
          <Route
            path="/register"
            component={() => <Register setToken={setToken} />}
          />
          <Route path="/savedtimetables" component={SavedTimetables} />
          <Route path="/profile" component={Profile} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default function App() {
  return (
    <AppContextProvider>
      <AppContextConsumer />
    </AppContextProvider>
  );
}
