import React, {Component} from 'react';

class PanelAction extends Component {
    render() {
        return (
            <div className="panel-action">
                <div className="panel-action__wrapper">
                    <button className="btn action-btn">Report</button>
                    <button className="btn action-btn">See all incident</button>
                </div>
            </div>
        )
    }
}

export default PanelAction;