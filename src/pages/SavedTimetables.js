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
import { Button } from "reactstrap";
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

  useEffect(() => {
    console.log("retrieve saved time tables");
    // console.log(history);
    console.log(location);

    if (location.state) {
      console.log("state exists");
    }
  }, []);

  const classes = useStyles();

  const dummy = [
    {
      timetableID: "1617868015223",
      courseSelected: [
        {
          courseID: "AAA08B",
          indexNum: "39676",
        },
        {
          courseID: "AAA18G",
          indexNum: "39652",
        },
        {
          courseID: "AAA28J",
          indexNum: "39682",
        },
      ],
      fixedTimeSlots: [],
      courseFixed: [
        {
          courseID: "AAA18G",
          indexNum: "39652",
        },
      ],
      courseClashAllowed: [],
    },
    {
      timetableID: "1617869004855",
      courseSelected: [
        {
          courseID: "CZ1007",
          indexNum: 10059,
        },
        {
          courseID: "AAA08B",
          indexNum: "",
        },
        {
          courseID: "CZ1103",
          indexNum: "10064",
        },
      ],
      fixedTimeSlots: [
        [
          new Date("2021-03-02T01:45:00.000Z"),
          new Date("2021-03-02T02:45:00.000Z"),
        ],
        [
          new Date("2021-03-05T03:45:00.000Z"),
          new Date("2021-03-05T04:45:00.000Z"),
        ],
      ],
      courseFixed: [
        {
          courseID: "CZ1103",
          indexNum: "10064",
        },
      ],
      courseClashAllowed: ["AAA08B"],
    },
    {
      fixedTimeSlots: [
        ["2021-03-02T03:30:00.000Z", "2021-03-02T04:30:00.000Z"],
        ["2021-03-04T03:30:00.000Z", "2021-03-04T04:30:00.000Z"],
      ],
      courseClashAllowed: ["AAA08B"],
      _id: "6071b4bd74638e4afccbd220",
      timetableID: "1618064573576",
      courseSelected: [
        {
          courseID: "AAA08B",
          indexNum: "39677",
        },
        {
          courseID: "CZ1103",
          indexNum: "10063",
        },
      ],
      courseFixed: [
        {
          courseID: "AAA08B",
          indexNum: "39677",
        },
      ],
      __v: 0,
    },
    // {
    //   timetableID: "1617704070595",
    //   courseSelected: {
    //     AAA08B: "39676",
    //   },
    //   fixedTimeSlots: [
    //     [
    //       new Date("2021-03-03T01:15:00.000Z"),
    //       new Date("2021-03-03T02:15:00.000Z"),
    //     ],
    //   ],
    //   courseFixed: {},
    //   courseClashAllowed: [],
    // },
    // {
    //   timetableID: "1617776472165",
    //   courseSelected: {
    //     CZ1016: "10061",
    //     AAA18G: "39652",
    //   },
    //   fixedTimeSlots: [
    //     [
    //       new Date("2021-03-03T03:45:00.000Z"),
    //       new Date("2021-03-03T04:45:00.000Z"),
    //     ],
    //   ],
    //   courseFixed: {
    //     AAA18G: "39652",
    //   },
    //   courseClashAllowed: ["CZ1016"],
    // },
  ];

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
    console.log(timetables);
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

  const editeddummy = (tempTT) =>
    tempTT.map((item) => {
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

  const redirectToPlan = () => {
    console.log("halo");
  };

  useEffect(() => {
    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;

    const reqbody = { email: userEmail };

    axios.post("/saveCourse/getSavedCourses", reqbody).then((response) => {
      console.log(response);
      setSavedCourses(response.data[0] ? response.data[0].savedCourse : []);
      // console.log();
    });
  }, []);

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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Saved Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedCourses.map((item) => (
              <TableRow key={item}>
                <TableCell component="th" scope="row">
                  <Link to={"/discuss/" + item}>{item}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
