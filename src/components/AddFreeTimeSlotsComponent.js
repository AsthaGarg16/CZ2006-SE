import React from "react";
import "resize-observer-polyfill/dist/ResizeObserver.global";
import { TimeGridScheduler, classes } from "@remotelock/react-week-scheduler";
import "@remotelock/react-week-scheduler/index.css";
import { EventRoot } from "./EventRoot";

export default function AddFreeTimeSlotsComponent({
  tempUserDefinedTimeSlots,
  setTempUserDefinedTimeSlots,
}) {
  return (
    <div
      className="container"
      style={{
        width: "90vw",
        height: "600px",
        "--cell-height": "20px",
        "--cell-width": "50px",
      }}
    >
      <h4>Add Free Time Slots</h4>
      <TimeGridScheduler
        classes={classes}
        style={{ width: "100%", height: "90%" }}
        originDate={new Date("2021-03-01")}
        schedule={tempUserDefinedTimeSlots}
        onChange={setTempUserDefinedTimeSlots}
        eventRootComponent={EventRoot}
        visualGridVerticalPrecision={15}
        verticalPrecision={15}
        cellClickPrecision={60}
      />
    </div>
  );
}
