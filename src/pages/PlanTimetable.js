import React, { useState, useEffect } from "react";
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
import axios from "axios";

/**
 * This function uses the context created by the PlanTimetableContextProvider.
 * The context contains the states which serve as variables that can be changed throughout a session
 * The context also contains functions that can be used to change the states.
 * @param {*} param0 -course object
 * @returns component which include other components needed for plan timetable page
 */
function PlanTimetableContextConsumer({ course }) {
  const planTimetableContext = usePlanTimetable();

  const combinations = planTimetableContext.combinations;
  const currentTimeTablePage = planTimetableContext.currentTimeTablePage;
  const setCurrentTimeTablePage = planTimetableContext.setCurrentTimeTablePage;
  const occupiedTimeSlots = planTimetableContext.occupiedTimeSlots;
  const courseDivs = planTimetableContext.courseDivs;
  const userDefinedTimeSlots = planTimetableContext.userDefinedTimeSlots;
  const allowClashCC = planTimetableContext.allowClashCC;
  const updateTimeTablePageNum = (tempPage) => {
    setCurrentTimeTablePage(tempPage);
  };

  /**
   * This function save current Timetable to the user's account.
   */
  const saveCurrentTT = () => {
    if (!sessionStorage.getItem("token")) {
      alert("Please login before saving timetable.");
      return;
    }
    const courseFixed = [];
    courseDivs.forEach((courseDiv) => {
      if (courseDiv.isIndexFixed) {
        courseFixed.push({
          courseID: courseDiv.course.courseCode,
          indexNum: courseDiv.currentIdx.index_number,
        });
      }
    });

    const courseSelected = [];
    for (const [key, value] of Object.entries(
      combinations[currentTimeTablePage - 1]
    )) {
      courseSelected.push({ courseID: key, indexNum: value });
    }

    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;
    const timetableID = Date.now().toString();
    const reqbody = {
      userEmail: userEmail,
      timetableID: timetableID,
      courseSelected: courseSelected,
      fixedTimeSlots: userDefinedTimeSlots,
      courseFixed: courseFixed,
      courseClashAllowed: allowClashCC,
    };
    console.log(reqbody);

    axios.put("/saving/saveTimetable", reqbody).then((response) => {
      console.log(response.data);
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const tempTimetables = [...userData.timetables] || [];
      tempTimetables.push(parseInt(timetableID));
      userData.timetables = tempTimetables;
      sessionStorage.setItem("userData", JSON.stringify(userData));
      alert("Current timetable has been saved.");
    });
  };

  /**
   * This function converts array of time slots into array of appointments. The appointments format is
   * @param {Object[]} userTimeSlots
   * @returns array of appointments
   */
  const convertUserDefinedTimeSlotstoAppointments = (userTimeSlots) => {
    return userTimeSlots.map((item) => {
      const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      console.log(item);
      return {
        title: "Free Time Slot",
        weekList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        type: "",
        startDate: item[0],
        endDate: item[1],
        day: dayNames[item[0].getDay()],
      };
    });
  };

  /**
   * Download current timetable as icsfile.
   */
  const downloadfile = () => {
    const FileDownload = require("js-file-download");
    console.log(occupiedTimeSlots);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const udtsAppointments = convertUserDefinedTimeSlotstoAppointments(
      userDefinedTimeSlots
    );
    const reqbody = {
      appointments: [...occupiedTimeSlots, ...udtsAppointments],
    };
    console.log(reqbody);
    if (reqbody.appointments.length !== 0) {
      axios
        .post("/icsString/get_ics_string", reqbody, axiosConfig)
        .then((response) => {
          console.log(response);
          FileDownload(response.data, "MyCal.ics");
        });
    } else {
      alert("You haven't planned a timetable yet.");
    }
  };

  return (
    <div className="row">
      <div className="col-2">
        <PlannerIndexComponent course={course} />
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
          <Button
            onClick={saveCurrentTT}
            style={{ height: 40, width: 240, marginRight: "10px" }}
          >
            Save Current Timetable
          </Button>
          <Button onClick={downloadfile} style={{ height: 40, width: 140 }}>
            Download
          </Button>
        </div>
        <PlannerCalendarComponent
          timeTableData={[
            ...occupiedTimeSlots,
            ...convertUserDefinedTimeSlotstoAppointments(userDefinedTimeSlots),
          ]}
          currentDate={"2021-03-02"}
        />
      </div>
    </div>
  );
}

/**
 * This function is used for rendering the plan timetable page.
 * @returns the plan timetable page
 */
export default function PlanTimetable() {
  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  const getData = () => {
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
      <div className="background">
        <div className="empty-space"></div>
        <div className="container">
          <div className="page-title col-12">
            <b>Plan Timetable</b>
          </div>
          <hr />
          <div
            className="row"
            id="planner-search-course-dropdown"
            style={{ width: 180 }}
          >
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
        <div className="empty-space"></div>
      </div>
    </PlanTimetableContextProvider>
  );
}
