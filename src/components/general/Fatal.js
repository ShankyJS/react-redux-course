import React from "react";
import "../../css/Fatal.css";
const Fatal = props => (
  <div className="page-container center">
    <div
      className="bg"
      style={{ backgroundImage: "url(http://i.giphy.com/l117HrgEinjIA.gif)" }}
    ></div>
    <h1 className="code">{props.message}</h1>
    <button className="btn">
      <a href="/">Return</a>
    </button>
  </div>
);

export default Fatal;
