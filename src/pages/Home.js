import React from "react";
import SimpleCarousel from "simple-react-carousel";

function Home() {
  return (
    <div className="background">
      <div className="empty-space"></div>
      <div className="homepage-container">
        <SimpleCarousel>
          <div className="carousel-content home-paragraph">
            <h1 className="head1">About MyCal</h1>
            <p>
            MyCal aims to provide users with an easier way to choose their NTU courses and plan their timetable without 
            requiring the effort to go through all the indices of a course and trying to schedule their desired timetable. 
            Currently the NTU stars planner and other websites have some functionalities to ease the process of course planning 
            but lack of advanced filtering options such as choosing a free time slot and fixing a particular course index if the user has made 
            up his/her mind to take that particular index are not present which leaves the user spending a lot of time and effort for a simple 
            task to plan their timetable. With MyCal, the user not only gets features such as choosing free time slots, fixing a particular 
            course index, getting all possible combinations of the selected courses but they can also allow clash for particular courses and 
            download their timetable in .ics file to add it to their laptop/tablet or mobile phone calendars.
            </p>
            <p>
              But MyCal isnt restricted to just course planning, our Common Free time slot generater can take up multiple .ics file and provide the 
              user with the common free time among all the uploaded timetables which reduces the time spent on asking every member of a group for 
              his/her availability for a meeting or an event. Our Discussion forum provides a platform for the users to share their views on a particular
              course by adding and replying to comments which promotes a healthy and insightful discussion for the students who are unsure About
              which course to take. If the user is still not sure about the course then he/she can always chek the rating for the course 
              along with getting the top rated courses for each programme.  
            </p>
          </div>
          <div className="carousel-content">
            <h1 className="head1">Our Functionality</h1>
            <p>
              We provide the user with an option to choose courses and their respective indices, if the user is unsure about which index to take
              then (s)he can simply add the courses and get all possible combinations of the courses and their different indices from which the user 
              can choose to download the desired timetable in .ics format or save that timetable to the users 'saved Timetable' tab or do both. <br/>
              The user can take benefit from our more options settings which allows the user to choose time slots which the user wants free. MyCal will
              take that into consideration and will not compute timetable where any of the class timings clashes with the free time slot of the user.
              The user can also <b>allow clash</b> for upto 4 courses which will allow timetables to be computed where class timings clash for those particular
              courses but the user still wants it since (s)he is convinced that they can get the time waiver from the schools who offer those courses.
              Another feature at the users disposal is to <b>fix index</b> of a course(s) which will result in timetables with those indexes fixed and
              different combinations involving indices of other courses to be changed and moved around the fixed indices.<br/>
            </p>
            <p>
              Our <b>Discussion forum</b> presents the user with a platform to share their views on a particular course/ rate courses and even save courses 
              that (s)he plans to take in future semesters. The courses displayed can be filtered to view top rated courses from each programme 
              and upon clicking any of the course the user can view a detailed description about the course<br/>
              Lastly our '<b>Find Common free time slot</b>' saves the users valuable time in asking each and every member of a group for their availability
              for a group meeting by allowing a user to simply upload their timetable in .ics format and we will provide the common free time slots among all the timetables added.
            </p>
          </div>
          {/* <div className="carousel-content">
            <h1 className="head1">React Master Liew</h1>
            <p>
            Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. 
            Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. React Master. Call me master. 
            </p>
          </div> */}
          {/* <div className="carousel-content">
            <h1 className="head1">React Master Liew</h1>
            <p>
              Suspendisse pretium lacus vel massa luctus ultrices. Nam lacinia
              mattis leo, at consequat mi rhoncus quis. Vestibulum in accumsan
              nulla, vel ultrices dolor. Nunc euismod sapien nibh, quis lacinia
              erat aliquet in. Vestibulum blandit orci vel gravida sollicitudin.
              Fusce rhoncus hendrerit neque sit amet tristique. Quisque eu
              fringilla turpis. Vivamus dictum accumsan pharetra. Morbi ac
              fermentum lectus, sed fermentum quam. Suspendisse blandit, lacus
              at posuere congue, risus dolor tristique ante, pellentesque
              accumsan nulla odio varius nisl. Suspendisse varius non augue in
              interdum. Proin eget enim et enim elementum fermentum. Ut at
              pharetra libero. Vivamus elementum diam at velit sodales auctor.
            </p>
            <p>
              Proin ornare aliquet sem, eu tristique lorem. Etiam quis diam
              egestas turpis auctor facilisis. Nunc efficitur, elit eu tincidunt
              venenatis, erat diam dictum arcu, sit amet lacinia velit tortor id
              augue. Vivamus vitae enim mauris. Proin quis arcu sit amet leo
              posuere aliquam a id lacus. Donec vel ligula porttitor, sodales
              neque sit amet, convallis tortor. Nulla magna eros, tincidunt id
              ipsum id, molestie volutpat dui. In vestibulum arcu non mollis
              hendrerit. Aenean quis ante et neque pellentesque sollicitudin.
              Morbi aliquet nibh purus, eu posuere neque scelerisque auctor.
              Nulla ligula augue, mollis in iaculis eu, mattis in enim.
              Phasellus sagittis, leo id accumsan rhoncus, dui eros dignissim
              lectus, sed interdum nisi nibh ac ex. Proin porta sagittis
              ultricies. Phasellus nec ullamcorper libero, a placerat massa.
            </p>
          </div> */}
          {/* <div>
            <h2>Text and Images!?</h2>
            <div>
              <p>Here is a pretty image:</p>
              <img
                src="https://picsum.photos/200/300"
                alt="You can use text and images in the same slide"
              />
            </div>
          </div> */}
        </SimpleCarousel>
        {/* <div className="home-paragraph">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              semper leo et lorem vestibulum, id convallis sem ultricies. Ut
              porttitor enim ligula, ut feugiat diam cursus eu. Phasellus
              molestie rutrum enim vitae iaculis. Proin euismod nec lorem quis
              semper. Nulla eu neque at diam maximus finibus at euismod arcu. In
              nulla neque, varius et erat sit amet, consectetur euismod diam.
              Morbi maximus, ligula at pulvinar feugiat, sem dui posuere augue,
              id blandit felis orci vitae ipsum. Integer ac mollis enim, eu
              mollis nibh. Cras posuere vitae erat eu pellentesque. Vivamus
              ornare, tellus placerat auctor volutpat, quam lorem sodales est,
              at aliquet justo dolor at magna. Phasellus at dignissim turpis.
              Sed erat mi, egestas vel enim quis, porttitor sollicitudin elit.
              Integer laoreet dui tortor, et scelerisque sapien convallis in.
              Proin vitae nulla non sapien auctor sollicitudin.
            </p>
            <p>
              Sed fringilla dui eu ante euismod scelerisque. Curabitur et sapien
              id arcu ullamcorper fringilla ac ut nisi. Praesent quis dui nisl.
              Phasellus ut justo a dolor bibendum vehicula. In molestie ex vitae
              imperdiet vestibulum. Pellentesque tellus augue, accumsan sit amet
              accumsan ut, mattis eget enim. Nunc efficitur pharetra fermentum.
              Duis non neque ante. Donec rutrum auctor ligula quis venenatis.
              Donec at augue neque. Vestibulum tempor semper sollicitudin. Nam
              eleifend eros eget fermentum tempor. Quisque ut nunc magna. Etiam
              malesuada felis nec sem porttitor mattis.
            </p>
            <p>
              Suspendisse pretium lacus vel massa luctus ultrices. Nam lacinia
              mattis leo, at consequat mi rhoncus quis. Vestibulum in accumsan
              nulla, vel ultrices dolor. Nunc euismod sapien nibh, quis lacinia
              erat aliquet in. Vestibulum blandit orci vel gravida sollicitudin.
              Fusce rhoncus hendrerit neque sit amet tristique. Quisque eu
              fringilla turpis. Vivamus dictum accumsan pharetra. Morbi ac
              fermentum lectus, sed fermentum quam. Suspendisse blandit, lacus
              at posuere congue, risus dolor tristique ante, pellentesque
              accumsan nulla odio varius nisl. Suspendisse varius non augue in
              interdum. Proin eget enim et enim elementum fermentum. Ut at
              pharetra libero. Vivamus elementum diam at velit sodales auctor.
            </p>
            <p>
              Proin ornare aliquet sem, eu tristique lorem. Etiam quis diam
              egestas turpis auctor facilisis. Nunc efficitur, elit eu tincidunt
              venenatis, erat diam dictum arcu, sit amet lacinia velit tortor id
              augue. Vivamus vitae enim mauris. Proin quis arcu sit amet leo
              posuere aliquam a id lacus. Donec vel ligula porttitor, sodales
              neque sit amet, convallis tortor. Nulla magna eros, tincidunt id
              ipsum id, molestie volutpat dui. In vestibulum arcu non mollis
              hendrerit. Aenean quis ante et neque pellentesque sollicitudin.
              Morbi aliquet nibh purus, eu posuere neque scelerisque auctor.
              Nulla ligula augue, mollis in iaculis eu, mattis in enim.
              Phasellus sagittis, leo id accumsan rhoncus, dui eros dignissim
              lectus, sed interdum nisi nibh ac ex. Proin porta sagittis
              ultricies. Phasellus nec ullamcorper libero, a placerat massa.
            </p>
          </div> */}
      </div>
      <div className="empty-space"></div>
    </div>
  );
}

export default Home;
