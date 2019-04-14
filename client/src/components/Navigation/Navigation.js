import React, { Component } from "react";
import { GoogleComponent } from "react-google-location";
const API_KEY = "AIzaSyCvdgUHoWt0MgqmWmcw-IcMAXMvRLWxcpE";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null
    };
  }
  render() {
    return (
      <div className="navigation">
        <div className="navigation__wrapper">
          <div className="serchbar">
            <GoogleComponent
              apiKey={API_KEY}
              language={"en"}
              country={"country:in|country:us"}
              coordinates={true}
              locationBoxStyle={"custom-style"}
              locationListStyle={"custom-style-list"}
              onChange={e => {
                this.setState({ place: e });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
