import React, { useState, useRef, useEffect, useContext } from "react";
import PlannerCalendarComponent from "../components/PlannerCalendarComponent";
import PlannerIndexComponent from "../components/PlannerIndexComponent";
import MoreOptionsComponent from "../components/MoreOptionsComponent";
import SelectTimetablePageComponent from "../components/SelectTimetablePageComponent";
import SearchCourseDropdown from "../components/SearchCourseDropdown";
import ShareTimetableComponent from "../components/ShareTimetableComponent";
import { Button } from "reactstrap";
import {
  PlanTimetableContextProvider,
  usePlanTimetable,
} from "../context/PlanTimetableContextProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";

import "./PlanTimetable.css";

function PlanTimetableContextConsumer(props) {
  const planTimetableContext = usePlanTimetable();

  const combinations = planTimetableContext.combinations;
  const currentTimeTablePage = planTimetableContext.currentTimeTablePage;
  const setCurrentTimeTablePage = planTimetableContext.setCurrentTimeTablePage;
  const occupiedTimeSlots = planTimetableContext.occupiedTimeSlots;

  const courseDivs = planTimetableContext.courseDivs;
  const userDefinedTimeSlots = planTimetableContext.userDefinedTimeSlots;
  const allowClashCC = planTimetableContext.allowClashCC;

  // const setIsPageChanged = planTimetableContext.setIsPageChanged;
  //Backend: addTimetables
  // const addTimeTables = (tempTimeTables) => {
  //   //currentTimeTablePage set to 1 as default when new timetables added
  //   setTimetablesState({ timeTables: tempTimeTables, currentTimeTablePage: 1 });
  // };
  const updateTimeTablePageNum = (tempPage) => {
    setCurrentTimeTablePage(tempPage);
    // setIsPageChanged(true);
  };

  //call backend
  const saveCurrentTT = () => {
    const courseFixed = {};
    courseDivs.forEach((courseDiv) => {
      if (courseDiv.isIndexFixed) {
        courseFixed[courseDiv.course.courseCode] =
          courseDiv.currentIdx.index_number;
      }
    });
    const reqbody = {
      timetableID: Date.now().toString(),
      courseSelected: combinations[currentTimeTablePage - 1],
      fixedTimeSlots: userDefinedTimeSlots,
      courseFixed: courseFixed,
      courseClashAllowed: allowClashCC,
    };
    console.log(reqbody);
  };

  return (
    <div className="row">
      <div className="col-2">
        <PlannerIndexComponent course={props.course} />
      </div>
      <div className="col-10">
        <div className="row justify-content-md-center" align="center">
          <MoreOptionsComponent />
          <SelectTimetablePageComponent
            combinations={combinations}
            currentTimeTablePage={currentTimeTablePage}
            updateTimeTablePageNum={updateTimeTablePageNum}
          />
          <ShareTimetableComponent
            combinations={combinations}
            currentTimeTablePage={currentTimeTablePage}
          />
          <Button onClick={saveCurrentTT}>Save Current Timetable</Button>
        </div>
        <PlannerCalendarComponent timeTableData={occupiedTimeSlots} />
      </div>
    </div>
  );
}

export default function PlanTimetable() {
  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  // const props = useParams();
  // console.log(props);

  //if this page is redirected from savedtimetables
  // let location = useLocation();

  // useEffect(() => {
  //   console.log(location);
  //   if (location.state) {
  //   }
  // }, []);

  //method to add course(div)
  const getData = () => {
    fetch("output.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        // console.log(myJson);
        //i only chose 200 courses
        setData(myJson);
        sessionStorage.setItem("coursesData", JSON.stringify(myJson));
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("Dropdown rerender");
  });
  return (
    <PlanTimetableContextProvider>
      <div className="container">
        <div className="row">
          <div className="planner-title col-12">
            <b>Course Planner</b>
          </div>
          <div className="row" style={{ width: 200 }}>
            <SearchCourseDropdown
              prompt="Select courses..."
              id="courseCode"
              label="courseCode"
              name="name"
              options={data.map((item) => ({
                ...item,
                id: Math.random().toString(36).substr(2, 9),
              }))}
              value={value}
              onChange={(val) => setValue(val)}
            />
          </div>
          <PlanTimetableContextConsumer course={value} />
        </div>
      </div>
    </PlanTimetableContextProvider>
  );
}
