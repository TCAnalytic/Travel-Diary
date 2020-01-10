import React, { Component } from 'react';

const Box = ({ clickedMarker }) => {
  return (

    <div className="markerInfoBox">
      <p style={{ fontWeight: "bold" }}>
        Tag:
      </p>
      <p>{clickedMarker.tag}</p>
      <p style={{ fontWeight: "bold" }}>
        Description:
      </p>
      <p> {clickedMarker.description}</p>
    </div>
  )
}

export default Box;
