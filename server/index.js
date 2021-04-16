const express = require("express");
const app = express();
var cors = require("cors");
const connectDB = require("./DB/Connection");
const mongoose = require("mongoose");
const dotenv=require('dotenv');
dotenv.config();

connectDB();

//Import routes

const sendAllCourses = require("./routes/sendAllCourses");
const authRoute = require("./routes/user");
const planRoute = require("./routes/planning");
const discussion = require("./routes/discussionRoute");
const sharing = require("./routes/sharing");
const saveTimetable = require("./routes/saving");
const saveCourses = require("./routes/saveCourse");
const appointmentRoute = require("./routes/appointmentRoute");
const commonFreeTimeRoute = require("./routes/commonFreeTimeRoute");
const icsStringRoute = require("./routes/icsStringRoute");
const courseList = require("./routes/sendCourseList");

app.use(express.json({ extended: false }));

app.use(cors());

//Route middlewares
app.use("/user", authRoute);
app.use("/planning", planRoute);
app.use("/discuss", discussion);
app.use("/share", sharing);
app.use("/saving", saveTimetable);
app.use("/saveCourse",saveCourses);
app.use("/commonfreetime", commonFreeTimeRoute);
app.use("/appointment", appointmentRoute);
app.use("/icsString", icsStringRoute);

app.use("/discuss", discussion);
app.use("/share", sharing);
app.use("/sendAllCourses", sendAllCourses);
app.use("/sendCourseList", courseList);

app.listen(process.env.PORT, () => console.log("Server up and running"));
app.use((req, res) => {
  console.log("User requested a resource which is unavailable");
  res.status(404).send("Resource not found");
});
