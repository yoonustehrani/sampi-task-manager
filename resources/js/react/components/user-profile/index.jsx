import React, { Component } from 'react'

export default class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.tabResultsRef = []
        this.tabTitlesRef = []
        for (let i = 0; i < 4; i++) {
            this.tabResultsRef.push(React.createRef())
            this.tabTitlesRef.push(React.createRef())
        }
        this.state = {
            mixedTasks: [],
            statistics: {},
            isGetting: true,
            workspaces: []
        }
    }

    changeTab = (tab_index) => {
        let { mixedTasksApi } = this.props
        let { mixedTasks } = this.state
        // if (tab_index === 1 && mixedTasks.length === 0) {
        //     this.setState({
        //         isGetting: true
        //     })
        //     Axios.get(`${mixedTasksApi}&limit=15&order_by=due_to&order=desc`).then(res => {
        //         let { data } = res
        //         this.setState({
        //             mixedTasks: data,
        //             isGetting: false
        //         })
        //     })
        // }
        this.tabResultsRef.map((tabResultRef, i) => {
            if (tab_index === i) {
                tabResultRef.current.classList.add("active")
            } else {
                tabResultRef.current.classList.remove("active")
            }
        })
        this.tabTitlesRef.map((tabTitleRef, i) => {
            if (tab_index === i) {
                tabTitleRef.current.classList.add("active")
            } else {
                tabTitleRef.current.classList.remove("active")
            }
        })
    }

    sortData = (tab) => {
        let { mixedTasksApi } = this.props
        // this.setState({
        //     isGetting: true
        // })
        // if (tab === "tasks") {
        //     let mixed_tasks_order_by = $('#mixed_tasks_order_by_select').val(), mixed_tasks_order = $('#mixed_tasks_order_select').val(), mixed_tasks_relation = $('#mixed_tasks_relation_select').val()
        //     Axios.get(`${mixedTasksApi}&limit=15&order_by=${mixed_tasks_order_by}&order=${mixed_tasks_order}&relationship=${mixed_tasks_relation}`).then(res => {
        //         let { data } = res
        //         this.setState({
        //             mixedTasks: data,
        //             isGetting: false,
        //         })
        //     })
        // }
    }

    render() {
        return (
            <div>
                <div className="user-info-section col-12 col-md-4 pl-0 pr-0 float-right">
                    <div className="user-card pt-4 pb-2">
                        <div className="user-info-section text-center">
                            <div className="user-img-container">
                                <img src={APP_PATH + "images/danial.jpg"} alt=""/>
                            </div>
                            <div className="user-text-info-container">
                                <h5 className="d-block mt-3">دانیال طهرانیم</h5>
                                <h6 className="float-right">danialtehrani@</h6>
                                <h6 className="mr-1 float-right">مدیر بخش مالی</h6>
                            </div>
                            <hr/>
                        </div>
                        <div className="user-work-section">
                            <nav className="tab-title-bar text-center">
                                <a className="tab-link active" ref={this.tabTitlesRef[0]} onClick={this.changeTab.bind(this, 0)}>
                                    <i className="fas fa-project-diagram d-block d-md-inline"></i>
                                    پروژه ها
                                </a>
                                <a className="tab-link" ref={this.tabTitlesRef[1]} onClick={this.changeTab.bind(this, 1)}>
                                    <i className="fas fa-tasks d-block d-md-inline"></i>
                                    وظایف
                                </a>
                                <a className="tab-link" ref={this.tabTitlesRef[2]} onClick={this.changeTab.bind(this, 2)}>
                                    <i className="fas fa-comment-dots d-block d-md-inline"></i>
                                    درخواست ها
                                </a>
                                <a className="tab-link" ref={this.tabTitlesRef[3]} onClick={this.changeTab.bind(this, 3)}>
                                    <i className="fas fa-clipboard-list d-block d-md-inline"></i>
                                    نیاز ها
                                </a>
                            </nav>
                            <div className="user-works-results scrollable-items col-12 mt-4 active" ref={this.tabResultsRef[0]}>
                                <div className="workspace-item col-12">
                                    <div className="workspace-img-container ml-1">
                                        <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                    </div>
                                    <div className="workspace-item-text-info">
                                        <h6>الناول</h6>
                                        <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                    </div>
                                </div>
                            </div>
                            <div className="user-works-results col-12 mt-4" ref={this.tabResultsRef[1]}>
                                <div className="filter-box task-bg-color mb-4 p-2 col-12 animated fadeIn">
                                    <div className="filter-option col-12 mb-3 text-center">
                                        <span>جستجو در: </span>
                                        <select id="mixed_tasks_relation_select" defaultValue="all">
                                            <option container_class="select-option-big" value="all" icon_name="fas fa-tasks">همه</option>
                                            <option container_class="select-option-big" value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                            <option container_class="select-option-big" value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                                            <option container_class="select-option-big" value="expired" icon_name="fas fa-calendar-minus">منقضی</option>
                                        </select>
                                    </div>
                                    <div className="filter-option col-12 mb-3 text-center">
                                        <span>مرتب سازی بر اساس:</span>
                                        <select id="mixed_tasks_order_by_select" defaultValue="due_to">
                                            <option container_class="select-option-big" value="due_to" icon_name="fas fa-hourglass-start">تاریخ تحویل</option>
                                            <option container_class="select-option-big" value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                            <option container_class="select-option-big" value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                            <option container_class="select-option-big" value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                                        </select>
                                    </div>
                                    <div className="filter-option col-12 mb-3 text-center">
                                        <span>نحوه مرتب سازی:</span>
                                        <select id="mixed_tasks_order_select" defaultValue="desc">
                                            <option container_class="select-option-big" value="asc" icon_name="fas fa-sort-amount-up">صعودی</option>
                                            <option container_class="select-option-big" value="desc" icon_name="fas fa-sort-amount-down">نزولی</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-outline-info" onClick={this.sortData.bind(this, 'tasks')}>مرتب سازی</button>
                                    </div>
                                </div>
                                <div className="scrollable-items user-tasks-container col-12 mt-4">
                                    <div className="task-item user-work-item">
                                        <h6>طراحی صفحه تسک (برنامه نویسی)</h6>
                                        <span>سه روز پیش <i className="fas fa-check"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="user-works-results col-12 mt-4" ref={this.tabResultsRef[2]}>
                                <div className="filter-box demand-bg-color mb-4 p-2 col-12 animated fadeIn">
                                    <div className="filter-option col-12 mb-3 text-center">
                                        <span>جستجو در: </span>
                                        <select id="mixed_demands_relation_select" defaultValue="all">
                                            <option container_class="select-option-big" value="all" icon_name="fas fa-tasks">همه</option>
                                            <option container_class="select-option-big" value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                            <option container_class="select-option-big" value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                                            <option container_class="select-option-big" value="expired" icon_name="fas fa-calendar-minus">منقضی</option>
                                        </select>
                                    </div>
                                    <div className="filter-option col-12 mb-3 text-center">
                                        <span>مرتب سازی بر اساس:</span>
                                        <select id="mixed_demands_order_by_select" defaultValue="due_to">
                                            <option container_class="select-option-big" value="due_to" icon_name="fas fa-hourglass-start">تاریخ تحویل</option>
                                            <option container_class="select-option-big" value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                            <option container_class="select-option-big" value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                            <option container_class="select-option-big" value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                                        </select>
                                    </div>
                                    <div className="filter-option col-12 mb-3 text-center">
                                        <span>نحوه مرتب سازی:</span>
                                        <select id="mixed_demands_order_select" defaultValue="desc">
                                            <option container_class="select-option-big" value="asc" icon_name="fas fa-sort-amount-up">صعودی</option>
                                            <option container_class="select-option-big" value="desc" icon_name="fas fa-sort-amount-down">نزولی</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-outline-info" onClick={this.sortData.bind(this, 'tasks')}>مرتب سازی</button>
                                    </div>
                                </div>
                                <div className="scrollable-items user-tasks-container col-12 mt-4">
                                    <div className="demand-item">
                                        <div className="demand-sender">
                                            <img src={APP_PATH + "images/male-avatar.svg"} alt=""/>
                                            <h6>طراحی ای پی ای برای تسک ها</h6>
                                        </div>
                                        <i className="fas fa-long-arrow-alt-left"></i>
                                        <div>
                                            <img src={APP_PATH + "images/male-avatar.svg"} alt="" />
                                            <i className="fas fa-check"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-works-results col-12 mt-4" ref={this.tabResultsRef[3]}>
                                <div className="filter-box need-bg-color mb-4 p-2 col-12 animated fadeIn">
                                    <div className="filter-option col-12 mb-3 text-center">
                                        <span>جستجو در: </span>
                                        <select id="mixed_needs_relation_select" defaultValue="all">
                                            <option container_class="select-option-big" value="all" icon_name="fas fa-tasks">همه</option>
                                            <option container_class="select-option-big" value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                            <option container_class="select-option-big" value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                                            <option container_class="select-option-big" value="expired" icon_name="fas fa-calendar-minus">منقضی</option>
                                        </select>
                                    </div>
                                    <div className="filter-option col-12 mb-3 text-center">
                                        <span>مرتب سازی بر اساس:</span>
                                        <select id="mixed_needs_order_by_select" defaultValue="due_to">
                                            <option container_class="select-option-big" value="due_to" icon_name="fas fa-hourglass-start">تاریخ تحویل</option>
                                            <option container_class="select-option-big" value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                            <option container_class="select-option-big" value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                            <option container_class="select-option-big" value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                                        </select>
                                    </div>
                                    <div className="filter-option col-12 mb-3 text-center">
                                        <span>نحوه مرتب سازی:</span>
                                        <select id="mixed_needs_order_select" defaultValue="desc">
                                            <option container_class="select-option-big" value="asc" icon_name="fas fa-sort-amount-up">صعودی</option>
                                            <option container_class="select-option-big" value="desc" icon_name="fas fa-sort-amount-down">نزولی</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-outline-info" onClick={this.sortData.bind(this, 'tasks')}>مرتب سازی</button>
                                    </div>
                                </div>
                                <div className="scrollable-items user-tasks-container col-12 mt-4">
                                    <div className="demand-item hover-bg">
                                        <div>
                                            <i className="fas fa-times"></i>
                                            <img src={APP_PATH + "images/male-avatar.svg"} alt=""/>
                                        </div>
                                        <i className="fas fa-long-arrow-alt-right"></i>
                                        <div className="demand-sender">
                                            <h6>طراحی ای پی ای برای تسک ها</h6>
                                            <img src={APP_PATH + "images/male-avatar.svg"} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="statistics-section col-12 col-md-8 float-right">
                    <div className="wide-section-statistics col-12 mb-1">
                        cahrt
                    </div>
                    <div className="small-section-statictics col-12 col-md-6 mr-2 mb-1">
                        cahrt
                    </div>
                    <div className="small-section-statictics col-12 col-md-6 mb-1">
                        cahrt
                    </div>
                    <div className="small-section-statictics col-12 col-md-6 mr-2 mb-1">
                        cahrt
                    </div>
                    <div className="small-section-statictics col-12 col-md-6 mb-1">
                        cahrt
                    </div>
                </div>
            </div>
        )
    }
}
