import React, { Component } from 'react'
import ReactDom from 'react-dom'
import MixedDemands from './components/mixed-demands'

const target = document.getElementById("mixed-demands-react")
const data_index = target.getAttribute("data-index")
const data_store = target.getAttribute("data-store")
const logged_in_user_id = parseInt(target.getAttribute("logged-in-user-id"))
const search_index = target.getAttribute("data-search")
console.log(search_index)

ReactDom.render(
    <MixedDemands
        get_mixed_demands_api = { data_index }
        post_demand_api = { data_store }
        logged_in_user_id = { logged_in_user_id }
        mixed_demands_search = { search_index }
    />,
    target
)