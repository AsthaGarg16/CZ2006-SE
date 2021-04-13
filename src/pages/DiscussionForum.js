import React, { useState, useEffect } from "react";
import { Media, Card, Button, CardBody } from "reactstrap";
import DiscussionDetail from "./DiscussionDetail";
import { Link } from "react-router-dom";
import CircularSlider from "@fseehawer/react-circular-slider";
import SearchCourseDropdown from "../components/SearchCourseDropdown";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { resourcesData } from "../components/resources";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

function DiscussionForum(props) {
  // const [selectedCourse, setSelectedCourse] = useState(null);
  // console.log(props);

  const [courses, setCourses] = useState(
    sessionStorage.getItem("discuss")
      ? JSON.parse(sessionStorage.getItem("discuss"))
      : []
  );
  const [value, setValue] = useState(null);
  // const [allCourses, setAllCourses] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [topCourses, setTopCourses] = useState(null);

  function fetchAllCourse(values) {
    axios
      .get("/sendCourseList/getCourseList", {})
      .then((response) => {
        console.log(response);
        setCourses(response.data); //Change to all courses afterward
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  }

  useEffect(() => {
    if (props.courses.length === 0) {
      console.log("FETCHING all courses");
      fetchAllCourse();
    }
  }, []);

  useEffect(() => {
    axios
      .get("/discuss/get_schools", {})
      .then((response) => {
        // console.log(response);
        // console.log(response.data[0].schoolList);
        const schoolist = response.data[0].schoolList;
        schoolist.sort();
        setSchools(schoolist);
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  }, []);
  // function fetchAllCourse() {
  //   axios
  //     .get("/sendCourseList/getCourseList", {})
  //     .then((response) => {
  //       // console.log(response);
  //       console.log("ok");
  //       setAllCourses(response.data); //Change to all courses afterward
  //     })
  //     .catch(function (error) {
  //       if (error.response) {
  //         alert(error.response.data.message);
  //       }
  //     });
  // }

  // useEffect(() => {
  //   console.log("FETCHING all courses");
  //   fetchAllCourse();
  // }, []);

  // const handleCourseSelect = (course) => {
  //   setSelectedCourse(course);
  // };

  function fetchTopRatedCourse(schoolname) {
    axios
      .post("/discuss/top_course", { school: schoolname })
      .then((response) => {
        console.log(response);
        setTopCourses(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  }

  useEffect(() => {
    console.log("FETCHING top 5 courses for " + selectedSchool);
    fetchTopRatedCourse(selectedSchool);
  }, [selectedSchool]);

  const topRatedCourse = topCourses
    ? topCourses.map((course) => {
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
                <p className="home-paragraph">
                  {course.courseInfo[course.courseInfo.length - 1]}
                </p>
              </Link>
              {/* <Button onClick={()=>alert(typeof(course))}>Click</Button> */}
            </CardBody>
          </Card>
        );
      })
    : [];

  const history = useHistory();

  function handleSearchCourse(val) {
    console.log("Searched");
    if (val !== null) {
      history.push(`/discuss/${val.courseCode}`);
    }
  }
  // const scrollContainerStyle = { width: "200px", maxHeight: "400px" };

  const handleChangeSchool = (event) => {
    setSelectedSchool(event.target.value);
    console.log(selectedSchool);
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 80,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  return (
    <div className="background">
      <div className="empty-space"></div>
      <div className="container">
        <div className="page-title col-12">
          <b>Discussion Forum</b>
        </div>
        <hr />
        <div className="row">
          <div id="discussion-search-course-dropdown">
            <SearchCourseDropdown
              prompt="Select courses..."
              id="courseCode"
              label="courseCode"
              name="name"
              discuss={true}
              options={courses.map((item) => ({
                ...item,
                id: Math.random().toString(36).substr(2, 9),
              }))}
              value={value}
              onChange={(val) => setValue(val)}
            />
          </div>
          <div>
            <Button
              id="discuss-search-course-button"
              onClick={() => handleSearchCourse(value)}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-10">Top Rated Course</div>
          <div className="col-2">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="school-native-simple">School</InputLabel>
              <Select
                native
                value={selectedSchool}
                onChange={handleChangeSchool}
                inputProps={{
                  name: "school",
                  id: "school-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {schools.map((school) => (
                  <option value={school}>{school}</option>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* <div className="discuss-filter col-2">Filter by School</div> */}
        </div>
        <div className="row">
          <Media list className="col-12">
            {topRatedCourse}
          </Media>
          {/* <Card className="col-2"> */}
          {/* <MDBContainer className="col-2">
            <div className="scrollbar" style={scrollContainerStyle}>

            </div>
          </MDBContainer> */}
          {/* </Card> */}
        </div>
        {/* {selectedCourse && <DiscussionDetail course={selectedCourse} />} */}
      </div>
      <div className="empty-space"></div>
    </div>
  );
}

export default DiscussionForum;
