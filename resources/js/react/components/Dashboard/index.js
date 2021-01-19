import React, { Component } from 'react'
import Axios from 'axios'
import moment from 'moment'
moment.locale('fa')
import { Levels, Digital } from 'react-activity'
import 'react-activity/dist/react-activity.css'


export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.tabResultsRef = []
        for (let i = 0; i < 4; i++) {
            this.tabResultsRef.push(React.createRef())
        }
        this.tabTitlesRef = []
        for (let i = 0; i < 4; i++) {
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
        if (tab_index === 1 && mixedTasks.length === 0) {
            this.setState({
                isGetting: true
            })
            Axios.get(`${mixedTasksApi}&limit=15&order_by=due_to&order=desc`).then(res => {
                let { data } = res
                this.setState({
                    mixedTasks: data,
                    isGetting: false
                })
            })
        }
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
        this.setState({
            isGetting: true
        })
        if (tab === "tasks") {
            let mixed_tasks_order_by = $('#mixed_tasks_order_by_select').val(), mixed_tasks_order = $('#mixed_tasks_order_select').val(), mixed_tasks_relation = $('#mixed_tasks_relation_select').val()
            Axios.get(`${mixedTasksApi}&limit=15&order_by=${mixed_tasks_order_by}&order=${mixed_tasks_order}&relationship=${mixed_tasks_relation}`).then(res => {
                let { data } = res
                this.setState({
                    mixedTasks: data,
                    isGetting: false,
                })
            })
        }
    }

    setPriority = (id) => {
        switch(id) {
            case 1:
                return 'ضروری و مهم'
                break
            case 2:
                return 'ضروری و غیر مهم'
                break
            case 3:
                return 'غیر ضروری و مهم'
                break
            case 4:
                return 'غیر ضروری و غیر مهم'
                break
            default:
                break
        }
    }

    redirectTo = (url) => {
        window.location.href = url
    }

    componentDidMount() {
        let { workspace_counter, task_counter, demand_counter, workspacesApi, workspace_route } = this.props
        let statisticApis = [workspace_counter, task_counter, demand_counter], statistics = {}
        this.setState({
            isGetting: true
        })
        statisticApis.map((url, i) => {
            Axios.get(url).then(res => {
                let { data } = res
                this.setState(preState => {
                    let catagory
                    switch (i) {
                        case 0:
                            catagory = "workspaceCounter"
                            break;

                        case 1:
                            catagory = "taskCounter"
                            break;

                        case 2:
                            catagory = "demandCounter"
                            break;
                    
                        default:
                            break;
                    }
                    statistics[catagory] = data
                    return ({
                        statistics: statistics
                    })
                })
            })
        })
        Axios.get(workspacesApi).then(res => {
            let { data } = res
            this.setState({
                workspaces: data,
                isGetting: false
            })
        })
    }
    

    render() {
        let { mixedTasks, statistics, isGetting, workspaces } = this.state
        let { workspace_route, task_route } = this.props
        return (
            <div>
                <div className="analysis-boxes analysis-container">
                    <div className="float-left animated pulse col-md-3 col-12 projects">
                        <a href={statistics.workspaceCounter ? statistics.workspaceCounter.all.href : "#"} className="item-link">
                            <i className="float-right dashboard-item fas fa-project-diagram fa-3x"></i>
                            <div>
                                <span className="float-right dashboard-item">{ statistics.workspaceCounter ? statistics.workspaceCounter.all.count : <Levels color="#ffffff" /> }</span>
                                <span className="float-right dashboard-item">پروژه های من</span>
                            </div>
                        </a>
                    </div>
                    <div className="float-left animated pulse col-md-3 col-12 finished-tasks">
                        <a href={statistics.taskCounter ? statistics.taskCounter.finished.href : "#"} className="item-link">
                            <i className="float-right dashboard-item fas fa-check-double fa-3x"></i>
                            <div>
                                <span className="float-right dashboard-item">{ statistics.taskCounter ? statistics.taskCounter.finished.count : <Levels color="#ffffff" /> }</span>
                                <span className="float-right dashboard-item">وظایف انجام شده</span>
                            </div>
                        </a>
                    </div>
                    <div className="float-left animated pulse col-md-3 col-12 tickets finished-demands">
                        <a href={statistics.demandCounter ? statistics.demandCounter.finished.href : "#"} className="item-link">
                            <i className="float-right dashboard-item fas fa-check fa-3x"></i>
                            <div>
                                <span className="float-right dashboard-item">{ statistics.demandCounter ? statistics.demandCounter.finished.count : <Levels color="#ffffff" /> }</span>
                                <span className="float-right dashboard-item">خواسته های انجام شده</span>
                            </div>
                        </a>
                    </div>
                    <div className="float-left animated pulse col-md-3 col-12 tickets delayed-tasks">
                        <a href={statistics.taskCounter ? statistics.taskCounter.expired.href : "#"} className="item-link">
                            <i className="float-right dashboard-item fas fa-hourglass-end fa-3x"></i>
                            <div>
                                <span className="float-right dashboard-item">{ statistics.taskCounter ? statistics.taskCounter.expired.count : <Levels color="#ffffff" /> }</span>
                                <span className="float-right dashboard-item">وظایف عقب افتاده</span>
                            </div>
                        </a>
                    </div>
                    <div className="float-left animated pulse col-md-3 col-12 tickets current-tasks">
                        <a href={statistics.taskCounter ? statistics.taskCounter.unfinished.href : "#"} className="item-link">
                            <i className="float-right dashboard-item fas fa-tasks fa-3x"></i>
                            <div>
                                <span className="float-right dashboard-item">{ statistics.taskCounter ? statistics.taskCounter.unfinished.count : <Levels color="#ffffff" /> }</span>
                                <span className="float-right dashboard-item">وظایف جاری</span>
                            </div>
                        </a>
                    </div>
                    <div className="float-left animated pulse col-md-3 col-12 tickets current-demands">
                        <a href={statistics.demandCounter ? statistics.demandCounter.unfinished.href : "#"} className="item-link">
                            <i className="float-right dashboard-item fas fa-list-alt fa-3x"></i>
                            <div>
                                <span className="float-right dashboard-item">{ statistics.demandCounter ? statistics.demandCounter.unfinished.count : <Levels color="#ffffff" /> }</span>
                                <span className="float-right dashboard-item">خواسته های جاری</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-12 dashboard-tab-container">
                    <nav className="tab-title-bar text-center">
                        <a className="tab-link active" ref={this.tabTitlesRef[0]} onClick={this.changeTab.bind(this, 0)}>
                            <i className="fas fa-project-diagram"></i>
                            پروژه ها
                        </a>
                        <a className="tab-link" ref={this.tabTitlesRef[1]} onClick={this.changeTab.bind(this, 1)}>
                            <i className="fas fa-tasks"></i>
                            وظایف
                        </a>
                        <a className="tab-link" ref={this.tabTitlesRef[2]} onClick={this.changeTab.bind(this, 2)}>
                            <i className="fas fa-comment-dots"></i>
                            درخواست ها
                        </a>
                        <a className="tab-link" ref={this.tabTitlesRef[3]} onClick={this.changeTab.bind(this, 3)}>
                            <i className="fas fa-clipboard-list"></i>
                            نیاز ها
                        </a>
                    </nav>

                    <div className="result-container col-12 mt-3 active" ref={this.tabResultsRef[0]}>
                        <table className="table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated bounceIn">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">عنوان پروژه</th>
                                    <th scope="col">کارمندان</th>
                                    <th scope="col">وضعیت وظایف</th>
                                    <th scope="col">خواسته های جاری</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    workspaces.length > 0 ? workspaces.map((workspace, i) => {
                                        let { id, avatar_pic, title, users, tasks_count, finished_tasks_count, demands_left_count } = workspace, workspace_url = workspace_route.replace("workspaceId", id)
                                        return (
                                            <tr key={i} onClick={this.redirectTo.bind(this, workspace_url)}>
                                                <th scope="row">{ i + 1 }</th>
                                                <td className="text-right">
                                                    <img className="workspace_avatar" src={APP_PATH + avatar_pic} />
                                                    <a href={workspace_url}>{ title }</a>
                                                </td>
                                                <td>
                                                    <div className="employees-container">
                                                        {
                                                            users.length === 0 &&
                                                                <span><i className="fas fa-user-slash"></i></span>
                                                        }
                                                        {
                                                            users.length === 1 &&
                                                                <span>{ users.length }<i className="fas fa-user mr-2"></i></span>
                                                        }
                                                        {
                                                            users.length > 1 &&
                                                                <span>{ users.length }<i className="fas fa-users mr-2"></i></span>
                                                        }
                                                        <div className="dropdown-users d-none" onClick={(e) => e.stopPropagation()}>
                                                            {
                                                                users.length >= 1 &&
                                                                    users.map((user, i) => (
                                                                        <div key={i} className="user-dropdown-item animated jackInTheBox">
                                                                            <div className="user-right-flex">
                                                                                <div className="user-img-container ml-2">
                                                                                    <img src={user.avatar_pic !== null ? APP_PATH + user.avatar_pic : APP_PATH + 'images/male-avatar.svg'} />
                                                                                </div>
                                                                                <div className="user-info ml-2">
                                                                                    <p>{ user.fullname }</p>
                                                                                    <a href={"#user"}>@{user.name}</a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="user-label-container">
                                                                                    {
                                                                                        user.pivot.is_admin === 1 ? <button className="btn btn-sm btn-success rtl admin"><span>ادمین<i className="fas fa-user-tie mr-1"></i></span></button>
                                                                                        : <button className="btn btn-sm btn-primary rtl"><span>عضو<i className="fas fa-user mr-1"></i></span></button>
                                                                                    } 
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    کل : <span className="badge badge-primary ml-4">{ tasks_count }</span>
                                                    اتمام : <span className="badge badge-success ml-4">{ finished_tasks_count }</span>
                                                    باقی مانده : <span className="badge badge-danger ml-4">{ tasks_count - finished_tasks_count }</span>
                                                </td>
                                                <td>
                                                    { demands_left_count }
                                                </td>
                                            </tr>
                                        )
                                    }) : null
                                }
                            </tbody>
                        </table> 
                        {
                            workspaces.length <= 0 && !isGetting &&
                                <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                        }
                        {
                            isGetting &&
                                <div className="text-center">
                                    <Digital color="#000000" size={24} />
                                </div>
                        }
                    </div>

                    <div className="result-container col-12 mt-3" ref={this.tabResultsRef[1]}>
                        <div className="filter-box mt-2 mb-2 p-3 col-12 animated fadeIn">
                            <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                                <span>جستجو در: </span>
                                <select id="mixed_tasks_relation_select" defaultValue="all">
                                    <option value="all" icon_name="fas fa-tasks">همه</option>
                                    <option value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                    <option value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                                    <option value="expired" icon_name="fas fa-calendar-minus">منقضی</option>
                                </select>
                            </div>
                            <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                                <span>مرتب سازی بر اساس:</span>
                                <select id="mixed_tasks_order_by_select" defaultValue="due_to">
                                    <option value="due_to" icon_name="fas fa-hourglass-start">تاریخ تحویل</option>
                                    <option value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                    <option value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                    <option value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                                </select>
                            </div>
                            <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                                <span>نحوه مرتب سازی:</span>
                                <select id="mixed_tasks_order_select" defaultValue="desc">
                                    <option value="asc" icon_name="fas fa-sort-amount-up">صعودی</option>
                                    <option value="desc" icon_name="fas fa-sort-amount-down">نزولی</option>
                                </select>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-outline-info" onClick={this.sortData.bind(this, 'tasks')}>مرتب سازی</button>
                            </div>
                        </div>
                        <table className="table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated swing">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">عنوان</th>
                                    <th scope="col">پروژه</th>
                                    <th scope="col">دسته بندی</th>
                                    <th scope="col">اولویت</th>
                                    <th scope="col">موعد تحویل</th>
                                    <th scope="col">وضعیت اتمام</th>
                                    <th scope="col">تاریخ اتمام</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mixedTasks.length > 0 && !isGetting ? mixedTasks.map((task, i) => {
                                        let { id, title, group, finished_at, priority_id, due_to, workspace, workspace_id } = task
                                        return (
                                            <tr key={i} onClick={this.redirectTo.bind(this, task_route.replace("taskId", id))}>
                                                <th scope="row">{ i + 1 }</th>
                                                <td>{title}</td>
                                                <td className="text-right">
                                                    <img className="workspace_avatar" src={APP_PATH + workspace.avatar_pic} />
                                                    <a href={workspace_route.replace('workspaceId', workspace_id)}>{workspace.title}</a>
                                                </td>
                                                <td>{group}</td>
                                                <td>{this.setPriority(priority_id)}</td>
                                                <td>{due_to !== null ? moment(due_to).fromNow() : <i className="fas fa-calendar-minus  fa-3x"></i>}</td>
                                                <td>
                                                    {finished_at === null ? <i className="fas fa-times-circle fa-3x"></i> : <i className="fas fa-check-circle fa-3x"></i>}
                                                </td>
                                                <td>
                                                {finished_at === null ? <i className="fas fa-calendar-times fa-3x"></i> : moment(finished_at).fromNow()}
                                                </td>
                                            </tr>
                                        )
                                    }) : null
                                }
                            </tbody>
                        </table> 
                        {
                            mixedTasks.length <= 0 && !isGetting &&
                                <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                        }
                        {
                            isGetting &&
                                <div className="text-center">
                                    <Digital color="#000000" size={24} />
                                </div>
                        }
                    </div>

                    <div className="result-container col-12 mt-3" ref={this.tabResultsRef[2]}>
                        <table className="table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated rubberBand">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">عنوان</th>
                                    <th scope="col">پروژه</th>
                                    <th scope="col">درخواست کننده</th>
                                    <th scope="col">تسک مربوطه</th>
                                    <th scope="col">اولویت</th>
                                    <th scope="col">موعد تحویل</th>
                                    <th scope="col">وضعیت اتمام</th>
                                    <th scope="col">تاریخ اتمام</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">۱</th>
                                    <td>ارسال فرمت پی ان جی لوگو</td>
                                    <td className="text-right">
                                        <img src="workspace img link"/>
                                        <a href="workspace link">workspace title</a>
                                    </td>
                                    <td>امیررضا منصوریان</td>
                                    <td>طراحی صفحه اصلی اپ</td>
                                    <td>ضروری و مهم</td>
                                    <td>۱۲ فروردین</td>
                                    <td>
                                        <i className="fas fa-check-circle fa-3x"></i>
                                        {/* <i className="fas fa-times-circle"></i> */}
                                    </td>
                                    <td>
                                        {/* ۱۰ فروردین */}
                                        <i className="fas fa-calendar-times fa-3x"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                        {/* {
                            workspaces.length <= 0 && !isGetting &&
                                <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                        } */}
                        {
                            isGetting &&
                                <div className="text-center">
                                    <Digital color="#000000" size={24} />
                                </div>
                        }
                    </div>

                    <div className="result-container col-12 mt-3" ref={this.tabResultsRef[3]}>
                        <table className="table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated tada">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">عنوان</th>
                                    <th scope="col">پروژه</th>
                                    <th scope="col">فرد مربوطه</th>
                                    <th scope="col">تسک مربوطه</th>
                                    <th scope="col">اولویت</th>
                                    <th scope="col">موعد تحویل</th>
                                    <th scope="col">وضعیت اتمام</th>
                                    <th scope="col">تاریخ اتمام</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">۱</th>
                                    <td>ارسال فرمت پی ان جی لوگو</td>
                                    <td className="text-right">
                                        <img src="workspace img link"/>
                                        <a href="workspace link">workspace title</a>
                                    </td>
                                    <td>امیررضا منصوریان</td>
                                    <td>طراحی صفحه اصلی اپ</td>
                                    <td>ضروری و مهم</td>
                                    <td>۱۲ فروردین</td>
                                    <td>
                                        <i className="fas fa-check-circle fa-3x"></i>
                                        {/* <i className="fas fa-times-circle"></i> */}
                                    </td>
                                    <td>
                                        {/* ۱۰ فروردین */}
                                        <i className="fas fa-calendar-times fa-3x"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                        {/* {
                            workspaces.length <= 0 && !isGetting &&
                                <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                        } */}
                        {
                            isGetting &&
                                <div className="text-center">
                                    <Digital color="#000000" size={24} />
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
