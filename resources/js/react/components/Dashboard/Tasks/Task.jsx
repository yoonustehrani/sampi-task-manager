import React, { Component } from 'react';
import { setPriority, redirectTo } from '../../../../helpers'

class Task extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { index, title, group, finished_at, priority_id, due_to, workspace, workspace_id, workspace_route, workspaces_users, users } = this.props;
        return (
            <tr className="animated fadeIn" onClick={this.props.onClick}>
                <th scope="row">{ index + 1 }</th>
                <td>{title}</td>
                <td className="text-right">
                    <img className="workspace_avatar" src={APP_PATH + workspace.avatar_pic} />
                    <a href={workspace_route.replace('workspaceId', workspace_id)}>{workspace.title}</a>
                </td>
                <td>{group}</td>
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
                                                    <img src={user.avatar_pic !== null ? APP_PATH + user.avatar_pic : APP_PATH + 'images/male-avatar.svg'} />
                                                </div>
                                                <div className="user-info ml-2">
                                                    <p>{ user.fullname }</p>
                                                    <a href={"#user"}>@{user.name}</a>
                                                </div>
                                            </div>
                                            <div className="user-label-container">
                                                    {
                                                    workspaces_users && workspaces_users[workspace.id][user.id].is_admin === 1 
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
                <td>{setPriority(priority_id)}</td>
                <td>{due_to !== null ? moment(due_to).fromNow() : <i className="fas fa-calendar-minus  fa-3x"></i>}</td>
                <td>
                    {finished_at === null ? <i className="fas fa-times-circle fa-3x"></i> : <i className="fas fa-check-circle fa-3x"></i>}
                </td>
                <td>
                {finished_at === null ? <i className="fas fa-calendar-times fa-3x"></i> : moment(finished_at).fromNow()}
                </td>
            </tr>
        );
    }
}

export default Task;