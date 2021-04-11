import React, { useState } from "react";
import {
  Media,
  Card,
  CardHeader,
  CardBody,
  Button,
  Label,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Control, LocalForm } from "react-redux-form";
import CircularSlider from "@fseehawer/react-circular-slider";
import axios from "axios";

function RenderComments({ courseCode, comments /*, postComment, dishId */ }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState("something");

  function toggleModal() {
    setIsModalOpen((prevState) => !prevState);
  }

  function handleReplySubmit(values) {
    const userid = JSON.parse(sessionStorage.getItem("userData"))._id;
    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;
    alert(
      "User Email: " +
        userEmail +
        "User ID: " +
        userid +
        " Reply: " +
        values.reply +
        "Comment ID: " +
        selectedComment.id +
        "Course code: " +
        selectedComment.courseCode
    );
  }

  // function handleReplySubmit(values) {
  //   const userId = JSON.parse(sessionStorage.getItem("userData"))._id;
  //   const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;
  //   axios
  //     .post("/discuss/reply/:props.courseCode", {
  //       // courseCode: props.courseCode,
  //       studentId: userId,
  //       // studentRated: userEmail,
  //       replyBody: values.reply,
  //       commentID: selectedComment.id
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       if (error.response) {
  //         alert(error.response.data.message);
  //       }
  //     });
  // }

  if (comments != null) {
    return (
      <Card className="comment-card">
        <Modal
          centered
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
          isOpen={isModalOpen}
          toggle={toggleModal}
        >
          <ModalHeader toggle={toggleModal}></ModalHeader>
          <ModalBody className="modal-body">
            <Card>
              <CardHeader className="card-header reply">
                <b>Comment Detail</b>
              </CardHeader>
              <CardBody>
                <p>
                  <b>{selectedComment.author}</b>
                  <br></br>
                  <Card className="bg-light mt-2">
                    <CardBody>{selectedComment.comment}</CardBody>
                  </Card>
                </p>
                <Row htmlFor="usefulness" className="mt-2">
                  <Typography
                    className="col-4"
                    id="usefulness-slider"
                    gutterBottom
                  >
                    Usefulness:
                  </Typography>
                  <Slider
                    value={selectedComment.usefulness}
                    className="col-7"
                    defaultValue={5}
                    aria-labelledby="usefulness-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks={true}
                    min={0}
                    max={10}
                  />
                </Row>
                <Row htmlFor="usefulness" className="mt-2">
                  <Typography
                    className="col-4"
                    id="usefulness-slider"
                    gutterBottom
                  >
                    Easiness:
                  </Typography>
                  <Slider
                    value={selectedComment.easiness}
                    className="col-7"
                    defaultValue={5}
                    aria-labelledby="usefulness-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks={true}
                    min={0}
                    max={10}
                  />
                </Row>
                <Row htmlFor="usefulness" className="mt-2">
                  <Typography
                    className="col-4"
                    id="usefulness-slider"
                    gutterBottom
                  >
                    Time Investment:
                  </Typography>
                  <Slider
                    value={selectedComment.timeinvestment}
                    className="col-7"
                    defaultValue={5}
                    aria-labelledby="usefulness-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks={true}
                    min={0}
                    max={10}
                  />
                </Row>
              </CardBody>
            </Card>
            <Row>
              {(() => {
                if (selectedComment.reply != null) {
                  return (
                    <div className="col-12">
                      <Card className="mt-5">
                        <CardHeader className="card-header reply">
                          <b>Reply from others</b>
                        </CardHeader>
                        {selectedComment.reply.map((reply) => {
                          return (
                            <CardBody className="">
                              <Card className="bg-light" key={reply.id}>
                                <CardBody>
                                  <p>
                                    <b>{reply.author}</b>
                                    <br></br>
                                    {reply.content}
                                  </p>
                                </CardBody>
                              </Card>
                            </CardBody>
                          );
                        })}
                      </Card>
                    </div>
                  );
                } else {
                  return (
                    <div className="col-12">
                      <Card className="mt-5">
                        <CardHeader className="card-header reply">
                          <b>Reply from others</b>
                        </CardHeader>
                        <CardBody>No reply available</CardBody>
                      </Card>
                    </div>
                  );
                }
              })()}
            </Row>
            <Row>
              <div className="col-12">
                <Card className="mt-5">
                  <CardHeader className="card-header reply">
                    <b>Share Your Thought</b>
                  </CardHeader>
                  <CardBody>
                    <LocalForm onSubmit={(values) => handleReplySubmit(values)}>
                      <Row className="form-group">
                        <Label htmlFor="comment" md={12}>
                          Reply
                        </Label>
                        <Col>
                          <Control.textarea
                            model=".reply"
                            id="comment"
                            name="comment"
                            rows="6"
                            className="form-control"
                          />
                          <Button
                            className="mt-2"
                            type="submit"
                            color="primary"
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </LocalForm>
                  </CardBody>
                </Card>
              </div>
            </Row>
          </ModalBody>
        </Modal>
        <CardHeader className="comment-header">
          <div className="row">
            <h4 className="col-9">Comments</h4>
            <CommentForm
              className="col-3"
              courseCode={courseCode} /*postComment={postComment}*/
            />
          </div>
        </CardHeader>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <Tooltip title="Click to view comment detail">
                  <Card
                    className="ml-1 mr-2 mt-2 comment-for-course"
                    onClick={() => {
                      setSelectedComment(comment);
                      toggleModal();
                    }}
                  >
                    <CardBody>
                      <p className="ml-2">
                        <b>{comment.author} </b>
                      </p>
                      <p className="ml-2">{comment.comment}</p>
                    </CardBody>
                  </Card>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </Card>
    );
  } else return <div></div>;
}

function DiscussionDetail(props) {
  // console.log("--debug--");

  // console.log(props);
  // console.log("--debug--");
  const { course } = props;
  console.log(course.comments);
  const courseTitle = course.courseInfo[0][1];
  const courseAU = course.courseInfo[0][2];
  const courseDescription = course.courseInfo[course.courseInfo.length - 1];
  const remarks = {};
  let prevColName = ""; //previous col name
  //loop through courseinfo to get all remarks info
  course.courseInfo.slice(1, course.courseInfo.length - 1).forEach((item) => {
    if (item.length === 2) {
      remarks[item[0]] = [item[1]];
      prevColName = item[0];
    } else if (item.length == 1) {
      remarks[prevColName].push(item[0]);
    }
  });
  // console.log(remarks);

  // function handleSaveCourse(courseCode) {
  //   const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;
  //   axios
  //     .post("/saving/savedCourse", {
  //       userEmail: userEmail,
  //       courseCode: courseCode
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       if (error.response) {
  //         alert(error.response.data.message);
  //       }
  //     });
  // }

  function handleSaveCourse(courseCode) {
    // alert(courseCode);
    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;
    const reqbody = { email: userEmail, savedCourses: courseCode };
    console.log(reqbody);

    axios
      .put("/saveCourse/saveCourses", reqbody)
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          // alert(error.response.data.message);
        }
      });
  }

  const dummy = [
    {
      _id: "60698ef2a1849e93cc1fb606",
      commentID: 1617530610088,
      commentBody: "This course is not so useful",
      replies: [],
    },
    {
      _id: "60699049a1849e93cc1fb614",
      replies: [
        {
          _id: "60699049a1849e93cc1fb615",
          studentID: "U1923232F",
          replyID: 1617530953669,
          replyBody: "Nice!",
        },
      ],
    },
    {
      _id: "60699055a1849e93cc1fb616",
      replies: [
        {
          _id: "60699055a1849e93cc1fb617",
          studentID: "U1923232F",
          replyID: 1617530965229,
          replyBody: "Very Nice!",
        },
      ],
    },
    {
      _id: "606c523f9e786c3ff4289e53",
      commentID: 1617711679654,
      commentBody: "zipeng",
      replies: [],
    },
  ];

  return (
    <div className="background">
      <div className="container">
        {/* <div className="row"> */}
        <div key={course.id} className="mt-1">
          <Card tag="li">
            <CardBody body className="ml-5">
              <div className="row">
                <div className="col-8">
                  <Media heading className="course-detail-courseCode row">
                    <div className="col-9">
                      <Button
                        onClick={() => handleSaveCourse(course.courseCode)}
                      >
                        Save
                      </Button>
                      <b>{course.courseCode}</b>
                    </div>
                    {/* <div className="col-3">{course.courseInfo[0][2]}</div> */}
                  </Media>
                  <Media heading className="course-detail-courseName row">
                    {/* {course.courseInfo[0][1]} */}
                  </Media>
                </div>
                {/* <Button onClick={() => alert(course.courseInfo)}>click</Button> */}
                <div className="col-3">
                  <p className="row mt-2 mb-5">Usefulness:</p>
                  <p className="row mt-2 mb-5">Easiness:</p>
                  <p className="row mt-2 mb-5">Time Investment:</p>
                </div>
                <div className="col-1">
                  <div className="row mb-1">
                    <CircularSlider
                      width={60}
                      dataIndex={course.usefulness}
                      label="savings"
                      hideLabelValue={true}
                      verticalOffset="0.5rem"
                      progressSize={8}
                      trackColor="#fffff"
                      progressColorFrom="#228B22"
                      progressColorTo="#39FF14"
                      trackSize={8}
                      min={0}
                      max={10}
                      knobDraggable={false}
                    />
                    <div className="rating">{course.usefulness} </div>
                  </div>
                  <div className="row mb-1">
                    <CircularSlider
                      width={60}
                      dataIndex={course.easiness}
                      label="savings"
                      hideLabelValue={true}
                      verticalOffset="0.5rem"
                      progressSize={8}
                      trackColor="#fffff"
                      progressColorFrom="#228B22"
                      progressColorTo="#39FF14"
                      trackSize={8}
                      min={0}
                      max={10}
                      knobDraggable={false}
                    />
                    <div className="rating">{course.easiness} </div>
                  </div>
                  <div className="row mb-1">
                    <CircularSlider
                      width={60}
                      dataIndex={course.timeInvestment}
                      label="savings"
                      hideLabelValue={true}
                      verticalOffset="0.5rem"
                      progressSize={8}
                      trackColor="#fffff"
                      progressColorFrom="#228B22"
                      progressColorTo="#39FF14"
                      trackSize={8}
                      min={0}
                      max={10}
                      knobDraggable={false}
                    />
                    <div className="rating">{course.timeInvestment} </div>
                  </div>
                </div>
              </div>
              <p>
                <div className="row">
                  <b className="col-4">Course Title: </b>
                  <div className="col-8">{courseTitle}</div>
                </div>
                <div className="row">
                  <b className="col-4">AU: </b>
                  <div className="col-8">{courseAU}</div>
                </div>
                <div className="row">
                  <b className="col-4">Course Description: </b>
                  <div className="col-8">{courseDescription}</div>
                </div>
                {/* <div className="row">
                  <b className="col-4">Remarks: </b>
                  <div className="col-8">
                    {course.courseInfo.slice(1, course.courseInfo.length)}
                  </div>
                </div> */}

                {Object.keys(remarks).map((key) => {
                  return (
                    <div className="row">
                      <b className="col-4">{key}</b>
                      <div className="col-8">{remarks[key]}</div>
                    </div>
                  );
                })}
                {/* <div className="row">
                  <b className="col-4">{course.courseInfo[1][0]} </b>
                  <div className="col-8">{course.courseInfo[1][1]}</div>
                </div>
                <div className="row">
                  <b className="col-4">{course.courseInfo[2][0]} </b>
                  <div className="col-8">{course.courseInfo[2][1]}</div>
                </div>
                <div className="row">
                  <b className="col-4">Mutually Exclusive With: </b>
                  <div className="col-8">{course.mutuallyExclusive}</div>
                </div>
                <div className="row">
                  <b className="col-4">Exam Schedule:</b>
                  <div className="col-8">{course.examSchedule}</div>
                </div> */}
              </p>
            </CardBody>
          </Card>
        </div>
        {/* </div> */}
        {/* <div className="m-1"> */}
        {/* <div className="row"></div> */}
        <RenderComments
          courseCode={course.courseCode}
          comments={course.comments}
        />
        {/* </div> */}
      </div>
    </div>
  );
}

