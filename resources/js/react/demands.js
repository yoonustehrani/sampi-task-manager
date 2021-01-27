import React from 'react'
import ReactDom from 'react-dom'
import Demands from './components/demands/index.jsx'

const target = document.getElementById("demands-react")

if (target) {
    ReactDom.render(
        <Demands

        />,
        target
    )
}