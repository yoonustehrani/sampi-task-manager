import React from 'react'
import ReactDOM from 'react-dom'
import ShowTask from './components/Task/index'

const target = document.getElementById("react-show-task")
const taskApi = target.getAttribute("task_api")
const workspaceApi = target.getAttribute("workspace_api")
const loggedInUserId = parseInt(target.getAttribute("logged_in_user_id"))
const editTaskApi = target.getAttribute("edit_task_api")
const toggleTaskStateApi = target.getAttribute("toggle_task_state_api")
const deleteTask = target.getAttribute("destroy-task")

if (target) {
    ReactDOM.render(
        <ShowTask 
            task_api = { taskApi }
            workspace_api = { workspaceApi }
            logged_in_user_id = { loggedInUserId }
            edit_task_api = { editTaskApi }
            toggle_task_state_api = { toggleTaskStateApi }
            delete_task_api = { deleteTask }
        />
    ,target)
}