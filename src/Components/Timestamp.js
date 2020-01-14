import React from "react";
import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const Timestamp = ({ createdAt }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-Us");
  const date = new Date(createdAt);
  return <div>{timeAgo.format(date)}</div>;
};

Timestamp.propType = {
  createdAt: PropTypes.string.isRequired
};

export default Timestamp;
