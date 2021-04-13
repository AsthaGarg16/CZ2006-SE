  
// import ical
const ical = require("node-ical");

const week1 = new Date("2021-01-11T00:00:00Z");
const week2 = new Date("2021-01-18T00:00:00Z");
const week3 = new Date("2021-01-25T00:00:00Z");
const week4 = new Date("2021-02-01T00:00:00Z");
const week5 = new Date("2021-02-08T00:00:00Z");
const week6 = new Date("2021-02-15T00:00:00Z");
const week7 = new Date("2021-02-22T00:00:00Z");
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


// req.body.icsList : array of ics file objects.
// req.body.week : integer representing the current week.
// return [result1, result2] : array result1 holds appointment arrays for ics files in the current week;
//                             array result2 holds appointment arrays for ics files in the next week.

const return_appointments = async (req, res) => {
  const ics_list = req.body.icsList;
  const week = req.body.week;

  res.status(200).json(findForWeek(ics_list, week));
};

function findForWeek(ics_list, week){
    let input_ics_list = [];
    let result1 = [];
    let result2 = [];

    for (let i = 0; i < ics_list.length; i++) {
        if (ics_list[i]) {
        input_ics_list.push(ics_list[i]);
        }
    }
    console.log(input_ics_list);

    if (week == -1) {
        for (let i = 0; i < input_ics_list.length; i++) {
        let appointments = getAppointments(input_ics_list[i], 8);
        result2.push([...appointments]);
        }
        //result2 = [8, result2];
    } else if (week == 0) {
        for (let i = 0; i < input_ics_list.length; i++) {
        let appointments = getAppointments(input_ics_list[i], 1);
        result2.push([...appointments]);
        }
        //result2 = [1, result2];
    } else if (week == 13) {
        for (let i = 0; i < input_ics_list.length; i++) {
        let appointments = getAppointments(input_ics_list[i], 13);
        result1.push([...appointments]);
        }
        //result1 = [13, result1];
    } else if (week != 14) {
        console.log("Week" + week);
        for (let i = 0; i < input_ics_list.length; i++) {
        let appointments = getAppointments(input_ics_list[i], week);
        result1.push([...appointments]);
        console.log("result1:");
        console.log(result1);
        }
        //result1 = [week, result1];
        for (let i = 0; i < input_ics_list.length; i++) {
        let appointments = getAppointments(input_ics_list[i], week + 1);
        result2.push([...appointments]);
        console.log("result2:");

        console.log(result2);
        }
    }
    return [result1, result2];
}

function getAppointments(ics, thisWeek) {
    let appointments = [];
    //let data = ical.sync.parseFile(ics);
    let data = ical.sync.parseICS(ics); // string
    for (const ev of Object.values(data)) {
      let event = {};
      //let startDate = new Date(ev.start);
      //console.log(ev.start);
      let startDate = new Date(ev.start);
      //console.log(startDate);
      //startDate=startDate.getDate();
      //console.log(startDate);
      
      let week_start = teaching_weeks[thisWeek - 1];
      let week_end = teaching_weeks[thisWeek];
      if (week_start < startDate && startDate < week_end) {
        //const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        //console.log(`${ev.summary} is in ${ev.location} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('en-GB')}`);
        let summary_tuple = ev.summary.split(" ");
        event["title"] = summary_tuple[0];
        event["type"] = summary_tuple[1];
        //const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        //event["day"] = `${days[startDate.getUTCDay()]}`;
        event["startDate"] = startDate;
        if (ev.end){
            let endDate = new Date(ev.end);
            event["endDate"] = endDate;
        } else if (ev.duration) {
            console.log(ev.duration.split("PT"));

            let time = ev.duration.split("PT")[1];
            let hour_min = time.split("H");
            console.log(hour_min);
            let hour = 0;
            let min = 0;
            if (hour_min.length>1){
                hour = parseInt(hour_min[0]);
                min = parseInt(hour_min[1].split("M")[0]);
            } else {
                min = parseInt(time.split("M")[0]);
            }
            //event["endDate"] = new Date(startDate);
            console.log(hour, min);
            if (!hour) {
                hour = 0;
            }
            if (!min) {
                min = 0;
            }
            event["endDate"] = new Date(startDate.getTime() + min*60000 + hour*3600000);
        } else {
            continue;
        }
        
        event["group"] = ev.description;
        event["location"] = ev.location;
        appointments.push(event);
      }
    }
  
    for (let i = 0; i < appointments.length; i++) {
      appointments[i]["id"] = i;
    }
    return appointments;
}

module.exports.return_appointments = return_appointments;
