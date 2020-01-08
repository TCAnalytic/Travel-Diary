import React, { Component } from 'react';

function Image({clickedMarker}){
  let images = [];
  if (clickedMarker.imgURL) {
    
    for (let i = 0; i < clickedMarker.imgURL.length; i += 1) {
    let img = clickedMarker.imgURL[i];
    console.log(img)
    images.push(<img src={img} key={i}/>)
  }
  }
  
  return(
    <div>
        

        {images}

    </div>
  )
}

export default Image;