import React, { Component } from 'react'
import Axios from 'axios'
import moment from 'moment'
moment.locale('fa')
import { Levels, Digital } from 'react-activity'
import 'react-activity/dist/react-activity.css'
import { setPriority, redirectTo } from '../../../helpers'
import CounterTab from './CounterTab'
import Workspaces from './Workspaces'
import Task from './Tasks/Task'
import Tasks from './Tasks'


export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.tabResultsRef = []
        this.tabTitlesRef = []
        for (let i = 0; i < 4; i++) {
            this.tabResultsRef.push(React.createRef())
            this.tabTitlesRef.push(React.createRef())
        }

        let navbar = [
            {text: 'پروژه ها', tab: 0, order: 0},
            {text: 'وظایف', tab: 1, order: 1},
            {text: 'درخواست ها', tab: 2, order: 2},
            {text: 'نیاز ها', tab: 3, order: 3}
        ].sort((a,b) => (a.order > b.order ? 0 : -1));

        this.state = {
            mixedTasks: [],
            statistics: {},
            isGetting: true,
            workspaces: [],
            navbar: navbar
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
        this.tabTitlesRef.map((tabTitleRef, i) => {
            if (tab_index === i) {
                tabTitleRef.current.classList.add("active")
                this.tabResultsRef[i].current.classList.add("active")
            } else {
                tabTitleRef.current.classList.remove("active")
                this.tabResultsRef[i].current.classList.remove("active")
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
        this.tabTitlesRef[0].current.classList.add("active")
    }
    

    render() {
        let { mixedTasks, statistics, isGetting, workspaces, navbar } = this.state
        let { workspace_route, task_route } = this.props
        return (
            <div>
                <div className="analysis-boxes analysis-container">
                    <CounterTab Title="پروژه های من" Item={statistics.workspaceCounter ? statistics.workspaceCounter.all : null} CustomClasses="projects" Icon="fas fa-project-diagram"/>
                    <CounterTab Title="وظایف انجام شده" Item={statistics.taskCounter ? statistics.taskCounter.finished : null} CustomClasses="finished-tasks" Icon="fas fa-check-double"/>
                    <CounterTab Title="نیازهای جاری" Item={statistics.demandCounter ? statistics.demandCounter.demands.unfinished : null} CustomClasses="finished-demands" Icon="fas fa-check"/>
                    <CounterTab Title="وظایف عقب افتاده" Item={statistics.taskCounter ? statistics.taskCounter.expired : null} CustomClasses="delayed-tasks" Icon="fas fa-hourglass-end"/>
                    <CounterTab Title="وظایف جاری" Item={statistics.taskCounter ? statistics.taskCounter.unfinished : null} CustomClasses="current-tasks" Icon="fas fa-tasks"/>
                    <CounterTab Title="خواسته های جاری" Item={statistics.demandCounter ? statistics.demandCounter.asked_demands.unfinished : null} CustomClasses="current-demands" Icon="fas fa-list-alt"/>
                </div>
                <div className="col-12 dashboard-tab-container">
                    <nav className="tab-title-bar text-center">
                        {navbar && navbar.map((item, i) => {
                            return (
                                <a className="tab-link" ref={this.tabTitlesRef[item.tab]} onClick={this.changeTab.bind(this, item.tab)} key={i}>
                                    <i className="fas fa-project-diagram d-block d-md-inline"></i>
                                    {item.text}
                                </a>
                            )
                        })}
                    </nav>
                    <div className="result-container col-12 mt-3 active" ref={this.tabResultsRef[0]}>
                        {isGetting
                            ? <div className="text-center"><Digital color="#000000" size={24} /></div>
                            : <Workspaces AllWorkspaces={workspaces} Route={workspace_route}/>
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
                        {isGetting
                            ? <div className="text-center"><Digital color="#000000" size={24} /></div>
                            : <Tasks AllTasks={mixedTasks} Route={task_route} workspace_route={workspace_route}/>
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
                                <tr className="animated fadeIn">
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
                                <tr className="animated fadeIn">
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
