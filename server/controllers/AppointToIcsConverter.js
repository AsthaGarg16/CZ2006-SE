/**
 * Converts arrays of appointment dictionaries to one ICS string.
 *
 * @author: Astha and Runtao
 */

/** Import ical */
const ics = require("ics");

/** @private The start dates of beginnings of teaching weeks*/
const week1 = new Date("2021-01-11T00:00:00");
const week2 = new Date("2021-01-18T00:00:00");
const week3 = new Date("2021-01-25T00:00:00");
const week4 = new Date("2021-02-01T00:00:00");
const week5 = new Date("2021-02-08T00:00:00");
const week6 = new Date("2021-02-15T00:00:00");
const week7 = new Date("2021-02-22T00:00:00");
const week8 = new Date("2021-03-08T00:00:00");
const week9 = new Date("2021-03-15T00:00:00");
const week10 = new Date("2021-03-22T00:00:00");
const week11 = new Date("2021-03-29T00:00:00");
const week12 = new Date("2021-04-05T00:00:00");
const week13 = new Date("2021-04-12T00:00:00");

/** @private Array of the start dates of beginnings of teaching weeks*/
const weekDates = [
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
];

/** @private Dictionary that maps day of week to numbers */
const Day = { MON: 0, TUE: 1, WED: 2, THU: 3, FRI: 4, SAT: 5 };



/**
 * Main controller function called by the route
 *
 * @param {array} req.body.appointments - Array of appointment dictionaries.
 * @return {string} An ICS string.
 */
const createICS = async (req, res) => {
  const appointments = req.body.appointments;

  res.status(200).json(generateEvents(appointments));
};

/**
 * Converts appointments to an ICS string.
 *
 * @param {array} appointments - Array of appointment dictionaries.
 * @return {string} An ICS string or an error message.
 */
function generateEvents(appointments){
    const eventsAdd = editEvents(appointments);
    const { error, value } = ics.createEvents(eventsAdd);
    if (error) {
        return error;
    }
    return value;
}

/**
 * Converts appointments to an array of event dictionaries.
 *
 * @param {array} appointments - Array of appointment dictionaries.
 * @return {array} An array of event dictionaries.
 */
function editEvents(appointments) {
  var events = [];
  var event = { title: "", description: "",  location: "", start: [], end: [] };
  for (var a = 0; a < appointments.length; a++) {
    let i = appointments[a];
    console.log(i);
    var weeklist = i.weekList;
    //get the start date
    //get the weeklist
    for (var j = 0; j < weeklist.length; j++) {
      if (weeklist[j] == 1) {
        var eventObj = event;
        var weekDay = Day[i.day]; // Monday is 0
        eventObj["title"] = i.title + " " + i.type;
        eventObj["description"] = i.group;
        eventObj["location"] = i.location;

        var eventDate = addDays(weekDates[j], weekDay);
        let startDate = new Date(i.startDate);
        let endDate = new Date(i.endDate);
        let sHour = startDate.getHours();
        let eHour = endDate.getHours();
        let sMin = startDate.getMinutes();
        let eMin = endDate.getMinutes();
        
        eventObj["start"] = [
          eventDate.getFullYear(),
          eventDate.getMonth() + 1,
          eventDate.getDate(),
          sHour,
          sMin,
        ];
        eventObj["end"] = [
          eventDate.getFullYear(),
          eventDate.getMonth() + 1,
          eventDate.getDate(),
          eHour,
          eMin,
        ];
        //var dur = i.duration;
        //eventObj['duration'] = {'hours': i.duration, 'minutes':0};
        events.push({ ...eventObj });
      }
    }
  }
  console.log(events);
  return events;
}

/**
 * Adds the specified days to a date.
 *
 * @param {date} date - A date.
 * @return {number} Number of days to add.
 */
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/** @exports the main function */
module.exports.createICS = createICS;
