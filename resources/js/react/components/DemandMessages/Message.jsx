import React, { Component } from 'react';
import {getUser} from '../../../helpers';
import moment from 'moment-jalaali';
moment.locale('fa')

class Message extends Component {
    render() {
        let { user, text, created_at } = this.props;
        return (
            <div className="card mb-3">
                <p className="card-header text-right d-rtl circle-avatar-pic">
                    {user
                        ? <a className="text-dark" href={getUser(user.id)}>
                            <img src={`${APP_PATH}${user.avatar_pic ? user.avatar_pic : 'images/male-avatar.svg'}`} alt=""/>
                            <b className="mr-2">{user.fullname}</b>
                        </a>
                        : null
                    }
                    {created_at
                        ? <span className="float-left text-left">{moment(created_at).format('dddd jYYYY/jMM/jDD H:m:s')} <i className="far fa-clock"></i></span>
                        : <span className="float-left text-left">در حال ارسال <i className="far fa-clock"></i></span>
                    }
                </p>
                <div className="card-body" dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
        );
    }
}

export default Message;