
class ClashPlanner {

    timetable_MON = {
        "0830": {}, "0900": {}, "0930": {}, "1000": {}, "1030": {}, "1100": {}, "1130": {}, "1200": {}, "1230": {}, "1300": {}, 
        "1330": {}, "1400": {}, "1430": {}, "1500": {}, "1530": {}, "1600": {}, "1630": {}, "1700": {}, "1730": {}, "1800": {}, 
        "1830": {}, "1900": {}, "1930": {}, "2000": {}, "2030": {}, "2100": {}, "2130": {}, "2200": {}, "2230": {}, "2300": {}, 
    };
    timetable_TUE = {
        "0830": {}, "0900": {}, "0930": {}, "1000": {}, "1030": {}, "1100": {}, "1130": {}, "1200": {}, "1230": {}, "1300": {}, 
        "1330": {}, "1400": {}, "1430": {}, "1500": {}, "1530": {}, "1600": {}, "1630": {}, "1700": {}, "1730": {}, "1800": {}, 
        "1830": {}, "1900": {}, "1930": {}, "2000": {}, "2030": {}, "2100": {}, "2130": {}, "2200": {}, "2230": {}, "2300": {}, 
    };
    timetable_WED = {
        "0830": {}, "0900": {}, "0930": {}, "1000": {}, "1030": {}, "1100": {}, "1130": {}, "1200": {}, "1230": {}, "1300": {}, 
        "1330": {}, "1400": {}, "1430": {}, "1500": {}, "1530": {}, "1600": {}, "1630": {}, "1700": {}, "1730": {}, "1800": {}, 
        "1830": {}, "1900": {}, "1930": {}, "2000": {}, "2030": {}, "2100": {}, "2130": {}, "2200": {}, "2230": {}, "2300": {}, 
    };
    timetable_THU = {
        "0830": {}, "0900": {}, "0930": {}, "1000": {}, "1030": {}, "1100": {}, "1130": {}, "1200": {}, "1230": {}, "1300": {}, 
        "1330": {}, "1400": {}, "1430": {}, "1500": {}, "1530": {}, "1600": {}, "1630": {}, "1700": {}, "1730": {}, "1800": {}, 
        "1830": {}, "1900": {}, "1930": {}, "2000": {}, "2030": {}, "2100": {}, "2130": {}, "2200": {}, "2230": {}, "2300": {}, 
    };
    timetable_FRI = {
        "0830": {}, "0900": {}, "0930": {}, "1000": {}, "1030": {}, "1100": {}, "1130": {}, "1200": {}, "1230": {}, "1300": {}, 
        "1330": {}, "1400": {}, "1430": {}, "1500": {}, "1530": {}, "1600": {}, "1630": {}, "1700": {}, "1730": {}, "1800": {}, 
        "1830": {}, "1900": {}, "1930": {}, "2000": {}, "2030": {}, "2100": {}, "2130": {}, "2200": {}, "2230": {}, "2300": {}, 
    };
    timetable_SAT = {
        "0830": {}, "0900": {}, "0930": {}, "1000": {}, "1030": {}, "1100": {}, "1130": {}, "1200": {}, "1230": {}, "1300": {}, 
        "1330": {}, "1400": {}, "1430": {}, "1500": {}, "1530": {}, "1600": {}, "1630": {}, "1700": {}, "1730": {}, "1800": {}, 
        "1830": {}, "1900": {}, "1930": {}, "2000": {}, "2030": {}, "2100": {}, "2130": {}, "2200": {}, "2230": {}, "2300": {}, 
    };

    full_timetable = {
        "MON": this.timetable_MON,
        "TUE": this.timetable_TUE,
        "WED": this.timetable_WED,
        "THU": this.timetable_THU,
        "FRI": this.timetable_FRI,
        "SAT": this.timetable_SAT
    };

    courseArray= [];

    //Functions

    checkClash (newIndex){ 
        var clashCourses = []
        var newLessonList = newIndex.lesson;
        for (var l = 0; l < newLessonList.length; l++){
            var day = newLessonList[l].day;
            var t = parseInt(newLessonList[l].start);
            var end = parseInt(newLessonList[l].end);

            while (t < end){
                var t_str = t.toString();
                if (t < 1000){
                    var t_str = "0" + t_str;
                }
                var timeslotDic = this.full_timetable[day][t_str]; // Dic -> {"code": lesson}, lesson -> [type, weekList]
                if (Array.isArray(timeslotDic)){
                    return 0; // already an event here -> clash not acceptable
                }
                var newLesson = [newLessonList[l].type, newLessonList[l].weekList];
                if (Object.keys(timeslotDic).length == 1){ 
                    var oldCode = Object.keys(timeslotDic)[0];
                    var oldLesson = timeslotDic[oldCode];
                    for (var i = 0; i < 13; i++){
                        if (oldLesson[1][i] && newLesson[1][i]){ // compare weeks
                            if (oldLesson[0]=="LEC/STUDIO" || newLesson[0]=="LEC/STUDIO"){ 
                                if (!clashCourses.includes(oldCode)){
                                    clashCourses.push(oldCode); // clash acceptable
                                }
                            } else { // no lecture
                                return 0; // clash not acceptable
                            }
                        }
                        // no clash
                    }
                } else if (Object.keys(timeslotDic).length == 2){
                    return 0; // clash not acceptable
                }

            if (t_str.endsWith("30")){
                t = t + 70;
            } else {
                t = t + 30;
            }
            }
        } 
        return clashCourses; 
        
    }

