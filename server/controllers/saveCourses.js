const savedCourse = require('../models/savedCourse');

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

const saveCourses = async(req,res)=>{
    const{email,savedCourses} = req.body; 
    try {
        const oldUser = await savedCourse.findOne({ email });
    
        if (oldUser) 
        {
          const filter = { email: email };
          const updatePass = {
            $set: {
              savedCourse:
                savedCourses
            },
          };
          const result = await savedCourse.updateOne(filter, updatePass);
          console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
         
          return res.status(200).json({ message: "saved Courses updated" });
      }
      else{
        const result = await savedCourse.create({ email, savedCourse: savedCourses});

      }
        
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
      }
    
};

const removeSavedCourses = async(req,res)=>{
    savedCourse.update({email: req.body.userEmail},
        {
            $pull:{
                savedCourse: req.body.savedCourse
            },
        },  function(
            err,
            result
        ) {
            if (err) {
               return res.status(500).send("Update error in user")
            }
            else{
                return res.status(200).send('Successfully removed course');
            }
        })
}

module.exports = {
    saveCourses,
    removeSavedCourses
};