export default DiscussionDetail;

function valuetext(value) {
  return `${value}°C`;
}

function CommentForm(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usefulness, setUsefulness] = useState(5);
  const [timeinvestment, setTimeinvestment] = useState(5);
  const [easiness, setEasiness] = useState(5);

  function toggleModal() {
    setIsModalOpen((prevState) => !prevState);
  }

  // function handleSubmit(values) {
  //   const userId = JSON.parse(sessionStorage.getItem("userData"))._id;
  //   const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;
  // }

  function handleSubmit(values) {
    // console.log();
    const reqbody = {};

    const userName = JSON.parse(sessionStorage.getItem("userData")).name;
    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;
    axios
      .post("/discuss/comment", {
        courseCode: props.courseCode,
        studentId: userName,
        commentBody: values.comment,
        studentsRated: userEmail,
        usefulness: usefulness,
        easiness: easiness,
        timeInvestment: timeinvestment,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
    // alert(
    //   "CourseCode: " +
    //     props.courseCode +
    //     "Email:" +
    //     userEmail +
    //     "User ID:" +
    //     userId +
    //     " Usefulness: " +
    //     usefulness +
    //     " Easiness: " +
    //     easiness +
    //     "Time Investment " +
    //     timeinvestment +
    //     " Comment: " +
    //     values.comment
    // );
  }

  return (
    <div>
      <Modal size="lg" isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Row htmlFor="usefulness" className="mt-2">
              <Typography className="col-4" id="usefulness-slider" gutterBottom>
                Usefulness:
              </Typography>
              <Slider
                value={usefulness}
                onChange={(event, newVal) => {
                  setUsefulness(newVal);
                }}
                className="col-7"
                defaultValue={5}
                getAriaValueText={valuetext}
                aria-labelledby="usefulness-slider"
                valueLabelDisplay="auto"
                step={1}
                marks={true}
                min={0}
                max={10}
              />
            </Row>

            <Row htmlFor="easiness" className="mt-2">
              <Typography className="col-4" id="easiness-slider" gutterBottom>
                Easiness:
              </Typography>
              <Slider
                value={easiness}
                onChange={(event, newVal) => {
                  setEasiness(newVal);
                }}
                className="col-7"
                defaultValue={5}
                getAriaValueText={valuetext}
                aria-labelledby="easiness-slider"
                valueLabelDisplay="auto"
                step={1}
                marks={true}
                min={0}
                max={10}
              />
            </Row>

            <Row htmlFor="timeinvestment" className="mt-2">
              <Typography
                className="col-4"
                id="timeinvestment-slider"
                gutterBottom
              >
                Time Investment:
              </Typography>
              <Slider
                value={timeinvestment}
                onChange={(event, newVal) => {
                  setTimeinvestment(newVal);
                }}
                className="col-7"
                defaultValue={5}
                getAriaValueText={valuetext}
                aria-labelledby="timeinvestment-slider"
                valueLabelDisplay="auto"
                step={1}
                marks={true}
                min={0}
                max={10}
              />
            </Row>

            <Row classname="form-group">
              <Label htmlFor="comment" md={12}>
                Comment
              </Label>
              <Col md={12}>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="6"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10 }}>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
      <Button className="submit-comment-button" outline onClick={toggleModal}>
        Submit Comment
      </Button>{" "}
    </div>
  );
}
