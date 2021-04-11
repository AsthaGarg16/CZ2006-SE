import React, { useState, useEffect } from "react";
import { Media, Card, Button, CardBody } from "reactstrap";
import DiscussionDetail from "./DiscussionDetail";
import { Link } from "react-router-dom";
import CircularSlider from "@fseehawer/react-circular-slider";
import SearchCourseDropdown from "../components/SearchCourseDropdown";
import { useHistory } from "react-router-dom";
import axios from "axios";

function DiscussionForum(props) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [value, setValue] = useState(null);
  const [topCourses, setTopCourses] = useState(null);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  function fetchTopRatedCourse(values) {
    axios
      .get("/discuss/top_course", {})
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
    console.log("FETCHING");
    fetchTopRatedCourse();
  }, []);

  const topRatedCourse = topCourses
    ? topCourses.map((course) => {
        return (
          <Card
            tag="li"
            key={course.id}
            onClick={() => handleCourseSelect(course)}
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

  return (
    <div className="background">
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
              options={props.courses.map((item) => ({
                ...item,
                id: Math.random().toString(36).substr(2, 9),
              }))}
              value={value}
              onChange={(val) => setValue(val)}
            />
          </div>
          <div>
            <Button id="discuss-search-course-button" onClick={() => handleSearchCourse(value)}>Search</Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">Top Rated Course</div>
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
    </div>
  );
}

export default DiscussionForum;
