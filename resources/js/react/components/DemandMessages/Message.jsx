import React, { Component } from 'react';
import {getUser} from '../../../helpers';

class Message extends Component {
    render() {
        let { user, text } = this.props;
        let {id, fullname} = user;
        return (
            <div className="card mb-3">
                <p className="card-header text-right d-rtl circle-avatar-pic">
                    <a className="text-dark" href={getUser(user.id)}>
                        <img src={`${APP_PATH}${user.avatar_pic ? user.avatar_pic : 'images/male-avatar.svg'}`} alt=""/>
                        <b className="mr-2">{fullname}</b>
                    </a>
                </p>
                <div className="card-body" dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
        );
    }
}

export default Message;