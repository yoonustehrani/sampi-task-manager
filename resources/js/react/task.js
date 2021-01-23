import React from 'react'
import ReactDOM from 'react-dom'
import ShowTask from './components/Task/index'

const target = document.getElementById("react-show-task")
const taskApi = target.getAttribute("task_api")

if (target) {
    ReactDOM.render(
        <ShowTask 
            task_api = { taskApi }
        />
    ,target)
}