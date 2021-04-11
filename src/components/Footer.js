import React from "react";
import { IconContext } from "react-icons";

function Footer() {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="footer-title">
            <i>MyCal by Xeon</i>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Footer;
