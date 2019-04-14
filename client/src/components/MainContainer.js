import React, { Component } from "react";
import Map from "./Map";
import { connect } from "react-redux";
import { getMapDetails } from "../actions";
import Navigation from "./Navigation/Navigation";

class MainContent extends Component {
  componentDidMount() {
      this.props.getMapDetails();
  }
  render() {
      
    return (
      <div className="main-content">
        <Navigation />
        <Map mapInfo={this.props.mapInfo}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(
  mapStateToProps,
  { getMapDetails }
)(MainContent);
