import React from "react";

export default function Profile() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userName = userData.name;
  const userEmail = userData.email;
  const cos = userData.courseOfStudy;
  const yos = userData.yearOfStudy;
  return (
    <>
      <div>Profile</div>
      <div>Username: {userName}</div>
      <div>Email: {userEmail}</div>
      <div>Course of study: {cos}</div>
      <div>Year of study: {yos}</div>
    </>
  );
}
