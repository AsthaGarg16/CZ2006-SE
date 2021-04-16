import React, { useState, useEffect } from "react";
import { Media, Card, Button, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import CircularSlider from "@fseehawer/react-circular-slider";
import SearchCourseDropdown from "../components/SearchCourseDropdown";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

/** This function is used for rendering the discussion forum page. */
function DiscussionForum(props) {

  const [courses, setCourses] = useState(
    sessionStorage.getItem("discuss")
      ? JSON.parse(sessionStorage.getItem("discuss"))
      : []
  );
  const [value, setValue] = useState(null);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [topCourses, setTopCourses] = useState(null);

  function fetchAllCourse(values) {
    axios
      .get("/sendCourseList/getCourseList", {})
      .then((response) => {
        console.log(response);
        setCourses(response.data); 
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
                <p className="home-paragraph">
                  {course.courseInfo[course.courseInfo.length - 1]}
                </p>
              </Link>
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

           <div className="col-10 top-rated-course mt-3"><b>Top Rated Courses</b></div>
          <div className="col-2">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="school-native-simple">Programme</InputLabel>
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
        </div>
        <div className="row">
          <Media list className="col-12">
            {topRatedCourse}
          </Media>
        </div>
      </div>
      <div className="empty-space"></div>
    </div>
  );
}

export default DiscussionForum;
