import React from 'react'
import ReactDom from 'react-dom'
import Dashboard from './components/Dashboard/'

const target = document.getElementById('react-dashboard')

if(target) {
    ReactDom.render(<Dashboard />, target)
}