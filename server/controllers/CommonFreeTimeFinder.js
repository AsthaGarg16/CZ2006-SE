let timetable_day = {
    8.5: 0,
    9: 0,
    9.5: 0,
    10: 0,
    10.5: 0,
    11: 0,
    11.5: 0,
    12: 0,
    12.5: 0,
    13: 0,
    13.5: 0,
    14: 0,
    14.5: 0,
    15: 0,
    15.5: 0,
    16: 0,
    16.5: 0,
    17: 0,
    17.5: 0,
    18: 0,
    18.5: 0,
    19: 0,
    19.5: 0,
    20: 0,
    20.5: 0,
    21: 0,
    21.5: 0,
    22: 0,
    22.5: 0,
    23: 0,
};
  
let timetable_week = {
    1: { ...timetable_day },
    2: { ...timetable_day },
    3: { ...timetable_day },
    4: { ...timetable_day },
    5: { ...timetable_day },
    6: { ...timetable_day },
};
  
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
  
  
// req.body.appointmentList : consists of 2 arrays, the former one contains all the appointments in the current week;
//                                                  the latter one contains all the appointments in the next week.
// req.body.week : integer representing the current week.
// return [result1, result2] : array result1 holds free time slots in the current week;
//                             array result2 holds free time slots in the next week.
const return_freeTime = async (req, res) => {
    // front end should call this function for each week
    const input_appointment_list = req.body.appointmentList;
    const week = req.body.week; // week must be correct


    res.status(200).json(findForWeek(input_appointment_list, week));
};

function findForWeek(input_appointment_list, week){
    let result1 = [];
    let result2 = [];
  
    if (week == -1) {
      result2 = findFreeTime(input_appointment_list[1], 8);
    } else if (week == 0) {
      result2 = findFreeTime(input_appointment_list[1], 1);
    } else if (week == 13) {
      result1 = findFreeTime(input_appointment_list[0], 13);
    } else if (week != 14) {
      result1 = findFreeTime(input_appointment_list[0], week);
      result2 = findFreeTime(input_appointment_list[1], week + 1);
    }
    return [result1, result2]
}
  
function findFreeTime(appointment_list, week) {
    let resultList = [];
    let timeOccupied = { ...timetable_week };
    for (let i = 0; i < appointment_list.length; i++) {
        console.log("come on");
        let appoint = appointment_list[i];
    
        let start = new Date(appoint.startDate);
        let end = new Date(appoint.endDate);
        let day = start.getDay();
        console.log(day);
        if (start.getMinutes() == 30) {
            start = start.getHours() + 0.5;
        }
        if (end.getMinutes() == 30) {
            end = end.getHours() + 0.5;
        }
        console.log(start, end);
        for (let t = start; t < end; t = t + 0.5) {
            timeOccupied[day.toString()][t.toString()] = 1;
        }
    }
    //console.log(timeOccupied);
    let oldStartTime = 0;
    let oldDay = 0;
    let endTime = 0;
    let start = 0;
    let end = 0;
    let monday = teaching_weeks[week - 1];
    for (let d = 1; d < 7; d++) {
        for (let t = 8.5; t <= 23; t = t + 0.5) {
            if (!timeOccupied[d.toString()][t.toString()]) {
                if (oldDay == 0) {
                // first free time slot
                oldDay = d;
                oldStartTime = t;
                endTime = t + 0.5;
                continue;
                } else if (d == oldDay && t == endTime) {
                // continue the last time slot
                endTime = endTime + 0.5;
                } else {
                // save the last time slot and start a new one
                start = new Date(monday);
                start.setUTCDate(start.getUTCDate() + oldDay - 1);
                start.setHours(Math.floor(oldStartTime));
                if (oldStartTime % 1 == 0.5) {
                    start.setUTCMinutes(30);
                }
                end = new Date(monday);
                end.setUTCDate(end.getUTCDate() + oldDay - 1);
                end.setHours(Math.floor(endTime));
                if (endTime % 1 == 0.5) {
                    end.setUTCMinutes(30);
                }
                let slot = {};
                slot["title"] = "Free";
                slot["startDate"] = start;
                slot["endDate"] = end;
                resultList.push({ ...slot });

                oldDay = d;
                oldStartTime = t;
                endTime = t + 0.5;
                }
            }
        }
    }
    // Add the last free time slot
    start = new Date(monday);
    start.setUTCDate(start.getUTCDate() + oldDay - 1);
    start.setHours(Math.floor(oldStartTime));
    if (oldStartTime % 1 == 0.5) {
      start.setUTCMinutes(30);
    }
    end = new Date(monday);
    end.setUTCDate(end.getUTCDate() + oldDay - 1);
    end.setHours(Math.floor(endTime));
    if (endTime % 1 == 0.5) {
      end.setUTCMinutes(30);
    }
    let slot = {};
    slot["title"] = "Free";
    slot["startDate"] = start;
    slot["endDate"] = end;
    resultList.push({ ...slot });
  
    for (let i = 0; i < resultList.length; i++) {
      resultList[i]["id"] = i;
    }
    //console.log(resultList);
    return resultList;
}
  
module.exports.return_freeTime = return_freeTime;
