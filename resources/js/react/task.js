import React from 'react'
import ReactDOM from 'react-dom'
import ShowTask from './components/Task/index'

const target = document.getElementById("react-show-task")
const taskApi = target.getAttribute("task_api")
const workspaceApi = target.getAttribute("workspace_api")
const loggedInUserId = parseInt(target.getAttribute("logged_in_user_id"))

if (target) {
    ReactDOM.render(
        <ShowTask 
            task_api = { taskApi }
            workspace_api = { workspaceApi }
            logged_in_user_id = {loggedInUserId}
        />
    ,target)
}