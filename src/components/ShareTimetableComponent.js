import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { usePlanTimetable } from "../context/PlanTimetableContextProvider";

var QRCode = require("qrcode.react");

export default function ShareTimetableComponent(props) {
  const { combinations, currentTimeTablePage } = props;
  const [link, setLink] = useState("");
  const planTimetableContext = usePlanTimetable();
  const courseDivs = planTimetableContext.courseDivs;
  const userDefinedTimeSlots = planTimetableContext.userDefinedTimeSlots;
  const allowClashCC = planTimetableContext.allowClashCC;
  const combinationslength = combinations.length;
  const pages = [];
  for (let i = 0; i < combinationslength; i++) {
    pages.push(i + 1);
  }
  const [selectedPage, setSelectedPage] = useState(currentTimeTablePage);
  const [state, setState] = useState({ isNavOpen: false, isModalOpen: false });

  function toggleModal() {
    setState({
      ...state,
      isModalOpen: !state.isModalOpen,
    });
  }
  const returnCurrentTT = () => {
    const courseFixed = { ...combinations[currentTimeTablePage - 1] };
    courseDivs.forEach((courseDiv) => {
      if (!courseDiv.isIndexFixed) {
        delete courseFixed[courseDiv.course.courseCode];
      }
    });
    const reqbody = {
      courseSelected: combinations[currentTimeTablePage - 1],
      fixedTimeSlots: userDefinedTimeSlots,
      courseFixed: courseFixed,
      courseClashAllowed: allowClashCC,
    };

    return reqbody;
  };


  const generateLink = () => {
    console.log(returnCurrentTT());
    const tempCombinationArray = [];
    for (const [key, value] of Object.entries(combinations[selectedPage - 1])) {
      tempCombinationArray.push(`${key}=${value}`);
    }
    setLink(
      `${window.location.origin}${
        window.location.pathname
      }?timetable=${encodeURIComponent(JSON.stringify(returnCurrentTT()))}`
    );
  };

  return (
    <>
      <Button className="share" onClick={toggleModal}>
        Share Timetable
      </Button>
      <Modal
        size="lg"
        isOpen={state.isModalOpen}
        toggle={toggleModal}
        fade={false}
      >
        <ModalHeader toggle={toggleModal}>
          <h2>Share Timetable</h2>
        </ModalHeader>
        <ModalBody class="modal fade bd-example-modal-lg">
          <Button onClick={generateLink}>Generate Link</Button>
          <a
            href={link}
            target="_blank"
            style={{
              display: "block",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {link.slice(0, 80)}
            {link.length > 80 ? "..." : ""}
          </a>
          <br></br>
          <QRCode size={256} value={link} imageSettings={{ width: 30 }} />
        </ModalBody>
      </Modal>
    </>
  );
}