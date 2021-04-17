import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as FcIcons from "react-icons/fc";
import * as BiIcons from "react-icons/bi";
import * as GoIcons from "react-icons/go";
import EventIcon from "@material-ui/icons/Event";
import HomeIcon from "@material-ui/icons/Home";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon style={{ margin: 10 }} />,
    cName: "nav-text",
  },
  {
    title: "Plan Timetable",
    path: "/planner",
    icon: <EventIcon style={{ margin: 10 }} />,
    cName: "nav-text",
  },
  {
    title: "Find Common Free Time Slots",
    path: "/findcommon",
    icon: <FindInPageIcon style={{ margin: 10 }} />,
    cName: "nav-text",
  },
  {
    title: "Discussion Forum",
    path: "/discuss",
    icon: <QuestionAnswerIcon style={{ margin: 10 }} />,
    cName: "nav-text",
  },
];
