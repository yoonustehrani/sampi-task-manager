import React from 'react'
import ReactDom from 'react-dom'
import UserProfile from './components/user-profile/index'

const target = document.getElementById("user-profile-react")
const workspaces = target.getAttribute("workspaces")
const mixedDemands = target.getAttribute("mixed_demands")
const mixedTasks = target.getAttribute("mixed_tasks")

if (target) {
    ReactDom.render(
        <UserProfile
            workspacesApi={workspaces}
            mixedTasksApi={mixedTasks}
            mixedDemandsApi={mixedDemands}
        />,
        target
    )
}