import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div
      className="d-flex justify-content-center fixed w-full h-full"
      style={{
        zIndex: 100,
        top: 0,
        left: 0,
        backgroundColor: "rgb(240, 240, 240, 0.5)",
      }}
    >
      <div className="verticalCenter">
        <Spinner animation="border" />
      </div>
    </div>
  );
}
