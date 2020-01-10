import React, { Component } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';

const Form = (props) => {
  // //locationInfo: '',
  // tagInfo: '',
  // descriptionInfo: '',
  // imgURL:
  return (
    <Container>
      <Col sm="12" md={{ size: 6, offset: 3 }} className="text-left">
        <label>
          Description:
        </label>
        <form onSubmit={props.onSubmit}>
          <textarea style={{ width: '100%' }} id="description" value={props.descriptionInfo} name="descriptionInfo" rows="10" onChange={props.onChange}></textarea>
          <br></br>
          <label>
            Tag:
          </label>
          <Input type='text' value={props.tagInfo} name="tagInfo" onChange={props.onChange}></Input>
          <br></br>
          <label>
            Image URL:
          </label>
          <Input type='file' id='multi' value={props.imgURL} name="imgURL" onChange={props.onPicChange} multiple></Input>
          <br></br>
          <Button color="info" type='submit'>Submit</Button>
        </form>
      </Col>
    </Container>

  )
}
export default Form;