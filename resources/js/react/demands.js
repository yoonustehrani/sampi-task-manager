import React from 'react'
import ReactDom from 'react-dom'
import Demands from './components/demands/index.jsx'

const target = document.getElementById("demands-react")
const data_index = target.getAttribute("data-index")
const data_store = target.getAttribute("data-store")
const user_profile_route = target.getAttribute("user-profile-route")
const task_route = target.getAttribute("task-route")
const workspace_api = target.getAttribute("workspace-api")
const logged_in_user_id = parseInt(target.getAttribute("logged-in-user-id"))
const demand_show_route = target.getAttribute("demand-show-route")
const get_all_users = target.getAttribute("get-all-users")

if (target) {
    ReactDom.render(
        <Demands
            get_tickets_api = { data_index }
            post_new_ticket_api = { data_store }
            user_profile_route = { user_profile_route }
            task_route = { task_route }
            get_workspace_api = { workspace_api }
            logged_in_user_id = { logged_in_user_id }
            demand_show_route = { demand_show_route }
            get_all_users = { get_all_users }
        />,
        target
    )
}