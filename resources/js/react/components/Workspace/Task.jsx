import React, { Component } from 'react';

class Task extends Component {
    render() {
        let { id, title, group, finished_at, priority_id, due_to, workspace, workspace_id, users } = task
        return (
            <tr key={i} onClick={() => redirectTo(taskRoute.replace("taskId", id))} className="animated fadeIn">
                <th scope="row">{ i + 1 }</th>
                <td>{title}</td>
                <td>{group}</td>
                <td>{setPriority(priority_id)}</td>
                <td>
                    <div className="employees-container horizontal-centerlize">
                        { users.length === 0 && <span><i className="fas fa-user-slash"></i></span> }
                        { users.length === 1 && <span>{ users.length }<i className="fas fa-user mr-2"></i></span> }
                        { users.length > 1 && <span>{ users.length }<i className="fas fa-users mr-2"></i></span> }
                        <div className="dropdown-users d-none" onClick={(e) => e.stopPropagation()}>
                            { users.length >= 1 && users.map((user, i) => (
                                <div key={i} className="user-dropdown-item border-sharp animated jackInTheBox">
                                    <div className="user-right-flex">
                                        <div className="user-img-container ml-2">
                                            <img src={typeof workspace_users !== 'undefined' ? APP_PATH + workspace_users[user.id].avatar_pic : APP_PATH + 'images/male-avatar.svg'} />
                                        </div>
                                        <div className="user-info ml-2">
                                            <p>{ user.fullname }</p>
                                            <a href={"#user"}>@{user.name}</a>
                                        </div>
                                    </div>
                                    <div className="user-label-container">
                                        {

                                            typeof workspace_users !== 'undefined' && workspace_users[user.id].is_admin === 1 ? <button className="btn btn-sm btn-success rtl admin"><span>ادمین<i className="fas fa-user-tie mr-1"></i></span></button>
                                            : <button className="btn btn-sm btn-primary rtl"><span>عضو<i className="fas fa-user mr-1"></i></span></button>
                                        } 
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </td>
                <td>{due_to !== null ? moment(due_to).fromNow() : <i className="fas fa-calendar-minus  fa-3x"></i>}</td>
                <td>
                    {finished_at === null ? <i className="fas fa-times-circle fa-3x"></i> : <i className="fas fa-check-circle fa-3x"></i>}
                </td>
                <td>
                    {finished_at === null ? <i className="fas fa-calendar-times fa-3x"></i> : moment(finished_at).fromNow()}
                </td>
            </tr>
        )
    }
}

export default Task;