import React, {Component} from 'react'


class Navigation extends Component {
    render() {
        return (
            <div className="navigation">
                <div className="navigation__wrapper">
                    <div className="serchbar">
                        <form>
                            <input type="text" className="search-input" placeholder="Serch Address"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navigation;