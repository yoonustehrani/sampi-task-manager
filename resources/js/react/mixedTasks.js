import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MixedTasks from './components/mixed-tasks'

const target = document.getElementById("mixed-tasks-react")
const mixed_tasks_api = target.getAttribute("get-mixed-tasks-api")
const mixed_tasks_search_api = target.getAttribute("data-search")
const get_workspaces_api = target.getAttribute("workspaces-api")
const post_task_api = target.getAttribute("add_task_api")
const logged_in_user_id = parseInt(target.getAttribute("logged-in-user-id"))
const get_all_users = target.getAttribute("get-all-users")
const toggleTaskStateApi = target.getAttribute("toggle-task-state-api")

ReactDOM.render(
    <MixedTasks 
        get_mixed_tasks_api = { mixed_tasks_api }
        mixed_tasks_search = { mixed_tasks_search_api }
        logged_in_user_id = { logged_in_user_id }
        post_task_api = { post_task_api }
        get_workspaces_api = { get_workspaces_api }
        get_all_users = { get_all_users }
        toggle_task_state_api = { toggleTaskStateApi }
    />,
    target
)