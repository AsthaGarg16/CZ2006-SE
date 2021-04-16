import React from "react";
import SimpleCarousel from "simple-react-carousel";

/** This function is used for rendering the homepage. */
function Home() {
  return (
    <div className="background">
      <div className="empty-space"></div>
      <div className="homepage-container">
        <SimpleCarousel>
          <div className="carousel-content home-paragraph">
            <h1 className="head1">About MyCal</h1>
            <p>
              MyCal aims to provide users with an easier way to choose their NTU
              courses and plan their timetable without requiring the effort to
              go through all the indices of a course and trying to schedule
              their desired timetable. Currently the NTU stars planner and other
              websites have some functionalities to ease the process of course
              planning but lack of advanced filtering options such as choosing a
              free time slot and fixing a particular course index if the user
              has made up his/her mind to take that particular index are not
              present which leaves the user spending a lot of time and effort
              for a simple task to plan their timetable. With MyCal, the user
              not only gets features such as choosing free time slots, fixing a
              particular course index, getting all possible combinations of the
              selected courses but they can also allow clash for particular
              courses and download their timetable in .ics file to add it to
              their laptop/tablet or mobile phone calendars.
            </p>
            <p>
              But MyCal isnt restricted to just course planning, our Common Free
              time slot generater can take up multiple .ics file and provide the
              user with the common free time among all the uploaded timetables
              which reduces the time spent on asking every member of a group for
              his/her availability for a meeting or an event. Our Discussion
              forum provides a platform for the users to share their views on a
              particular course by adding and replying to comments which
              promotes a healthy and insightful discussion for the students who
              are unsure About which course to take. If the user is still not
              sure about the course then he/she can always chek the rating for
              the course along with getting the top rated courses for each
              programme.
            </p>
          </div>
          <div className="carousel-content">
            <h1 className="head1">Our Functionalities</h1>
            <p>
              We provide the user with an option to choose courses and their
              respective indices, if the user is unsure about which index to
              take then (s)he can simply add the courses and get all possible
              combinations of the courses and their different indices from which
              the user can choose to download the desired timetable in .ics
              format or save that timetable to the users 'saved Timetable' tab
              or do both. <br />
              The user can take benefit from our more options settings which
              allows the user to choose time slots which the user wants free.
              MyCal will take that into consideration and will not compute
              timetable where any of the class timings clashes with the free
              time slot of the user. The user can also <b>allow clash</b> for
              upto 4 courses which will allow timetables to be computed where
              class timings clash for those particular courses but the user
              still wants it since (s)he is convinced that they can get the time
              waiver from the schools who offer those courses. Another feature
              at the users disposal is to <b>fix index</b> of a course(s) which
              will result in timetables with those indexes fixed and different
              combinations involving indices of other courses to be changed and
              moved around the fixed indices.
              <br />
            </p>
            <p>
              Our <b>Discussion forum</b> presents the user with a platform to
              share their views on a particular course/ rate courses and even
              save courses that (s)he plans to take in future semesters. The
              courses displayed can be filtered to view top rated courses from
              each programme and upon clicking any of the course the user can
              view a detailed description about the course
              <br />
              Lastly our '<b>Find Common free time slot</b>' saves the users
              valuable time in asking each and every member of a group for their
              availability for a group meeting by allowing a user to simply
              upload their timetable in .ics format and we will provide the
              common free time slots among all the timetables added.
            </p>
          </div>
        </SimpleCarousel>
      </div>
      <div className="empty-space"></div>
    </div>
  );
}

export default Home;
