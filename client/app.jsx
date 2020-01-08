import React, {Component} from "react";
import MapDisplay from './components/mapDisplay.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgList: [],
            userWhiteList: [],
            markerList: [{
                tag: 'food', location: { lat: 45, lng: 45 }, description: 'this tag is a test of tags', imgURL: ['https://res.cloudinary.com/travelappcloud/image/upload/v1578338991/g7e9d1it4zaxsr4ahatz.png']
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
        // Function binds
    }
    render() {

        return(
            // TITLE
            <div>
            <h1 className="title">Dear Travel Diary...</h1>

            {/*THIS IS MAP DISPLAY */}
            <MapDisplay />
            
            </div>
            
        )
    }
}



export default App;
// ========================================
