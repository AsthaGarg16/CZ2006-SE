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
import Paper from "@material-ui/core/Paper";
import axios from "axios";

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
    const courseFixed = [];
    courseDivs.forEach((courseDiv) => {
      if (courseDiv.isIndexFixed) {
        courseFixed.push({
          courseID: courseDiv.course.courseCode,
          indexNum: courseDiv.currentIdx.index_number,
        });
        // [courseDiv.course.courseCode] = courseDiv.currentIdx.index_number;
      }
    });

    const courseSelected = [];
    // console.log(combinations);
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
      // if (typeof response.data.message[0] === "string") {
      //   alert(response.data.message[0]);
      // } else {
      //   setCombinations(response.data.message);
      // }
    });
    //
    // const reqbody = { timetableID: "2" };
    // console.log(reqbody);
    // axios.post("/saving/getSavedTimetable", reqbody).then((response) => {
    //   console.log(response.data);
    //   // if (typeof response.data.message[0] === "string") {
    //   //   alert(response.data.message[0]);
    //   // } else {
    //   //   setCombinations(response.data.message);
    //   // }
    // });
    // console.log(reqbody);
  };

  const downloadfile = () => {
    const FileDownload = require("js-file-download");
    console.log(occupiedTimeSlots);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    console.log(typeof occupiedTimeSlots[0].startDate);
    // console.log(occupiedTimeSlots);

    // const dummy = [
    //   {
    //     type: "LEC/STUDIO",
    //     group: "L3",
    //     day: "THU",
    //     full: "1130-1430",
    //     start: "1130",
    //     end: "1430",
    //     duration: 3,
    //     location: "NIE7-02-07",
    //     flag: 0,
    //     remarks: "",
    //     date_w1: "2021-08-12",
    //     weekList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     title: "AAA08B",
    //     id: "fejvsx0d6",
    //     startDate: "2021-03-04T03:30:00.000Z",
    //     endDate: "2021-03-04T06:30:00.000Z",
    //     courseDivID: 1,
    //   },
    // ];
    const convertUserDefinedTimeSlotstoAppointments = (occupiedTimeSlots) => {
      return occupiedTimeSlots.map((item) => {
        const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        console.log(item);
        return {
          title: "Free Time Slot",
          weekList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          startDate: item[0],
          endDate: item[1],
          day: dayNames[item[0].getDay()],
        };
      });
    };
    const udtsAppointments = convertUserDefinedTimeSlotstoAppointments(
      userDefinedTimeSlots
    );
    // console.log(udtsAppointments);
    const reqbody = {
      appointments: [...occupiedTimeSlots, ...udtsAppointments],
    };
    console.log(reqbody);
    axios
      .post("/icsString/get_ics_string", reqbody, axiosConfig)
      .then((response) => {
        console.log(response);

        // console.log(response.data);
        FileDownload(response.data, "testing3.ics");
      });
    // FileDownload("sdfsdf", "testing.ics");
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
          timeTableData={occupiedTimeSlots}
          currentDate={"2021-03-02"}
        />
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
    // axios
    //   .get("/sendAllCourses/getAllCourses", {})
    //   .then((response) => {
    //     console.log(response.data);
    //     setData(response.data);
    //   })
    //   .catch(function (error) {});
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
        <div className="container">
          {/* <div className="row"> */}
          <div className="page-title col-12">
            <b>Course Planner</b>
          </div>
          <hr />
          {/* <div className="small-container"> */}
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
          {/* </div> */}
          <PlanTimetableContextConsumer course={value} />
          {/* </div> */}
        </div>
      </div>
    </PlanTimetableContextProvider>
  );
}
