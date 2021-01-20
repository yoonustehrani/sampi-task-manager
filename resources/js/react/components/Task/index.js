import React, { Component } from 'react'
import Axios from 'axios'

export default class ShowTask extends Component {
    componentDidMount() {
        let { task_api } = this.props
        console.log(task_api)
    }
    
    render() {
        return (
            <div>
                hello world
            </div>
        )
    }
}
