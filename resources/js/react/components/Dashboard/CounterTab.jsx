import React, { Component } from 'react';
import { Levels, Digital } from 'react-activity'

class CounterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.Title,
            icon: props.Icon,
            custom_class: props.CustomClasses
        }
    }
    render() {
        let item = this.props.Item;
        let {title, icon, custom_class} = this.state;
        return (
            <div className={`float-left animated pulse col-md-3 col-12 ${custom_class}`}>
                <a href={item ? item.href : "#"} className="item-link">
                    <i className={`float-right dashboard-item ${icon} fa-3x`}></i>
                    <div>
                        <span className="float-right dashboard-item">{item ? item.count : <Levels color="#ffffff" /> }</span>
                        <span className="float-right dashboard-item">{title}</span>
                    </div>
                </a>
            </div>
        );
    }
}

export default CounterTab;