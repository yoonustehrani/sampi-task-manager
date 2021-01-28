import React, { Component } from 'react';
import { setPriority, redirectTo } from '../../../../helpers'

class Task extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { index, title, group, finished_at, priority_id, due_to, workspace, workspace_id, workspace_route } = this.props;
        return (
            <tr className="animated fadeIn" onClick={this.props.onClick}>
                <th scope="row">{ index + 1 }</th>
                <td>{title}</td>
                <td className="text-right">
                    <img className="workspace_avatar" src={APP_PATH + workspace.avatar_pic} />
                    <a href={workspace_route.replace('workspaceId', workspace_id)}>{workspace.title}</a>
                </td>
                <td>{group}</td>
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