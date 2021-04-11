import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import AddFreeTimeSlotsComponent from "./AddFreeTimeSlotsComponent";
import AllowClashCheckBoxesComponent from "./AllowClashCheckBoxesComponent";
import { usePlanTimetable } from "../context/PlanTimetableContextProvider";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { Button } from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          style={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MoreOptionsComponent(props) {
  const planTimetableContext = usePlanTimetable();
  const courseDivs = planTimetableContext.courseDivs;
  const allowClashCC = planTimetableContext.allowClashCC;
  const setAllowClashCC = planTimetableContext.setAllowClashCC;
  const userDefinedTimeSlots = planTimetableContext.userDefinedTimeSlots;
  const setUserDefinedTimeSlots = planTimetableContext.setUserDefinedTimeSlots;

  const [open, setOpen] = useState(false);
  const [isChangeMade, setIsChangeMade] = useState(false);
  // const [isChangeSaved, setIsChangeSaved] = useState(false);
  const [tempUserDefinedTimeSlots, setTempUserDefinedTimeSlots] = useState(
    userDefinedTimeSlots
  );
  const [tempAllowClashCC, setTempAllowClashCC] = useState(allowClashCC);

  useEffect(() => {
    if (open == true) {
      setTempUserDefinedTimeSlots(userDefinedTimeSlots);
      setTempAllowClashCC(allowClashCC);
    }
  }, [open]);

  useEffect(() => {
    //have to compare initial and final state
    if (
      JSON.stringify(tempAllowClashCC.sort()) !==
        JSON.stringify(allowClashCC.sort()) ||
      JSON.stringify(tempUserDefinedTimeSlots) !==
        JSON.stringify(userDefinedTimeSlots)
    ) {
      setIsChangeMade(true);
    } else {
      setIsChangeMade(false);
    }
  }, [tempAllowClashCC, tempUserDefinedTimeSlots]);

  // useEffect(() => {
  //   console.log("moreoptions");
  // });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (isChangeMade) {
      if (window.confirm("Discard Changes?")) {
        setIsChangeMade(false);
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
    // setIsChangeSaved(false);
  };
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const returnTimetableByQuery = (searchParams) => {
    // console.log(searchParams);
    if (searchParams.toString()) {
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
    // console.log(location);
    const tempTimetable =
      returnTimetableByQuery(searchParams) || location.state;
    if (tempTimetable) {
      // console.log("state exists");

      // setCombinations([tempTimetable.courseSelected]);
      setUserDefinedTimeSlots(tempTimetable.fixedTimeSlots);
      setAllowClashCC(tempTimetable.courseClashAllowed);
    }
  }, []);

  const handleSaveChanges = () => {
    setIsChangeMade(false);
    setAllowClashCC(tempAllowClashCC);
    setUserDefinedTimeSlots(tempUserDefinedTimeSlots);
  };

  return (
    <> 
      <Button className = 'more' variant="outlined"  onClick={handleClickOpen}>
        More Options
      </Button>
      <Dialog
        fullScreen
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="lg"
        TransitionComponent={Transition}
      >
        <DialogTitle
          id="moreOptions-dialog-title"
          onClose={handleClose}
          style={{ background: "#16a6df", color: "white" }}
        >
          More Options
        </DialogTitle>
        <DialogContent dividers>
          <AddFreeTimeSlotsComponent
            tempUserDefinedTimeSlots={tempUserDefinedTimeSlots}
            setTempUserDefinedTimeSlots={setTempUserDefinedTimeSlots}
          />

          <AllowClashCheckBoxesComponent
            tempAllowClashCC={tempAllowClashCC}
            setTempAllowClashCC={setTempAllowClashCC}
            courseDivs={courseDivs}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleSaveChanges}
            color="primary"
            disabled={!isChangeMade}
            variant={isChangeMade ? "contained" : "outlined"}
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
