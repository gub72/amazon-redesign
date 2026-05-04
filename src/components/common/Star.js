import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function Star({ text }) {
  return text === "BsStarFill" ? (
    <BsStarFill aria-hidden="true" />
  ) : text === "BsStarHalf" ? (
    <BsStarHalf aria-hidden="true" />
  ) : (
    <BsStar aria-hidden="true" />
  );
}

export default Star;
