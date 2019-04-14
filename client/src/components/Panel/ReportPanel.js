import React, { Component } from "react";
import { postReport } from "../../actions";
import { connect } from "react-redux";
import { GoogleComponent } from "react-google-location";
const API_KEY = "AIzaSyCvdgUHoWt0MgqmWmcw-IcMAXMvRLWxcpE";

class ReportAction extends Component {
  state = {
    location: "",
    cat: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    const { location, cat } = this.state;
    this.props.postReport({ location, cat });
  };
  render() {
    console.log(this.state.location);
    return (
      <div className="report-panel">
        <div className="fade" onClick={() => this.props.closeReport()} />
        <div className="report-panel__wrapper">
          <form onSubmit={e => this.handleSubmit(e)}>
            <GoogleComponent
              apiKey={API_KEY}
              language={"en"}
              //   country={"country:in|country:ve"}
              coordinates={true}
              //   locationBoxStyle={"custom-style"}
              //   locationListStyle={"custom-style-list"}
              onChange={e => this.setState({ location: e.target })}
            ></GoogleComponent>
            {/* <input type="text" placeholder="Address" onChange={e => this.setState({location: e.target.value })}/> */}
            <input
              type="type"
              placeholder="Category"
              onChange={e => this.setState({ cat: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { postReport }
)(ReportAction);
