import React from 'react'
import ReactDom from 'react-dom'
import UserProfile from './components/user-profile/index'

const target = document.getElementById("user-profile-react")

if (target) {
    ReactDom.render(
        <UserProfile

        />,
        target
    )
}