    removeIndex (code, indexObj){
        var oldLessonList = indexObj.lesson;
        for (var l = 0; l < oldLessonList.length; l++){
            var day = oldLessonList[l].day;
            var t = parseInt(oldLessonList[l].start);
            var end = parseInt(oldLessonList[l].end);
            
            while (t < end){
                var t_str = t.toString();
                if (t < 1000){
                    var t_str = "0" + t_str;
                }
                delete this.full_timetable[day][t_str][code];

                if (t_str.endsWith("30")){
                    t = t + 70;
                } else {
                    t = t + 30;
                }
            }
            
        }
    }

    addIndex (code, indexObj){
        var newLessonList = indexObj.lesson;
        for (var l = 0; l < newLessonList.length; l++){
            var day = newLessonList[l].day;
            var t = parseInt(newLessonList[l].start);
            var end = parseInt(newLessonList[l].end);
            
            while (t < end){
                var t_str = t.toString();
                if (t < 1000){
                    var t_str = "0" + t_str;
                }
                this.full_timetable[day][t_str][code] = [newLessonList[l].type,
                                                    newLessonList[l].weekList] ;

                if (t_str.endsWith("30")){
                    t = t + 70;
                } else {
                    t = t + 30;
                }
            }
        }
    }
        

    // 1. Select an index for each course such that there are 
    // no more than 2 courses at each time slot
    // DFS
    //input: full_timetable (fixed index & free time slots & index planned), 
    plan() {
        var result_array = {
            "0" : [],
            "2" : [],
            "3" : [],
            "4" : []
        }
        // Initialize DFS searching progress and clashes after each course is added
        var progress = [];
        var clash_array = []; // store the course codes involved in clashes
        for (var c = 0; c < this.courseArray.length; c++){
            progress[c] = -1;
        }

        // DFS
        for (var c = 0; c < this.courseArray.length; c++){ // choose course
            var courseObject = this.courseArray[c];
            //console.log(courseObject.courseCode);
            var accept = false;
            // remove old index from timetable
            if (progress[c] != -1){ // remove old index
                this.removeIndex(courseObject.courseCode, courseObject.index[progress[c]]);
            }
            for (var i = progress[c] + 1; i < courseObject.index.length; i++){ // choose index
                //console.log(courseObject.index[i].index_number);
                // reset clash array for this course
                if (c == 0){
                    clash_array[c] = []; 
                } else {
                    clash_array[c] = [...clash_array[c-1]];
                    //console.log(clash_array[c]);
                }
                accept = false;
                var indexObject = courseObject.index[i];
                var condition = this.checkClash(indexObject);
                //console.log(condition);
                if (Array.isArray(condition)){ // Acceptable
                    if (condition.length > 0){ // clash 
                        for (var ci = 0; ci < condition.length; ci ++){
                            if (!clash_array[c].includes(condition[ci])){
                                clash_array[c].push(condition[ci]);
                            }
                        }
                        clash_array[c].push(courseObject.courseCode);
                        //console.log(clash_array);
                        if (clash_array[c].length > 4){ // At most 4 courses are allowed in clashes; New course is not counted in num_clashCourses
                            continue; // next index
                        } 
                    }
                    // found an index
                    progress[c] = i;
                    if (c == this.courseArray.length - 1){ // Last course
                        var num_clashCourses = clash_array[c].length;
                        result_array[num_clashCourses].push([...progress]); // Record an index set
                        //console.log(progress);
                        continue;
                    }
                    this.addIndex(courseObject.courseCode, indexObject);
                    //console.log(" added");
                    accept = true;
                    break;
                } 
                // unacceptable clash -> continue
            }
            if (!accept) { // All indexes of the course fail here / All indexes have been tested
                if (c == this.courseArray.length - 1){ // Last course
                    progress[c] = -1; // Reset progress for this course
                } else {
                    if (progress[c] != -1){ // remove old index
                        this.removeIndex(courseObject.courseCode, courseObject.index[progress[c]]);
                    }
                    progress[c] = -1;
                }
                
                if (c == 0){ // All combinations have been tested 
                    break;
                }
                c = c - 2; // Go to the last course
            } 
        }

        // Constructing data to return
        return this.generateResults(result_array);
        
    }


    //
    generateResults(result_array){
        let result = {};
        let catgry = Object.keys(result_array);
        for (var i = 0; i < catgry.length; i++){
            result[catgry[i]] = [];
            for (var t = 0; t < result_array[catgry[i]].length; t++){ 
                let index_dic = {};
                let combination = result_array[catgry[i]][t];
                for (var c = 0; c < combination.length; c++){
                    index_dic[this.courseArray[c].courseCode] = this.courseArray[c].index[combination[c]].index_number;
                }
                result[catgry[i]].push(index_dic);
            }
        }
        console.log(result['0'].length) // test
        console.log(result['2'].length)
        return result;
    }



    main(clash_courses) {
        //this.full_timetable = timetable;
        this.courseArray = clash_courses; 
        return this.plan();
    }
}

module.exports = ClashPlanner;

// Test 
//document.write("testing\n");

//const courses = require("./oldData.js");
const courses = require("./data.js");

const test = new ClashPlanner();
let a = test.main(courses);

// This script can run on its own
