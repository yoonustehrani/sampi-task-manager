import React, { Component } from 'react';

class Message extends Component {
    render() {
        let { user } = this.props;
        let {id, fullname} = user;
        return (
            <div className="card mb-3">
                <p className="card-header text-right"><b>{fullname}</b></p>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        );
    }
}

export default Message;