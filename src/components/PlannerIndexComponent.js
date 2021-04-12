import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import MUIButton from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import CloseIcon from "@material-ui/icons/Close";
import FlagIcon from "@material-ui/icons/Flag";
import { Button } from "reactstrap";
import { usePlanTimetable } from "../context/PlanTimetableContextProvider";
import { resourcesData } from "./resources";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CourseDiv = function (props) {
  const {
    course,
    currentIdx,
    deleteElement,
    updateCurrentIdx,
    isIndexFixed,
    setIsIndexFixed,
  } = props;
  const classes = useStyles();
  const courseCode = course.courseCode;
  const indexes = course.index;

  return (
    <>
      <div className="row" style={{ color: "white" }}>
        <div className="col-4">{courseCode}</div>
        <div className="course-added-div-delete-button">
          <MUIButton
            variant="outlined"
            className={classes.button}
            startIcon={<CloseIcon id="course-div-delete-button" />}
            onClick={deleteElement}
            style={{ width: "10px", minWidth: "15px" }}
          ></MUIButton>
          <MUIButton
            variant={isIndexFixed ? "contained" : "outlined"}
            className={classes.button}
            startIcon={<FlagIcon id="course-div-flag-button" />}
            onClick={() => {
              currentIdx === undefined || Object.keys(currentIdx).length === 0
                ? alert("You cannot fix an empty index!")
                : setIsIndexFixed(!isIndexFixed);
            }}
            style={{ width: "20px", minWidth: "20px" }}
          ></MUIButton>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <FormControl className={classes.formControl} disabled={isIndexFixed}>
            <InputLabel
              htmlFor="index-native-simple"
              style={{ color: "white" }}
            >
              Index
            </InputLabel>
            <Select
              value={indexes.indexOf(currentIdx)}
              native
              onChange={updateCurrentIdx}
              className={classes.selectEmpty}
            >
              <option aria-label="None" value=""></option>
              {indexes.map((tempVar, index) => {
                return (
                  <option key={index} value={index}>
                    {tempVar.index_number}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default function ShareTimetable(props) {
  const planTimetableContext = usePlanTimetable();
  const courseDivs = planTimetableContext.courseDivs;
  const setCourseDivs = planTimetableContext.setCourseDivs;

  const combinations = planTimetableContext.combinations;
  const setCombinations = planTimetableContext.setCombinations;
  const currentTimeTablePage = planTimetableContext.currentTimeTablePage;
  const userDefinedTimeSlots = planTimetableContext.userDefinedTimeSlots;
  const occupiedTimeSlots = planTimetableContext.occupiedTimeSlots;
  const setIsPlanClicked = planTimetableContext.setIsPlanClicked;
  const allowClashCC = planTimetableContext.allowClashCC;
  const setAllowClashCC = planTimetableContext.setAllowClashCC;

  const [data, setData] = useState([]);
  const getData = () => {
    // axios
    //   .get("/sendAllCourses/getAllCourses", {})
    //   .then((response) => {
    //     // console.log(response.data);
    //     setData(response.data);
    //   })
    //   .catch(function (error) {});
    fetch("output.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);
        // sessionStorage.setItem("coursesData", JSON.stringify(myJson));
      });
  };

  useEffect(() => {
    getData();
  }, []);
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const returnTimetableByQuery = (searchParams) => {
    // console.log(searchParams);
    if (searchParams.toString() && data.length !== 0) {
      for (const [key, value] of searchParams.entries()) {
        if (key === "timetable") {
          // console.log(JSON.parse(value));
          const tempTimetable = JSON.parse(value);
          const fixedTimeSlots = tempTimetable.fixedTimeSlots.map((element) =>
            element.map((timeslot) => new Date(timeslot))
          );
          tempTimetable.fixedTimeSlots = fixedTimeSlots;
          return tempTimetable;
        }
      }
    }
  };

  useEffect(() => {
    // console.log(new URLSearchParams(location.search));
    // console.log(location);
    const tempTimetable =
      returnTimetableByQuery(searchParams) || location.state;
    console.log(tempTimetable);
    if (tempTimetable && data.length != 0) {
      // console.log("state exists");
      const selectedCourses = [];

      for (const courseCode in tempTimetable.courseSelected) {
        selectedCourses.push(
          data.find((item) => item.courseCode === courseCode)
        );
      }

      setCourseDivs(
        selectedCourses.map((item) => {
          return {
            course: item,
            currentIdx: {},
            isIndexFixed: item.courseCode in tempTimetable.courseFixed,
          };
        })
      );
      setIsPlanClicked(true);
      setCombinations([tempTimetable.courseSelected]);
    }
  }, [data]);

  // const setCombinationsByQuery = (searchParams) => {
  //   if (searchParams.toString() && data.length !== 0) {
  //     const selectedCourses = [];
  //     for (let p of searchParams.keys()) {
  //       selectedCourses.push(data.find((item) => item.courseCode === p));
  //     }

  //     // const selectedCourses = data.filter((item) =>
  //     //   searchParams.has(item.courseCode)
  //     // );

  //     setCourseDivs(
  //       selectedCourses.map((item) => {
  //         return {
  //           course: item,
  //           currentIdx: {},
  //           isIndexFixed: false,
  //         };
  //       })
  //     );

  //     const tempCombo = {};

  //     for (let p of searchParams) {
  //       tempCombo[p[0]] = p[1];
  //     }
  //     setIsPlanClicked(true);
  //     setCombinations([tempCombo]);
  //   }
  // };
  // useEffect(() => {
  //   setTimetableByQuery(searchParams);
  // }, [data]);

  //Backend: this method will retrieve all course indexes then call backend method to return timetables
  //if clash then give a error message
  //convert courseDivs to courses
  const planCourse = (temp_course_divs) => {
    // console.log(temp_course_divs);
    //pass course to backend
    // setIsPlanClicked(true);
    const non_clash_courses = [];
    const clash_courses = [];

    for (let i = 0; i < temp_course_divs.length; i++) {
      //push courses into clash_courses
      if (allowClashCC.includes(temp_course_divs[i].course.courseCode)) {
        if (temp_course_divs[i].isIndexFixed) {
          const tempCourse = { ...temp_course_divs[i].course };
          tempCourse.index = [temp_course_divs[i].currentIdx];
          clash_courses.push(tempCourse);
        } else {
          clash_courses.push(temp_course_divs[i].course);
        }
      }
      //push courses into non_clash_courses
      else {
        if (temp_course_divs[i].isIndexFixed) {
          const tempCourse = { ...temp_course_divs[i].course };
          tempCourse.index = [temp_course_divs[i].currentIdx];
          non_clash_courses.push(tempCourse);
        } else {
          non_clash_courses.push(temp_course_divs[i].course);
        }
      }
    }

    // const input_course_arr = temp_course_divs.map((item) => {
    //   if (item.isIndexFixed) {
    //     const tempCourse = { ...item.course };
    //     tempCourse.index = [item.currentIdx];
    //     return tempCourse;
    //   } else {
    //     return item.course;
    //   }
    // });

    console.log({
      non_clash_courses: non_clash_courses,
      clash_courses: clash_courses,
      free_slots: userDefinedTimeSlots,
    });

    setIsPlanClicked(true);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(
        "/planning/send_timetable",
        {
          non_clash_courses: non_clash_courses,
          clash_courses: clash_courses,
          free_slots: userDefinedTimeSlots,
        },
        axiosConfig
      )
      .then((response) => {
        console.log(response.data);
        if (typeof response.data.message[0] === "string") {
          alert(response.data.message[0]);
        } else {
          setCombinations(response.data.message);
        }
      });

    // axios
    //   .post("/user/login", {
    //     email: "astha@gmail.com",
    //     password: "astha123",
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   });

    // console.log(temp_course_arr);

    //testing
    const courseSelected = [
      { courseCode: "cz2006", index_number: "10145" },
      { courseCode: "cz2007", index_number: "10145" },
      // {course:{},index_number:"10145"}
    ];

    // console.log(courseSelected);

    // console.log(courseSelected[0]["courseId"]);
    // setIsPlanClicked(true);
    // setCombinations([
    //   { CZ1016: "10061", CZ1103: "10064" },
    //   { CZ1016: "10060", CZ1103: "10063" },
    //   { CZ1016: "10062", CZ1103: "10064" },
    // ]);
    //
    // const backend_data_arr = backend_method(temp_course_arr)
    // const backend_data_arr = [];
    // //reset timetablestate.timetables
    // // for (let i=0;i<backend_data_arr.length;i++){
    // //   let tempTT = backend_data_arr[i];
    // // }
    // setTimetablesState({ ...timetablesState, timeTables: backend_data_arr });
    // displayCurrentTTpage();
    // const setCurrentIdx = () => {
    //   const tempCD = [...courseDivs];
    //   const tempIdx = tempCD[0].course.index.findIndex(
    //     (item) => item.index_number === "10064"
    //   );
    //   tempCD[0].currentIdx = tempCD[0].course.index[tempIdx];
    //   setCourseDivs(tempCD);
    // };

    // setCurrentIdx();
    // console.log(temp_course_arr);
  };

  const updateCurrentIdx = (event, idx) => {
    const tempCourseDivs = [...courseDivs];
    if (event.target.value !== "") {
      tempCourseDivs[idx].currentIdx =
        tempCourseDivs[idx].course.index[event.target.value];
    } else {
      tempCourseDivs[idx].currentIdx = {};
    }
    setCourseDivs(tempCourseDivs);

    //change combination of the current page
    const tempCs = [...combinations];
    //create course and respective index(empty default)
    tempCs[currentTimeTablePage - 1][tempCourseDivs[idx].course.courseCode] =
      tempCourseDivs[idx].currentIdx.index_number;
    setCombinations(tempCs);
  };

  const setIsIndexFixed = (value, idx) => {
    // const indexFixedCourseDivIDs = courseDivs.map((item, i) => {
    //   if (item.isIndexFixed) return i + 1;
    // });

    const tempCourseDivs = [...courseDivs];
    tempCourseDivs[idx].isIndexFixed = value;
    setCourseDivs(tempCourseDivs);
  };

  //add Course Division
  const addCourseDiv = (tempCourse, currentIdxVar) => {
    if (typeof tempCourse === "object" && tempCourse !== null) {
      if (
        !courseDivs.some((e) => e.course.courseCode === tempCourse.courseCode)
      ) {
        setCourseDivs([
          ...courseDivs,
          {
            course: tempCourse,
            currentIdx: currentIdxVar,
            isIndexFixed: false,
          },
        ]);

        //change combination of the current page
        const tempCs = [...combinations];
        //create course and respective index(empty default)
        if (tempCs.length !== 0) {
          for (let i = 0; i < tempCs.length; i++) {
            tempCs[i][tempCourse.courseCode] = "";
          }
        } else {
          tempCs.push({});
          tempCs[0][tempCourse.courseCode] = "";
        }

        setCombinations(tempCs);
      } else {
        alert("The selected course was added before!");
      }
    } else {
      alert("Please select a course before adding!");
    }
  };
  const deleteElement = (idx) => {
    const tempCourseDivs = [...courseDivs];
    const tempCourseDiv = tempCourseDivs.splice(idx, 1)[0];
    setCourseDivs(tempCourseDivs);

    //change combination of the current page
    const tempCs = [...combinations];
    //create course and respective index(empty default)
    for (let i = 0; i < tempCs.length; i++) {
      delete tempCs[i][tempCourseDiv.course.courseCode];
    }

    const tempClashCC = allowClashCC.filter(
      (item) => item !== tempCourseDiv.course.courseCode
    );
    setAllowClashCC(tempClashCC);
    //delete the course code in allowclash array
    // setall;

    setCombinations(tempCs);
  };

  return (
    <>
      <Button
        className="add"
        onClick={() => {
          addCourseDiv(props.course, {});
        }}
      >
        ADD COURSE
      </Button>
      {courseDivs.map((courseDiv, idx) => {
        return (
          <div
            key={idx}
            className="row"
            id="planner-index-div"
            style={{
              borderRadius: "5px",
              background: resourcesData[idx]
                ? resourcesData[idx].color
                : "#42a5f5",
            }}
          >
            <CourseDiv
              key={idx}
              course={courseDiv.course}
              currentIdx={courseDiv.currentIdx}
              deleteElement={() => deleteElement(idx)}
              updateCurrentIdx={(event) => updateCurrentIdx(event, idx)}
              isIndexFixed={courseDiv.isIndexFixed}
              setIsIndexFixed={(value) => setIsIndexFixed(value, idx)}
            />
          </div>
        );
      })}
      <Button
        className="btn-warning"
        id="planner-index-plan-button"
        onClick={() => {
          planCourse(courseDivs);
        }}
      >
        Plan
      </Button>
    </>
  );
}
