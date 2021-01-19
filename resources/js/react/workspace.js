import React from 'react'
import ReactDOM from 'react-dom'
import Workspace from './components/Workspace'

const target = document.getElementById('workspace-react')
const addTaskApi = target.getAttribute("add_task_api")
const listTasksApi = target.getAttribute("list_tasks_api")
const taskRoute = target.getAttribute("task_route")
const workspaceApi = target.getAttribute("workspace_api")

if (target) {
    ReactDOM.render(
        <Workspace 
            addTaskApi = {addTaskApi}
            list_tasks_api = {listTasksApi}
            taskRoute = {taskRoute}
            workspace_api = {workspaceApi}
        />,
    target)
}