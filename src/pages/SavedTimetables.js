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
    // console.log(history);
    console.log(location);

    if (location.state) {
      console.log("state exists");
    }
  }, []);

  const classes = useStyles();

  useEffect(() => {
    // const timetableID = JSON.parse(sessionStorage.getItem("userData"))
    //   .timetables[0];
    const userTimetables = JSON.parse(
      sessionStorage.getItem("userData")
    ).timetables.map((item) => item.toString());
    console.log(userTimetables);
    const tempTimetables = [];

    for (let i = 0; i < userTimetables.length; i++) {
      const timetableID = userTimetables[i];

      const reqbody = { timetableID: timetableID };
      // console.log(reqbody);
      axios.post("/saving/getSavedTimetable", reqbody).then((response) => {
        // console.log(response.data);
        // console.log(response.data);
        tempTimetables.push(...response.data);
        // console.log(tempTimetables);
        // console.log(i);
        if (i === userTimetables.length - 1) {
          setTimetables(editeddummy(tempTimetables));
        }
      });
    }
    // console.log(tempTimetables);
  }, []);

  useEffect(() => {
    // console.log("wht");
    // console.log(timetables);
    // console.log("wht");
  }, [timetables]);

  // const editeddummy = dummy.map((item) => {
  //   const courseSelected = {};
  //   item.courseSelected.forEach((element) => {
  //     courseSelected[element.courseID] = element.indexNum;
  //   });
  //   const courseFixed = {};
  //   item.courseFixed.forEach((element) => {
  //     courseFixed[element.courseID] = element.indexNum;
  //   });

  //   item.courseSelected = courseSelected;
  //   item.courseFixed = courseFixed;
  //   return item;
  // });

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
      // console.log(response);
      // setSavedCourses(response.data[0] ? response.data[0].savedCourse : []);
      if (response.data[0]) {
        // console.log("fetch course");
        // console.log(response.data[0].savedCourse);
        setSavedCourses(response.data[0].savedCourse);
      }
    });
  }, []);

  //   response.data[0].savedCourse.forEach((courseCode, idx) => {
  //     // console.log(idx);

  //     axios
  //       .post("/discuss/course", { courseCode: courseCode })
  //       .then((response2) => {
  //         // console.log(response2);
  //         tempRealSaveCourses.push(response2.data);
  //         // console.log(tempRealSaveCourses);
  //         if (idx === response.data[0].savedCourse.length - 1) {
  //           // console.log("debug");
  //           console.log(idx);
  //           // console.log(tempRealSaveCourses);
  //           // console.log("debug");
  //           setSavedCourses(tempRealSaveCourses);
  //         }
  //       })
  //       .catch(function (error) {
  //         if (error.response2) {
  //           alert(error.response2.data.message);
  //         }
  //       });
  //   });
  // }

  // console.log();

  useEffect(() => {
    if (savedCourses.length !== 0) {
      // console.log("length" + savedCourses.length);
      // const tempRealSaveCourses = [];
      savedCourses.forEach((courseCode, idx) => {
        // console.log(idx);

        axios
          .post("/discuss/course", { courseCode: courseCode })
          .then((response) => {
            // console.log(response);
            setRealSavedCourses((prevCourses) => [
              ...prevCourses,
              response.data,
            ]);
            // tempRealSaveCourses.push(response.data);
            // console.log(tempRealSaveCourses);
            // if (idx === savedCourses.length - 1) {
            //   setRealSavedCourses(tempRealSaveCourses);
            // }
          })
          .catch(function (error) {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
      });
    }
  }, [savedCourses]);

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
      {/* <div className="row">Saved Courses</div>
      <div className="row">
        {savedCourses.map((item) => (
          <div className="col-4">
            <Button onClick={() => alert(item)}></Button>
            <Link to={"/discuss/" + item}>
              <Paper
                elevation={5}
                style={{ height: "200px", wordWrap: "break-word" }}
              >
                <h5>{item}</h5>
              </Paper>
            </Link>
          </div>
        ))}
      </div> */}
      {/* {savedCourses.map((course) => (
        // <CourseCard course={course} />
        <div>{course}</div>
      ))} */}
      {/* {savedCourses.map((item) => (
        <div>item.courseCode</div>
      ))} */}
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
                  {/* {CourseCard(course)} */}
                  <CourseCard course={course} />
                  {/* <Link to={"/discuss/" + item}>{item}</Link> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
