import React from 'react'
import ReactDom from 'react-dom'
import UserProfile from './components/user-profile/index'

const target = document.getElementById("user-profile-react")
const workspaces = target.getAttribute("workspaces")
const mixedDemands = target.getAttribute("data-mixed-demands")
const mixedTasks = target.getAttribute('data-mixed-tasks');
const chart_one = target.getAttribute("data-chart-completed")
const chart_two = target.getAttribute("data-chart-ontime")
const chart_three = target.getAttribute("data-chart-yearly")
const task_counter = target.getAttribute("task-counter")

if (target) {
    ReactDom.render(
        <UserProfile
            workspacesApi={workspaces}
            mixedTasksApi={mixedTasks}
            mixedDemandsApi={mixedDemands}
            chart_one={chart_one}
            chart_two={chart_two}
            chart_three={chart_three}
            task_counter={task_counter}
        />,
        target
    )
}