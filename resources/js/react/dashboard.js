import React from 'react'
import ReactDom from 'react-dom'
import Dashboard from './components/Dashboard/index'

const target = document.getElementById('react-dashboard')
const mixedTasks = target.getAttribute("mixed_tasks")
const workspace_route = target.getAttribute("workspace_route")
const task_route = target.getAttribute("task_route")
const workspace_counter = target.getAttribute("workspace_counter")
const task_counter = target.getAttribute("task_counter")
const demand_counter = target.getAttribute("demand_counter")
const workspaces = target.getAttribute("workspaces")
const mixedDemands = target.getAttribute("mixed_demands")
const demand_show_route = target.getAttribute("demand-show-route")
const user_profile_route = target.getAttribute("user-profile-route")

if (target) {
    ReactDom.render(
        <Dashboard
            mixedTasksApi={mixedTasks}
            workspace_route={workspace_route}
            task_route={task_route}
            workspace_counter={workspace_counter}
            task_counter={task_counter}
            demand_counter={demand_counter}
            workspacesApi={workspaces}
            mixedDemandsApi={mixedDemands}
            demand_show_route={demand_show_route}
            user_profile_route={user_profile_route}
        />
    ,target)
}