import React from 'react'
import ReactDom from 'react-dom'
import Demands from './components/demands/index.jsx'

const target = document.getElementById("demands-react")
const data_index = target.getAttribute("data-index")
const data_store = target.getAttribute("data-store")

if (target) {
    ReactDom.render(
        <Demands
            get_tickets_api = { data_index }
            post_new_ticket_api = { data_store }
        />,
        target
    )
}