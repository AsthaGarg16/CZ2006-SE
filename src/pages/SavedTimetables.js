import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { Media, Card, Button, CardBody } from "reactstrap";
import { AiOutlineDelete } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

/**
 * This function is used for rendering the saved items page.
 * @returns saved items page
 */
export default function SavedTimetables() {
  const history = useHistory();
  const location = useLocation();
  const [timetables, setTimetables] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [realSavedCourses, setRealSavedCourses] = useState([]);

  useEffect(() => {
    console.log("retrieve saved time tables");

    console.log(location);

    if (location.state) {
      console.log("state exists");
    }
  }, []);

  const classes = useStyles();

  const fetchUserTimetables = () => {
    const userTimetables = JSON.parse(sessionStorage.getItem("userData"))
      .timetables;
    console.log(userTimetables);
    setTimetables((prevtt) => []);
    for (let i = 0; i < userTimetables.length; i++) {
      const timetableID = userTimetables[i];

      const reqbody = { timetableID: timetableID };
      console.log(reqbody);
      axios.post("/saving/getSavedTimetable", reqbody).then((response) => {
        setTimetables((prevtt) => [...prevtt, ...response.data]);
        // }
      });
    }
  };

  useEffect(() => {
    fetchUserTimetables();
  }, []);

  useEffect(() => {
    console.log(timetables);
  }, [timetables]);

  const convertToCorrectformat = (temptt) => {
    const temporarytt = { ...temptt };
    console.log(temporarytt);

    const fixedTimeSlots = temporarytt.fixedTimeSlots.map((element) =>
      element.map((timeslot) => new Date(timeslot))
    );
    const tcourseSelected = {};
    temporarytt.courseSelected.forEach((element) => {
      tcourseSelected[element.courseID] = element.indexNum;
    });
    const courseFixed = {};
    temporarytt.courseFixed.forEach((element) => {
      courseFixed[element.courseID] = element.indexNum;
    });

    temporarytt.courseSelected = tcourseSelected;
    temporarytt.courseFixed = courseFixed;
    temporarytt.fixedTimeSlots = fixedTimeSlots;
    return temporarytt;
  };

  const editeddummy = (tempTT) => {
    const temporaryTT = [...tempTT];
    return temporaryTT.map((item) => {
      console.log(item);
      const fixedTimeSlots = item.fixedTimeSlots.map((element) =>
        element.map((timeslot) => new Date(timeslot))
      );
      const tcourseSelected = {};
      item.courseSelected.forEach((element) => {
        tcourseSelected[element.courseID] = element.indexNum;
      });
      const courseFixed = {};
      item.courseFixed.forEach((element) => {
        courseFixed[element.courseID] = element.indexNum;
      });

      item.courseSelected = tcourseSelected;
      item.courseFixed = courseFixed;
      item.fixedTimeSlots = fixedTimeSlots;
      return item;
    });
  };

  const redirectToPlan = () => {
    console.log("halo");
  };

  const fetchSavedCourses = () => {
    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;

    const reqbody = { email: userEmail };

    axios.post("/saveCourse/getSavedCourses", reqbody).then((response) => {
      if (response.data[0]) {
        setSavedCourses(response.data[0].savedCourse);
      }
    });
  };

  useEffect(() => {
    fetchSavedCourses();
  }, []);

  useEffect(() => {
    console.log("set real saved courses");
    if (savedCourses.length !== 0) {
      setRealSavedCourses((prevCourses) => []);
      savedCourses.forEach((courseCode, idx) => {
        axios
          .post("/discuss/course", { courseCode: courseCode })
          .then((response) => {
            setRealSavedCourses((prevCourses) => [
              ...prevCourses,
              response.data,
            ]);
          })
          .catch(function (error) {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
      });
    } else {
      setRealSavedCourses((prevCourses) => []);
    }
  }, [savedCourses]);

  const removeSavedCourse = (courseCode) => {
    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;

    const reqbody = { userEmail: userEmail, savedCourse: courseCode };
    axios
      .patch("/saveCourse/removeSavedCourses", reqbody)
      .then((response) => {
        console.log(response.data);
        fetchSavedCourses();
      })
      .catch(function (error) {
        if (error.response) {
        }
      });
  };

  const removeSavedTimetable = (timetableID) => {
    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;
    const reqbody = { userEmail: userEmail, timetableID: timetableID };
    axios.patch("/saving/removeSavedTimetable", reqbody).then((response) => {
      console.log(response);
    });
    const tempuserdata = JSON.parse(sessionStorage.getItem("userData"));
    tempuserdata.timetables = JSON.parse(
      sessionStorage.getItem("userData")
    ).timetables.filter((id) => id !== parseInt(timetableID));
    sessionStorage.setItem("userData", JSON.stringify(tempuserdata));
    fetchUserTimetables();
  };
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="background">
      <div className="empty-space"></div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-1"></div>
          <div className="col-10">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead className="table-header">
                  <TableRow>
                    <TableCell>
                      <b>Saved TimeTable</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timetables.map((item) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Link
                          to={{
                            pathname: location.state
                              ? "/findcommon"
                              : "/planner",
                            state: convertToCorrectformat(item),
                          }}
                        >
                          <h5>
                            {"Created on " +
                              new Date(
                                parseInt(item.timetableID)
                              ).toLocaleDateString(undefined, options) +
                              " " +
                              new Date(
                                parseInt(item.timetableID)
                              ).toLocaleTimeString()}
                          </h5>

                          <tr>
                            {item.courseSelected.map((element) => (
                              <>
                                <td style={{ paddingRight: 5 }}>
                                  {element.courseID + ": "}
                                </td>
                                <td style={{ paddingRight: 15 }}>
                                  {element.indexNum}
                                </td>
                              </>
                            ))}
                          </tr>
                        </Link>
                        <Button
                          outline
                          className="discuss-detail-save-button"
                          onClick={() =>
                            removeSavedTimetable(parseInt(item.timetableID))
                          }
                        >
                          <span style={{ color: "black" }}>
                            <AiOutlineDelete />
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row mt-5">
          <div className="col-1"></div>
          <div className="col-10">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead className="table-header">
                  <TableRow>
                    <TableCell>
                      <b>Saved Course</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {realSavedCourses.map((course) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Link
                          to={`/discuss/${course.courseCode}`}
                          style={{ width: "600px" }}
                        >
                          <div className="col-12 home-paragraph">
                            <Media heading>
                              <b>{course.courseCode}</b>
                            </Media>
                            <Media heading>{course.courseInfo[0][1]}</Media>
                            <p>
                              {course.courseInfo[course.courseInfo.length - 1]}
                            </p>
                          </div>
                          <div className="float-to-right"></div>
                        </Link>
                        <Button
                          outline
                          className="discuss-detail-save-button"
                          onClick={() => removeSavedCourse(course.courseCode)}
                        >
                          <span style={{ color: "black" }}>
                            <AiOutlineDelete />
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
      <div className="empty-space"></div>
    </div>
  );
}
