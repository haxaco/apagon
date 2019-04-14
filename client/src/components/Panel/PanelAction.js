import React, { Component } from "react";
import ReportAction from "./ReportPanel";

class PanelAction extends Component {
    state = {
        showReport: false,
    }


    closeReport = () => {
        this.setState({showReport: false});
    }

  render() {
    return (
      <React.Fragment>
        {this.state.showReport && <ReportAction closeReport={this.closeReport} />}
        <div className="panel-action">
          <div className="panel-action__wrapper">
            <button className="btn action-btn" onClick={() => this.setState({showReport: true})}>Report</button>
            <button className="btn action-btn">See all incident</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PanelAction;
