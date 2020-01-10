//this is a react component wow

import React, { Component } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import mapStyle from '../mapStyle';
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
class MapDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let currentMarkerList = this.props.markerList;
    let clickMap = this.props.clickMap;
    let clickMarker = this.props.clickMarker;
    if (this.props.savedTag) {
      currentMarkerList = currentMarkerList.filter((marker) => {
        return marker.tag === this.props.savedTag;
      })
    }
    function Map() {
      return (
        <GoogleMap
          onClick={clickMap}
          defaultZoom={4}
          defaultCenter={{ lat: 39.82, lng: -98.57 }}
          defaultOptions={{ styles: mapStyle }}
        >
          {currentMarkerList.map((marker, i) => (
            <Marker
              onClick={clickMarker}
              key={i}
              position={{ lat: marker.location.lat, lng: marker.location.lng }}
            />
          ))
          }



        </GoogleMap>


      )
    }

    const MapWrapped = withScriptjs(withGoogleMap(Map));
    return (
      <div>
        {/* <div>
            <input id ="searchTag" type = "text" name = "searchTag" placeholder="Filter marker by tag" onChange = {this.props.onChange} value={this.props.searchTag}/>
            <button onClick = {this.props.buttonSubmit}>submit</button>
          </div> */}
        <div style={{ width: '100%', height: '60vh' }}>
          <MapWrapped
            googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyANq9H8F3LekACFLwylqb9dGv-Bgj2-kww'}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        </div>
      </div>
    )
  }
}
export default MapDisplay;