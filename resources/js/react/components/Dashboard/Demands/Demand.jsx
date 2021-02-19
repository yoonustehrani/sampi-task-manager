import React, { Component } from 'react'
import { setPriority, redirectTo, getUser } from '../../../../helpers'

export default class Demand extends Component {
    render() {
        let { demand_show_route, task_route, workspace_route, user_profile_route, title, id, task, to, from, workspace, finished_at, messages_count, index, priority, workspaces_users } = this.props
        let targetUser = from ? from : to
        return (
            <tr className="animated fadeIn" onClick={() => redirectTo(demand_show_route.replace("workspaceId", workspace.id).replace("demandId", id))}>
                <th scope="row">{ index }</th>
                <td>{ title }</td>
                <td className="text-right">
                    <img className="workspace_avatar" src={APP_PATH + workspace.avatar_pic} />
                    <a href={workspace_route.replace('workspaceId', workspace.id)}>{workspace.title}</a>
                </td>
                <td>{task !== null ? <a href={task_route.replace("taskId", task.id)}>{ task.title }</a> : <i className="fas fa-minus fa-3x"></i>}</td>
                <td>
                    <div className="employees-container horizontal-centerlize">
                        <span>{targetUser.fullname}</span>
                        <div className="dropdown-users d-none" onClick={(e) => e.stopPropagation()}>
                            <div className="user-dropdown-item animated jackInTheBox">
                                <div className="user-right-flex">
                                    <div className="user-img-container ml-2">
                                        <img src={targetUser.avatar_pic !== null ? APP_PATH + targetUser.avatar_pic : APP_PATH + 'images/male-avatar.svg'} />
                                    </div>
                                    <div className="user-info ml-2">
                                        <p>{ targetUser.fullname }</p>
                                        <a href={getUser(targetUser.id)}>@{targetUser.name}</a>
                                    </div>
                                </div>
                                <div className="user-label-container">
                                    {
                                        workspaces_users && workspaces_users[workspace.id][targetUser.id].is_admin === 1 
                                        ? <button className="btn btn-sm btn-success rtl admin p-1"><span>ادمین<i className="fas fa-user-tie mr-1"></i></span></button>
                                        : <button className="btn btn-sm btn-primary rtl"><span>عضو<i className="fas fa-user mr-1"></i></span></button>
                                    } 
                                </div>
                            </div>                                                
                        </div>
                    </div>
                </td>
                <td>{ messages_count }</td>
                <td>{ priority.title }</td>
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
