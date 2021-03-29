import { bind } from 'lodash';
import React, { Component } from 'react';
import { getUser, setPriority, sweetError, sweetSuccess, getTask } from '../../../helpers';

class Task extends Component {
    constructor(props) {
        super(props);
    }

    hoverStateIcon = (e) => {
        e.stopPropagation()
        e.target.classList.toggle("fas")
        e.target.classList.toggle("far")
    }

    changeTaskState = (taskId, e) => {
        e.stopPropagation()
        e.persist()
        let { toggle_task_state_api } = this.props
        axios.put(toggle_task_state_api.replace("taskId", taskId)).then(res => {
            sweetSuccess("وضعیت اتمام با موفقیت تغییر یافت")
            e.target.classList.toggle("fa-times-circle")
            e.target.classList.toggle("fa-check-circle")
            e.target.parentElement.nextSibling.innerHTML = res.data.finished_at ? moment(res.data.finished_at).fromNow() : '<i class="fas fa-calendar-times fa-3x"></i>'
        }).catch(err => {
            sweetError(err)
        })
    }

    render() {
        let { index, title, group, finished_at, priority_id, due_to, workspace, workspace_id, users, onClick, workspace_users, id, parent_id } = this.props;
        return (
            <tr onClick={onClick} className="animated fadeIn">
                <th scope="row">{ index + 1 }</th>
                <td>{title}</td>
                <td>{group}</td>
                <td>{parent_id ? <a href={getTask(parent_id)}><i className="fas fa-eye fa-2x"></i></a> : <i className="fas fa-eye-slash fa-2x"></i>}</td>
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
                                            <img src={typeof workspace_users !== 'undefined' ? APP_PATH + workspace_users[user.id].avatar_pic : APP_PATH + 'images/user-avatar.png'} />
                                        </div>
                                        <div className="user-info ml-2">
                                            <p>{ user.fullname }</p>
                                            <a href={getUser(user.id)}>@{user.name}</a>
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
                    {finished_at === null ? <i className="fas fa-times-circle fa-3x finished-status-icon" onClick={this.changeTaskState.bind(this, id)} onMouseEnter={this.hoverStateIcon.bind(this)} onMouseLeave={this.hoverStateIcon.bind(this)}></i> : <i className="fas fa-check-circle fa-3x finished-status-icon" onClick={this.changeTaskState.bind(this, id)} onMouseEnter={this.hoverStateIcon.bind(this)} onMouseLeave={this.hoverStateIcon.bind(this)}></i>}
                </td>
                <td>
                    {finished_at === null ? <i className="fas fa-calendar-times fa-3x"></i> : moment(finished_at).fromNow()}
                </td>
            </tr>
        )
    }
}

export default Task;