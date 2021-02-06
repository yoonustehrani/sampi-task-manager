import React from 'react'
import ReactDom from 'react-dom'
import UserProfile from './components/user-profile/index'

const target = document.getElementById("user-profile-react")
const workspaces = target.getAttribute("workspaces")
const mixedDemands = target.getAttribute("mixed_demands")
const chart_one = target.getAttribute("data-chart-created")
const chart_two = target.getAttribute("data-chart-completed")
const chart_three = target.getAttribute("data-chart-yearly")

if (target) {
    ReactDom.render(
        <UserProfile
            workspacesApi={workspaces}
            mixedTasksApi={mixedTasks}
            mixedDemandsApi={mixedDemands}
            chart_one={chart_one}
            chart_two={chart_two}
            chart_three={chart_three}
        />,
        target
    )
}