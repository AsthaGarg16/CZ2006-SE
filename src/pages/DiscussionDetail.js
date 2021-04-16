import React, { useState, useEffect } from "react";
import {
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
import { useParams } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import { HiOutlineSave } from "react-icons/hi";
import axios from "axios";

/** This function is used for rendering the comment of a specific course when the user go to the discussion forum page of that course. */
function RenderComments({
  courseCode,
  comments,
  fetchCoursePage,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(
    comments.length === 0 ? "" : comments[0]
  );

  function toggleModal() {
    setIsModalOpen((prevState) => !prevState);
  }

  function handleReplySubmit(values) {
    if (!sessionStorage.getItem("token")) {
      alert("Please login before replying a comment.");
      return;
    }
    const userName = JSON.parse(sessionStorage.getItem("userData")).name;
    axios
      .post("/discuss/reply", {
        courseCode: courseCode,
        commentID: selectedComment.commentID,
        studentID: userName,
        replyBody: values.reply,
      })
      .then((response) => {
        console.log(response.data);
        fetchCoursePage(courseCode);
        setIsModalOpen(false);
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  }

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
                  <b>{selectedComment.studentID}</b>&emsp;
                  {new Date(selectedComment.commentID).toLocaleString()}
                  <br></br>
                  <Card className="bg-light mt-2">
                    <CardBody>
                      {selectedComment.commentBody}
                      <br />
                    </CardBody>
                  </Card>
                </p>
              </CardBody>
            </Card>
            <Row>
              {(() => {
                if (selectedComment.replies != null) {
                  return (
                    <div className="col-12">
                      <Card className="mt-5">
                        <CardHeader className="card-header reply">
                          <b>Reply from others</b>
                        </CardHeader>
                        {selectedComment.replies.map((reply) => {
                          return (
                            <CardBody className="">
                              <Card className="bg-light" key={reply.id}>
                                <CardBody>
                                  <p>
                                    <b>{reply.studentID} </b>
                                    <br></br>
                                    {reply.replyBody}
                                    <br />
                                    Posted on:
                                    {new Date(reply.replyID).toLocaleString()}
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
                          <Button className="submit-button mt-2" type="submit">
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
          <b className="larger-font">Comments</b>
          <div className="float-to-right">
            <CommentForm
              courseCode={courseCode}
              fetchCoursePage={fetchCoursePage}
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
                    <CardBody className="bg-light">
                      <p className="ml-2">
                        <b>{comment.studentID}</b>&emsp;
                        {new Date(comment.commentID).toLocaleString()}
                      </p>
                      <p className="ml-2">
                        {comment.commentBody} <br />
                      </p>
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

/** This function is used for rendering the detail of a course when the user clicks on the course in the discussion forum page. */
function DiscussionDetail(props) {

  const [course, setCourse] = useState(null);

  function fetchCoursePage(courseCode) {
    console.log(courseCode);
    axios
      .post("/discuss/course", { courseCode: courseCode })
      .then((response) => {
        console.log(response);
        setCourse(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  }

  const params = useParams();
  useEffect(() => {
    console.log("FETCHING course");
    fetchCoursePage(params.courseCode);
  }, []);

  if (course) {
    console.log(course.comments);
    const courseTitle = course.courseInfo[0][1];
    const courseAU = course.courseInfo[0][2];
    const courseDescription = course.courseInfo[course.courseInfo.length - 1];
    const remarks = {};
    let prevColName = ""; 
    course.courseInfo.slice(1, course.courseInfo.length - 1).forEach((item) => {
      if (item.length === 2) {
        remarks[item[0]] = [item[1]];
        prevColName = item[0];
      } else if (item.length == 1) {
        remarks[prevColName].push(" " + item[0]);
      }
    });

    function handleSaveCourse(courseCode) {
      console.log(courseCode);
      if (sessionStorage.getItem("token")) {
        const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;
        const reqbody = { email: userEmail, savedCourses: courseCode };
        console.log(reqbody);

        axios
          .put("/saveCourse/saveCourses", reqbody)
          .then((response) => {
            console.log(response.data);
            alert("Course saved!");
          })
          .catch(function (error) {
            if (error.response) {
            }
          });
      } else {
        alert("Please login before saving courses.");
      }
    }

    return (
      <div className="background">
        <div className="empty-space"></div>
        <div className="container">
          <div key={course.id}>
            <Card tag="li">
              <CardBody body className="ml-5 mr-5">
                <div className="mt-5">
                  <Button
                    outline
                    className="discuss-detail-save-button"
                    onClick={() => handleSaveCourse(course.courseCode)}
                  >
                    <span>
                      <HiOutlineSave />
                    </span>
                  </Button>
                  <b className="course-detail-courseCode col-10">
                    {course.courseCode} - {courseTitle}
                  </b>
                </div>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <b>Course Description:</b>
                        </TableCell>
                        <TableCell>
                          <div className="discussion-forum-table">
                            {courseDescription}
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Number of AUs:</b>
                        </TableCell>
                        <TableCell>{courseAU}</TableCell>
                      </TableRow>
                      {Object.keys(remarks).map((key) => {
                        return (
                          <TableRow className="row">
                            <TableCell>
                              <b>{key}</b>
                            </TableCell>
                            <TableCell>
                              <div className="discussion-forum-table">
                                {remarks[key]}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow>
                        <TableCell>
                          <b>Usefulness:</b>
                        </TableCell>
                        <TableCell>
                          <div className="discussion-forum-table">
                            {course.usefulness
                              ? course.usefulness.toPrecision(2)
                              : "No data yet"}
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Easiness:</b>
                        </TableCell>
                        <TableCell>
                          <div className="discussion-forum-table">
                            {course.easiness
                              ? course.easiness.toPrecision(2)
                              : "No data yet"}
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Time Investment:</b>
                        </TableCell>
                        <TableCell>
                          <div className="discussion-forum-table">
                            {course.timeInvestment
                              ? course.timeInvestment.toPrecision(2)
                              : "No data yet"}
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </div>
          <RenderComments
            fetchCoursePage={fetchCoursePage}
            courseCode={course.courseCode}
            comments={course.comments}
          />
        </div>
        <div className="empty-space"></div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default DiscussionDetail;

function valuetext(value) {
  return `${value}°C`;
}

/** This function is used for rendering the comment form for the user to submit a comment regarding the course. */
function CommentForm(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usefulness, setUsefulness] = useState(5);
  const [timeinvestment, setTimeinvestment] = useState(5);
  const [easiness, setEasiness] = useState(5);

  function toggleModal() {
    setIsModalOpen((prevState) => !prevState);
  }

  function handleSubmit(values) {
    if (!sessionStorage.getItem("token")) {
      alert("Please login before posting a comment.");
      return;
    }
    const reqbody = {};

    const userName = JSON.parse(sessionStorage.getItem("userData")).name;
    const userEmail = JSON.parse(sessionStorage.getItem("userData")).email;
    axios
      .post("/discuss/comment", {
        courseCode: props.courseCode,
        studentID: userName,
        commentBody: values.comment,
        studentsRated: userEmail,
        usefulness: usefulness,
        easiness: easiness,
        timeInvestment: timeinvestment,
      })
      .then((response) => {
        console.log(response.data);
        props.fetchCoursePage(props.courseCode);
        alert("Comment successfully added");
        setIsModalOpen(false);
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
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
              <Label htmlFor="comment" md={12} className="col-4">
                Comment
              </Label>
              <div className="col-12">
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="6"
                  className="form-control"
                />
              </div>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10 }}>
                <Button type="submit" className="submit-button col-4">
                  Submit
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
      <Button outline className="submit-button" onClick={toggleModal}>
        Submit Comment
      </Button>
    </div>
  );
}
