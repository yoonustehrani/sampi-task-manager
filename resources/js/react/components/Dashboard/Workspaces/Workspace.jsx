import React, { Component } from 'react';
import { getUser, getWorkspace, redirectTo } from '../../../../helpers';

class Workspace extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { index, avatar_pic, title, users, tasks_count, finished_tasks_count, demands_left_count, workspace_url, id } = this.props;
        return (
            <tr className="animated fadeIn" onClick={() => redirectTo(getWorkspace(id))}>
                <a href={getWorkspace(id)} className="d-contents">
                    <th scope="row">{ index + 1 }</th>
                    <td className="text-right">
                        <img className="workspace_avatar" src={APP_PATH + (avatar_pic ? avatar_pic : "images/idea.svg")} />
                        <a href={workspace_url}>{ title }</a>
                    </td>
                    <td>
                        <div className="employees-container horizontal-centerlize">
                            {
                                users.length === 0 &&
                                    <i className="fas fa-user-slash"></i>
                            }
                            {
                                users.length === 1 &&
                                    <span>{ users.length }<i className="fas fa-user mr-2"></i></span>
                            }
                            {
                                users.length > 1 &&
                                    <span>{ users.length }<i className="fas fa-users mr-2"></i></span>
                            }
                            <div className="dropdown-users d-none" onClick={(e) => e.stopPropagation()}>
                                {
                                    users.length >= 1 &&
                                        users.map((user, i) => (
                                            <div key={i} className="user-dropdown-item animated jackInTheBox">
                                                <div className="user-right-flex">
                                                    <div className="user-img-container ml-2">
                                                        <img src={user.avatar_pic !== null ? APP_PATH + user.avatar_pic : APP_PATH + 'images/user-avatar.png'} />
                                                    </div>
                                                    <div className="user-info ml-2">
                                                        <p>{ user.fullname }</p>
                                                        <a href={getUser(user.id)}>@{user.name}</a>
                                                    </div>
                                                </div>
                                                <div className="user-label-container">
                                                        {
                                                            user.pivot.is_admin === 1 
                                                            ? <button className="btn btn-sm btn-success rtl admin"><span>ادمین<i className="fas fa-user-tie mr-1"></i></span></button>
                                                            : <button className="btn btn-sm btn-primary rtl"><span>عضو<i className="fas fa-user mr-1"></i></span></button>
                                                        } 
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                    </td>
                    <td className="no-break">
                        کل : <span className="badge badge-primary ml-md-4 d-block d-md-inline mb-1 mb-md-0">{ tasks_count }</span>
                        اتمام : <span className="badge badge-success ml-md-4 d-block d-md-inline mb-1 mb-md-0">{ finished_tasks_count }</span>
                        باقی مانده : <span className="badge badge-danger ml-md-4 d-block d-md-inline mb-1 mb-md-0">{ tasks_count - finished_tasks_count }</span>
                    </td>
                    <td>
                        { demands_left_count }
                    </td>
                </a>
            </tr>
        );
    }
}

export default Workspace;