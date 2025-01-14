import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PlannerCalendarComponent from "../components/PlannerCalendarComponent";
import SelectCommonPageComponent from "../components/SelectCommonPageComponent";
import { Button } from "reactstrap";
import MUIButton from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Paper from "@material-ui/core/Paper";
import MUbutton from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

/** This function is used for rendering the current week/ next week toggle button in find common free time slot page. */
function ToggleButtonNotEmpty(props) {
  const { setWeekView } = props;
  const [week, setWeek] = React.useState("currentweek");

  const handleWeek = (event, newWeek) => {
    if (newWeek !== null) {
      console.log(newWeek);
      setWeek(newWeek);
      if (newWeek === "currentweek") {
        setWeekView(0);
      } else {
        setWeekView(1);
      }
    }
  };

  const classes = useStyles();

  return (
    <ToggleButtonGroup
      value={week}
      exclusive
      onChange={handleWeek}
      aria-label="text alignment"
    >
      <ToggleButton
        className="common-page-button"
        value="currentweek"
        aria-label="left aligned"
      >
        Current Week
      </ToggleButton>
      <ToggleButton
        className="common-page-button"
        value="nextweek"
        aria-label="justified"
      >
        Next Week
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

const GetTimetableData = function (props) {
  const { selectedICSfile, deleteElement, chooseICSfile, idx } = props;

  return (
    <Paper
      elevation={5}
      style={{
        wordWrap: "break-word",
      }}
    >
      <div className="common-page-button ics-file-detail row">
        <div className="ics-file-detail-timetable">
          {"Timetable " + (idx + 1)}{" "}
        </div>{" "}
        <div className="remove-ics-file-button">
          <MUIButton
            variant="outlined"
            color="secondary"
            startIcon={<CloseIcon />}
            onClick={deleteElement}
            style={{ width: "40px", minWidth: "40px" }}
          />
        </div>
      </div>
      <p>{selectedICSfile.fileName || "No file chosen"}</p>
    </Paper>
  );
};

/** This function is used for rendering the find common timeslot page. */
export default function FindCommon() {
  const classes = useStyles();

  const week1 = new Date("2021-01-11T00:00:00Z");
  const week2 = new Date("2021-01-18T00:00:00Z");
  const week3 = new Date("2021-01-25T00:00:00Z");
  const week4 = new Date("2021-02-01T00:00:00Z");
  const week5 = new Date("2021-02-08T00:00:00Z");
  const week6 = new Date("2021-02-15T00:00:00Z");
  const week7 = new Date("2021-02-22T00:00:00Z");
  const recess = new Date("2021-03-01T00:00:00Z");
  const week8 = new Date("2021-03-08T00:00:00Z");
  const week9 = new Date("2021-03-15T00:00:00Z");
  const week10 = new Date("2021-03-22T00:00:00Z");
  const week11 = new Date("2021-03-29T00:00:00Z");
  const week12 = new Date("2021-04-05T00:00:00Z");
  const week13 = new Date("2021-04-12T00:00:00Z");
  const end = new Date("2021-04-19T00:00:00Z");

  const teaching_weeks = [
    week1,
    week2,
    week3,
    week4,
    week5,
    week6,
    week7,
    week8,
    week9,
    week10,
    week11,
    week12,
    week13,
    end,
  ];

  function getWeek() {
    let now = new Date();
    if (recess < now && now < week8) {
      return -1; // Recess week
    } else if (end < now) {
      return 14; // Teaching weeks have ended
    }
    for (let i = 0; i < 14; i++) {
      if (now < teaching_weeks[i]) {
        return i;
        // i = 0 means before week1
      }
    }
  }
  const [selectedICSfiles, setSelectedICSfiles] = useState([]);

  const [commonFreeTimeSlots, setCommonFreeTimeSlots] = useState([]);

  const [weekView, setWeekView] = useState(0); //0-current week , 1-next week
  const [currentPage, setCurrentPage] = useState(1); //1 = index 0
  const [currentWeek, setCurrentWeek] = useState(getWeek());
  const [allFilesLoadedToggle, setAllFilesLoadedToggle] = useState(false);
  const location = useLocation();
  useEffect(() => {
    console.log("find common");
    console.log(location);

    if (location.state) {
      console.log("state exists");
    }
  }, []);

  const deleteElement = (idx) => {
    const tempSelectedICSfiles = [...selectedICSfiles];
    tempSelectedICSfiles.splice(idx, 1);
    setSelectedICSfiles(tempSelectedICSfiles);
  };

  //call backend method
  const submitFiles = (event) => {
    setCurrentWeek(getWeek());
    const tempSelectedICSfiles = [...selectedICSfiles];

    for (let i = 0; i < event.target.files.length; i++) {
      tempSelectedICSfiles.push({
        fileName: event.target.files[i].name,
        fileData: null,
        results: [],
      });
      const reader = new FileReader();
      reader.onload = function (e) {
        // The file's text will be printed here

        tempSelectedICSfiles[selectedICSfiles.length + i].fileData =
          e.target.result;
        if (i === event.target.files.length - 1)
          setAllFilesLoadedToggle((prevState) => !prevState);
      };
      reader.readAsText(event.target.files[i]);
    }

    setSelectedICSfiles(tempSelectedICSfiles);
  };

  useEffect(() => {
    if (selectedICSfiles.length !== 0) {
      const reqbody = { icsList: [] };
      reqbody.icsList = selectedICSfiles.map((item) => item.fileData);
      reqbody.week = getWeek();
      console.log(reqbody);
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      axios
        .post("/appointment/get_appointments", reqbody, axiosConfig)
        .then((response) => {
          const tempSelectedICSfiles = [...selectedICSfiles];

          response.data[0].forEach((element, idx) => {
            tempSelectedICSfiles[idx].results[0] = element;
          });
          response.data[1].forEach((element, idx) => {
            tempSelectedICSfiles[idx].results[1] = element;
          });
          setSelectedICSfiles(tempSelectedICSfiles);
        });
    }
  }, [allFilesLoadedToggle]);

  //call backend method
  const generateCommonFreeTimeSlots = () => {
    if (getWeek() !== currentWeek) {
      setCurrentWeek(getWeek());

      submitFiles();
    } else {
      console.log("same week");
    }

    const reqbody = { appointmentList: [[], []] };
    console.log(selectedICSfiles);
    for (let i = 0; i < selectedICSfiles.length; i++) {
      if (selectedICSfiles[i].results.length !== 0) {
        selectedICSfiles[i].results.forEach((item, idx) => {
          reqbody.appointmentList[idx].push(...item);
        });
      }
    }
    reqbody.week = getWeek();
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post("/commonfreetime/get_commonFreeTime", reqbody, axiosConfig)
      .then((response) => {
        console.log(response);
        console.log(response.data);

        setCommonFreeTimeSlots(response.data);
      });
    console.log(reqbody);
  };

  useEffect(() => {
    console.log("rerender");
    console.log(selectedICSfiles);
  });

  const chooseICSfile = (i, event) => {
    if (event.target.files[0]) {
      const tempSelectedICSfiles = [...selectedICSfiles];
      tempSelectedICSfiles[i].fileName = event.target.files[0].name;
      const reader = new FileReader();
      reader.onload = function (e) {
        // The file's text will be printed here
        // console.log(e.target.result);
        tempSelectedICSfiles[i].fileData = e.target.result;
      };
      reader.readAsText(event.target.files[0]);
      setSelectedICSfiles(tempSelectedICSfiles);
    }
  };
  const updateTimeTablePageNum = (tempPage) => {
    console.log(tempPage);
    setCurrentPage(tempPage);
  };

  function getMonday(d) {
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  } // Mon Nov 08 2010
  const newdate = new Date();
  newdate.setDate(getMonday(newdate).getDate() + weekView * 7);
  return (
    <div className="background">
      <div className="empty-space"></div>
      <div className="container">
        <div className="page-title col-12">
          <b>Find Common Time Slots</b>
        </div>
        <hr />
        <div className="row">
          <div className="col-2"></div>
          <div className="col-4">
            <ToggleButtonNotEmpty
              setWeekView={setWeekView}
            ></ToggleButtonNotEmpty>
          </div>
          <div className="col-4">
            <SelectCommonPageComponent
              combinations={[
                ...selectedICSfiles,
                {
                  page: "Common Free Time Slots",
                  results: commonFreeTimeSlots,
                },
              ]}
              updateTimeTablePageNum={updateTimeTablePageNum}
            />
          </div>
        </div>
        <div className="row mt-8">
          <div className="col-2">
            <h4>Timetables</h4>
            <input
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              name="file"
              accept=".ics"
              onChange={submitFiles}
            />
            <label htmlFor="contained-button-file">
              <MUbutton
                variant="contained"
                color="default"
                component="span"
                startIcon={<CloudUploadIcon />}
                className="common-page-button"
              >
                Upload .ics files
              </MUbutton>
            </label>

            <Button
              onClick={generateCommonFreeTimeSlots}
              className="common-page-button generate-button"
            >
              <div id="generate-common">Generate</div>
            </Button>

            {selectedICSfiles.map((item, idx) => {
              return (
                <GetTimetableData
                  selectedICSfile={item}
                  deleteElement={() => deleteElement(idx)}
                  chooseICSfile={chooseICSfile.bind(this, idx)}
                  idx={idx}
                />
              );
            })}
          </div>

          <div className="col-10">
            <div className="row">
              <PlannerCalendarComponent
                timeTableData={
                  currentPage !== selectedICSfiles.length + 1
                    ? selectedICSfiles[currentPage - 1].results[weekView]
                    : commonFreeTimeSlots[weekView]
                }
                currentDate={newdate.toISOString()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="empty-space"></div>
    </div>
  );
}
