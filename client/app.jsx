
import React from 'react';
import { Component } from "react";
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
// import mapDisplay from './components/testMapDisplay.jsx'
import MapDisplay from './components/mapDisplay.jsx';
import MarkerForm from './components/markerForm.jsx';
import ImageDisplay from './components/imageDisplay.jsx';
import MarkerInfoBox from './components/markerInfoBox.jsx';
// import style from './style.css'
import { Animated } from 'react-animated-css';

//this one renders ya know the app.
export default class App extends Component {
  // CONSTRUCTOR====================================================
  constructor(props) {
    super(props);
    this.state = {
      username: document.cookie.slice(9),
      imgList: [],
      userWhiteList: [],
      markerList: [{
        username: 'test', tag: 'food', location: { lat: 45, lng: 45 }, description: 'this tag is a test of tags', imgURL: ['https://res.cloudinary.com/travelappcloud/image/upload/v1578338991/g7e9d1it4zaxsr4ahatz.png']

      }],
      locationInfo: '',
      tagInfo: '',
      descriptionInfo: '',
      imgURL: '',
      searchTag: '',
      savedTag: '',
      whiteListUserInfo: '',
      clickedMarker: '',
      images: [],
    }

    // FUNCTION BINDS
    this.onChange = this.onChange.bind(this);
    this.onPicChange = this.onPicChange.bind(this);
    this.clickMap = this.clickMap.bind(this);
    this.clickMarker = this.clickMarker.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
  }
  //==================================================================

