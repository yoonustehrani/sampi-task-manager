import React, { Component } from 'react'

export default class Dashboard extends Component {
    render() {
        return (
            <div className="col-12 dashboard-tab-container">
                <nav className="tab-title-bar text-center">
                    <a className="tab-link">
                        <i className="fas fa-project-diagram"></i>
                        پروژه ها
                    </a>
                    <a className="tab-link active">
                        <i className="fas fa-tasks"></i>
                        وظایف
                    </a>
                    <a className="tab-link">
                        <i className="fas fa-comment-dots"></i>
                        درخواست ها
                    </a>
                    <a className="tab-link">
                        <i className="fas fa-clipboard-list"></i>
                        نیاز ها
                    </a>
                </nav>
                <div className="result-container col-12 mt-3">
                    
                </div>
            </div>
        )
    }
}
