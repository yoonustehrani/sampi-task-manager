import React from 'react'
import ReactDom from 'react-dom'
import Dashboard from './components/Dashboard/'

const target = document.getElementById('react-dashboard')
const mixedTasks = target.getAttribute("mixed_tasks")

if(target) {
    ReactDom.render(
        <Dashboard
            mixedTasksApi={mixedTasks}
        />
    ,target)
}