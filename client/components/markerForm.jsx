import React, { Component } from 'react';

const Form = (props) => {
// //locationInfo: '',
// tagInfo: '',
// descriptionInfo: '',
// imgURL:
  return (
  <div className = "form" >
  <form onSubmit ={props.onSubmit}>
    <label>
    Description:
    <textarea id = "description" value={props.descriptionInfo} name="descriptionInfo" rows= "10" onChange = {props.onChange}></textarea>    
    </label>
    <br></br>
    <label>
    Tag:
    <input type = 'text' value= {props.tagInfo} name="tagInfo" onChange = {props.onChange}></input>
    </label>
    <br></br>
    <label>
    Image URL:
    <input type = 'file' id ='multi' value={props.imgURL} name="imgURL" onChange = {props.onPicChange} multiple></input>
    </label>
    <br></br>
    <button type= 'submit'>Submit</button>
  </form>
  </div>
  )
}
export default Form;