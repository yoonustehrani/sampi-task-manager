import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MixedTasks from './components/mixed-tasks'

const target = document.getElementById("mixed-tasks-react")
const mixed_tasks_api = target.getAttribute("get-mixed-tasks-api")
const mixed_tasks_search_api = target.getAttribute("data-search")

ReactDOM.render(
    <MixedTasks 
        mixed_tasks_api = { mixed_tasks_api }
        mixed_tasks_search_api = { mixed_tasks_search_api }
    />,
    target
)