  onPicChange(e) {
    const files = Array.from(e.target.files)
    // this.setState({ uploading: true })

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
    // console.log(formData)
    // const addtoSQL = 'https://res.cloudinary.com/travelappcloud/image/upload/' 

    fetch('/addImage', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        console.log('just url from res', res)
        // console.log('url returned', res[0].url)
        console.log(this.state.clickedMarker)
        let newURL = [res];
        let clicked = this.state.clickedMarker;
        let oldImgURL = clicked.imgURL;
        console.log('oldurl=', oldImgURL)
        // if (oldImgURL) {
        //     console.log('inside if oldimgurl' , oldImgURL)
        //     oldImgURL.forEach(url => {
        //         newURL.push(oldImgURL)
        //     })
        //     // newURL = newURL.push(oldImgURL)
        // }
        // newURL = newURL.concat(oldImgURL)
        let modifiedMarker = Object.assign(clicked, { imgURL: newURL });

        fetch('/updateMarker', {
          method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify({ ...modifiedMarker, longitude: modifiedMarker.location.lng, latitude: modifiedMarker.location.lat }), // body data type must match "Content-Type" header
          //mode: 'cors', // no-cors, *cors, same-origin
          //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          //redirect: 'follow', // manual, *follow, error
          //referrerPolicy: 'no-referrer', // no-referrer, *client

        })
      })
      .then(images => {
        this.setState({
          images
        }, (images) => {
          //   console.log(images)
        })
      })

  }
  clickMarker(e) {
    // console.log(e)
    // console.log( "Latitude: "+e.latLng.lat()+" "+", longitude: "+e.latLng.lng())
    let clickedMarker = [...this.state.markerList];
    clickedMarker = clickedMarker.filter((marker) => {
      return (marker.location.lat == e.latLng.lat() && marker.location.lng == e.latLng.lng())
    })
    this.setState({ clickedMarker: clickedMarker[0] })
    // console.log('current saved marker' , this.state.clickedMarker)
  }
  clickMap(e) {
    
    // console.log( "Latitude: "+e.latLng.lat()+" "+", longitude: "+e.latLng.lng())
    let newMarker = { username: this.state.username, tag: '', location: { lat: e.latLng.lat(), lng: e.latLng.lng() }, description: '' }
    let newMarkerList = [...this.state.markerList]
    newMarkerList.push(newMarker);
    
    this.setState({ markerList: newMarkerList })
    fetch('/addMarker', {
      
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({ ...newMarker, username: newMarker.username, longitude: newMarker.location.lng, latitude: newMarker.location.lat, savedTag: '' }), // body data type must match "Content-Type" header
      //mode: 'cors', // no-cors, *cors, same-origins
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //redirect: 'follow', // manual, *follow, error q q
      //referrerPolicy: 'no-referrer', // no-referrer, *client

    })
      .then((res) => {
        console.log('inside post then', res)
      })

    ///works but in reality we should be doing fetch/post here instead of changing state

  }
  onChange(e) {
    //takes typed information and sets relevant state
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value }, () => {

      // console.log('after setState onChange', this.state.markerList);
    })
  }
  buttonSubmit() {
    this.setState({ savedTag: this.state.searchTag, searchTag: '' }, () => {
      console.log(`savedTag`, this.state.savedTag);
      console.log(`searchTag`, this.state.searchTag);

    });
  }
  onSubmit(e) {
    //does stuff on forms submits
    //take the stored information and update the state   
    e.preventDefault();
    let clicked = this.state.clickedMarker;
    let imgProps = '';
    // let imgListVar = this.state.imgURL;
    // console.log(this.state.imgURL)
    // imgListVar = imgListVar.split('-');
    // console.log('imglistvariable' , imgListVar)
    // if (imgListVar[0]) {
    //     imgProps = imgListVar

    //     if (clicked.imgURL) {
    //     imgProps = imgListVar.concat(clicked.imgURL)
    //     }
    // }
    console.log('before modified marker', this.state.descriptionInfo)
    let modifiedMarker = Object.assign(clicked, { tag: this.state.tagInfo || clicked.tag, description: this.state.descriptionInfo || clicked.description, });
    console.log('in submit showing modMarker', modifiedMarker, modifiedMarker.description)
    let newMarkerList = [...this.state.markerList];
    newMarkerList = newMarkerList.filter((marker) => {
      return (marker.location.lat !== this.state.clickedMarker.location.lat || marker.location.lng !== this.state.clickedMarker.location.lng)
    })
    newMarkerList.push(modifiedMarker);
    this.setState({ tagInfo: '', descriptionInfo: '', imgURL: '', clickedMarker: '', markerList: newMarkerList }, () => {
      console.log(`after setState for onsubmit`, this.state);
      console.log('before fetch-lng-lat: ', modifiedMarker.location.lng, modifiedMarker.location.lat)
    });
    console.log('before fetch-lng-lat: ', modifiedMarker.location.lng, modifiedMarker.location.lat)
    fetch('/updateMarker', {
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({ ...modifiedMarker, longitude: modifiedMarker.location.lng, latitude: modifiedMarker.location.lat }), // body data type must match "Content-Type" header
      //mode: 'cors', // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //redirect: 'follow', // manual, *follow, error
      //referrerPolicy: 'no-referrer', // no-referrer, *client

    })
      .then((res) => {
        console.log('inside patch then', res)
      })
  }
  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      
      .then((markers) => {
        let newMarkerList;
        markers = markers.markersList;

        newMarkerList = [...this.state.markerList]
        for (let i = 0; i < markers.length; i += 1) {
          let currMarker = markers[i];
          currMarker.location = { lat: parseInt(currMarker.latitude), lng: parseInt(currMarker.longitude) }
          if (currMarker.imgURL) {
            currMarker.imgURL = currMarker.imgURL.concat(currMarker.urls)
          }
          else {
            currMarker.imgURL = [currMarker.urls]
          }
          newMarkerList.push(currMarker)
        }
        //console.log(newUserList)

        // console.log(this.state.markerList)
        // console.log(newMarkerList)

        return this.setState({
          markerList: newMarkerList,
        });
      })
      .catch(err => console.log('users.componentDidMount: get users: ERROR: ', err));
  }
  render() {
    let markerForm;
    let markerInfoBox;
    let imageDisplay;
    if (this.state.clickedMarker) {
      markerForm = <MarkerForm onPicChange={this.onPicChange} imgURL={this.state.imgURL} tagInfo={this.state.tagInfo} locationInfo={this.state.locationInfo} descriptionInfo={this.state.descriptionInfo} onChange={this.onChange} onSubmit={this.onSubmit} />
    }

    if (this.state.clickedMarker.tag || this.state.clickedMarker.description) {
      markerInfoBox = <MarkerInfoBox clickedMarker={this.state.clickedMarker} />
    }
    if (this.state.clickedMarker) {
      imageDisplay = <ImageDisplay clickedMarker={this.state.clickedMarker} />
    }
    return (
      <div id="map">
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <h1 className="title">
            Dear Travel Diary...
              </h1>
        </Animated>
        <div className="centerArea">
          <div className="mapDisplay">
            <MapDisplay savedLocation="" clickedMarker={this.state.clickedMarker} clickMarker={this.clickMarker} clickMap={this.clickMap} markerList={this.state.markerList} onChange={this.onChange} searchTag={this.state.searchTag} buttonSubmit={this.buttonSubmit} savedTag={this.state.savedTag} />
          </div>
          <div className="infoBox">

            <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
              {markerInfoBox}
            </Animated>
            {imageDisplay}
          </div>
        </div>
        {markerForm}
      </div>
    )
  }
}