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
import CircularSlider from "@fseehawer/react-circular-slider";

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

  useEffect(() => {
    const userTimetables = JSON.parse(
      sessionStorage.getItem("userData")
    ).timetables.map((item) => item.toString());
    console.log(userTimetables);
    const tempTimetables = [];

    for (let i = 0; i < userTimetables.length; i++) {
      const timetableID = userTimetables[i];

      const reqbody = { timetableID: timetableID };

      axios.post("/saving/getSavedTimetable", reqbody).then((response) => {
        tempTimetables.push(...response.data);

        if (i === userTimetables.length - 1) {
          setTimetables(editeddummy(tempTimetables));
        }
      });
    }
  }, []);

  const editeddummy = (tempTT) => {
    return tempTT.map((item) => {
      // console.log(timetables);
      const fixedTimeSlots = item.fixedTimeSlots.map((element) =>
        element.map((timeslot) => new Date(timeslot))
      );
      const tcourseSelected = {};
      // console.log(item);
      // console.log(item.courseSelected);
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

  useEffect(() => {
    console.log("why");
    console.log(savedCourses);
  }, [savedCourses]);

  const CourseCard = ({ course }) => {
    return (
      <Card
        tag="li"
        key={course.id}
        // onClick={() => handleCourseSelect(course)}
        className="col-12 mt-1"
      >
        <button>delete</button>
        <CardBody>
          <Link to={`/discuss/${course.courseCode}`}>
            <div className="row">
              <Media heading className="col-8">
                <b>{course.courseCode}</b>
              </Media>
              <div className="col-3">
                <p className="row mt-2">Average Rating:</p>
              </div>
              <div className="col-1">
                <div className="row mb-1">
                  <CircularSlider
                    width={60}
                    dataIndex={
                      course.overallRating
                        ? course.overallRating.toPrecision(2)
                        : 5.0
                    }
                    label="savings"
                    hideLabelValue={true}
                    verticalOffset="0.5rem"
                    progressSize={8}
                    trackColor="#fffff"
                    progressColorFrom="#228B22"
                    progressColorTo="#39FF14"
                    trackSize={8}
                    min={0}
                    max={10}
                    knobDraggable={false}
                  />
                  <div className="rating">
                    {course.overallRating
                      ? course.overallRating.toPrecision(2)
                      : 5.0}{" "}
                  </div>
                </div>
              </div>
            </div>
            <Media heading>{course.courseInfo[0][1]}</Media>
            {/* <Media heading>{course.name}</Media> */}
            {/* <p>{course.description}</p> */}
            <p>{course.courseInfo[course.courseInfo.length - 1]}</p>
          </Link>
          {/* <Button onClick={()=>alert(typeof(course))}>Click</Button> */}
        </CardBody>
      </Card>
    );
  };

  useEffect(() => {
    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;

    const reqbody = { email: userEmail };

    axios.post("/saveCourse/getSavedCourses", reqbody).then((response) => {
      if (response.data[0]) {
        setSavedCourses(response.data[0].savedCourse);
      }
    });
  }, []);

  useEffect(() => {
    if (savedCourses.length !== 0) {
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
    }
  }, [savedCourses]);

  const removeSavedCourse = (courseCode) => {
    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;

    const reqbody = { userEmail: userEmail, savedCourse: courseCode };
    axios
      .patch("/saveCourse/removeSavedCourses", reqbody)
      .then((response) => {
        console.log(response.data);
        // alert(response.data.message);
      })
      .catch(function (error) {
        if (error.response) {
          // alert(error.response.data.message);
        }
      });
  };

  return (
    <div className="container">
      <div className="row">
        {timetables.map((item) => (
          <div className="col-4">
            <Link
              to={{
                pathname: location.state ? "/findcommon" : "/planner",
                state: item,
              }}
            >
              <Paper
                elevation={5}
                style={{ height: "200px", wordWrap: "break-word" }}
              >
                <h5>{new Date(parseInt(item.timetableID)).toString()}</h5>
                <p>{JSON.stringify(item.courseSelected)}</p>
              </Paper>
            </Link>
          </div>
        ))}
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Saved Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {realSavedCourses.map((course) => (
              <TableRow key={course.CourseCode}>
                <TableCell component="th" scope="row">
                  <CourseCard course={course} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
