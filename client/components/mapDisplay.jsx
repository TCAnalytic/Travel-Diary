import React, { Component } from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
} from "react-google-maps";

class MapDisplay extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let currentMarkerList = this.props.markerList;

        return(
            <div>
                This is the mapbox
            </div>
        )
    }
}

export default MapDisplay;