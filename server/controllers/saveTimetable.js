const Timetable = require("../models/timetable");
const User = require("../models/user");
// var course ={"courseID":"","indexNum":""};
// var courses=[];

const saveTimetable = async (req, res) => {
  const {
    userEmail,
    timetableID,
    courseSelected,
    courseFixed,
    fixedTimeSlots,
    courseClashAllowed,
  } = req.body;
  console.log(courseSelected);
  // for (i = 0;i < courseSelected.length; i++){
  //     course["courseID"]=courseSelected[i]["courseID"];
  //     course["indexNum"]=courseSelected[i]["indexNum"];
  //     courses.push(course);
  // }

  const timetable = new Timetable({
    timetableID: timetableID,
    courseSelected: courseSelected,
    fixedTimeSlots: fixedTimeSlots,
    courseFixed: courseFixed,
    courseClashAllowed: courseClashAllowed,
  });

  User.updateOne(
    {
      email: req.body.userEmail,
    },
    {
      $push: {
        timetables: req.body.timetableID,
      },
    },
    function (err, result) {
      if (result.nModified == 0) {
        //console.log("print")
        if (finalMessage) res.status(500).send("Update error in user");
        else finalMessage = false;
      } else {
        finalMessage = true;


        res.status(200).send("Success");
      }
    }
  );
  //result = JSON.parse(JSON.stringify(timetable));
  console.log(timetable);
  timetable
    .save()
    .then((timetable) => {
      console.log(timetable);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getsavedTimetable = async (req, res) => {
  try {
    const timetableID = req.body.timetableID;
    console.log(timetableID);

    const result = await Timetable.find({ timetableID: timetableID });
    console.log(result);
    res.status(200).send(result);
  } catch {
    res.status(400).send("err");
  }
};

module.exports = { saveTimetable, getsavedTimetable };
