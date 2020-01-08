import React, { Component } from 'react';

const Box = ({clickedMarker}) =>{
  return(
    <div className = "markerInfoBox">
      <p>
      tag: {clickedMarker.tag}
      </p>
      <p>
      description: {clickedMarker.description}
      </p>
    </div>
  )
}

export default Box;