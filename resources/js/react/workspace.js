import React from 'react'
import ReactDOM from 'react-dom'
import Workspace from './components/Workspace/index'

const target = document.getElementById('workspace-react')
const addTaskApi = target.getAttribute("add_task_api")
const listTasksApi = target.getAttribute("list_tasks_api")
const taskRoute = target.getAttribute("task_route")
const workspaceApi = target.getAttribute("workspace_api")
const loggedInUserId = parseInt(target.getAttribute("logged_in_user_id"))
const get_all_users = target.getAttribute("get-all-users")
const toggleTaskStateApi = target.getAttribute("toggle-task-state-api")

if (target) {
    ReactDOM.render(
        <Workspace 
            add_task_api = {addTaskApi}
            list_tasks_api = {listTasksApi}
            taskRoute = {taskRoute}
            workspace_api = {workspaceApi}
            logged_in_user_id = {loggedInUserId}
            get_all_users = { get_all_users }
            toggle_task_state_api = { toggleTaskStateApi }
        />,
    target)
}