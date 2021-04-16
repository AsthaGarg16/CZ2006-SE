import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Card, CardHeader, CardBody } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

/** This function is used for rendering the profile page. */
export default function Profile() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userName = userData.name;
  const userEmail = userData.email;
  const cos = userData.courseOfStudy;
  const yos = userData.yearOfStudy;
  const classes = useStyles();

  return (
    <>
      <div className="background">
        <div className="empty-space"></div>
        <div className="container">
          <Card>
            <CardHeader>Profile</CardHeader>
            <div className="row">
              <div className="col-3">
                <div className="profile-pic">
                  <CardBody>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                      className={classes.large}
                    ></Avatar>
                  </CardBody>
                </div>
              </div>
              <div className="col-9">
                <CardBody>Username: {userName}</CardBody>
                <CardBody>Email: {userEmail}</CardBody>
                <CardBody>Course of study: {cos}</CardBody>
                <CardBody>Year of study: {yos}</CardBody>
              </div>
            </div>
          </Card>
        </div>
        <div className="empty-space"></div>
      </div>
    </>
  );
}
