const savedCourse = require("../models/savedCourse");

// const saveCourses = async(req,res)=>{
//     savedCourse.update({email: req.body.userEmail},
//         {
//             $push:{
//                 savedCourse: req.body.savedCourse
//             },
//         },  function(
//             err,
//             result
//         ) {
//             if (err) {
//                return res.status(500).send("Update error in user")
//             }
//             else{
//                 console.log(savedCourse);
//                 return res.status(200).send('Success');
//             }
//         })
// }

const saveCourses = async (req, res) => {
  const { email, savedCourses } = req.body;
  try {
    const oldUser = await savedCourse.findOne({ email });

    if (oldUser) {
      const filter = { email: email };
      const updatePass = {
        $push: {
          savedCourse: savedCourses,
        },
      };
      const result = await savedCourse.updateOne(filter, updatePass);
      console.log("document updated");

      return res.status(200).json({ message: "saved Courses updated" });
    } else {
      const result = await savedCourse.create({
        email,
        savedCourse: savedCourses,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getSavedCourses = async (req, res) => {
  try {
    const email = req.body.email;

    const result = await savedCourse.find({ email: email });
    console.log(result);
    res.status(200).send(result);
  } catch {
    res.status(400).send("err");
  }
};

const removeSavedCourses = async (req, res) => {
  savedCourse.update(
    { email: req.body.userEmail },
    {
      $pull: {
        savedCourse: req.body.savedCourse,
      },
    },
    function (err, result) {
      if (err) {
        return res.status(500).send("Update error in user");
      } else {
        return res.status(200).send("Successfully removed course");
      }
    }
  );
};

module.exports = {
  saveCourses,
  getSavedCourses,
  removeSavedCourses,
};
