import React, { Component } from 'react'
import Axios from 'axios'
import { getDemand, getTask, getUser, getWorkspace, redirectTo } from '../../../helpers'
import moment from 'moment'
moment.locale('fa')
import { Sentry } from 'react-activity'
import 'react-activity/lib/Sentry/Sentry.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.tabResultsRef = []
        this.tabTitlesRef = []
        for (let i = 0; i < 4; i++) {
            this.tabResultsRef.push(React.createRef())
            this.tabTitlesRef.push(React.createRef())
        }

        let navbar = [
            {text: 'پروژه ها', icon: 'project-diagram', tab: 0, order: 0},
            {text: 'وظایف', icon: 'tasks', tab: 1, order: 1},
            {text: 'درخواست ها', icon: 'comment-dots', tab: 2, order: 2},
            {text: 'نیاز ها', icon: 'clipboard-list', tab: 3, order: 3}
        ].sort((a,b) => (a.order > b.order ? 0 : -1));

        this.state = {
            mixed_tasks: [],
            statistics: {},
            isGetting: true,
            workspaces: [],
            navbar: navbar,
            mixed_demands: [],
            mixed_needs: []
        }
    }
    
    changeTab = (tab_index) => {
        let { mixedTasksApi, mixedDemandsApi } = this.props
        let { mixed_tasks, mixed_demands, mixed_needs } = this.state
        const getData = (tabName, tabData, api) => {
            if (tabData.length === 0) {
                this.setState({
                    isGetting: true
                })
                Axios.get(`${api}&limit=15&order_by=${tabName === "mixed_tasks" ? "due_to" : "created_at"}&order=desc${tabName === "mixed_demands" ? "&relationship=asked" : ""}`).then(res => {
                    let { data } = res
                    this.setState({
                        [tabName]: data,
                        isGetting: false
                    })
                })   
            }
        }

        switch (tab_index) {
            case 1:
                getData("mixed_tasks", mixed_tasks, mixedTasksApi)
                break;

            case 2:
                getData("mixed_demands", mixed_demands, mixedDemandsApi)
                break;

            case 3:
                getData("mixed_needs", mixed_needs, mixedDemandsApi)
                break;
        
            default:
                break;
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
        let { mixedTasksApi, mixedDemandsApi } = this.props
        const sendReq = (tab_name, api) => {
            this.setState({ isGetting: true }, () => {
                let order_by = $(`#${tab_name}_order_by_select`).val(), order = $(`#${tab_name}_order_select`).val(), relation = $(`#${tab_name}_relation_select`).val()
                Axios.get(`${api}&limit=15&order_by=${order_by}&order=${order}&relationship=${tab_name === "mixed_tasks" ? relation : tab_name === "mixed_demands" ? "asked" : "mixed_need"}${tab_name === "mixed_tasks" ? "" : `&filter=${relation}`}`).then(res => {
                    let { data } = res
                    this.setState({
                        [tab_name]: data,
                        isGetting: false                    
                    })
                })
            })
        }

        switch (tab) {
            case "mixed_tasks":
                sendReq("mixed_tasks", mixedTasksApi)
                break;

            case "mixed_demands":
                sendReq("mixed_demands", mixedDemandsApi)
                break;

            case "mixed_needs":
                sendReq("mixed_needs", mixedDemandsApi)
                break;
        
            default:
                break;
        }
    }

    componentDidMount() {
        let { workspace_counter, task_counter, demand_counter, workspacesApi, workspace_route } = this.props
        let statisticApis = [workspace_counter, task_counter, demand_counter], statistics = {}
        this.setState({
            isGetting: true
        })
        // statisticApis.map((url, i) => {
        //     Axios.get(url).then(res => {
        //         let { data } = res
        //         this.setState(preState => {
        //             let catagory
        //             switch (i) {
        //                 case 0:
        //                     catagory = "workspaceCounter"
        //                     break;

        //                 case 1:
        //                     catagory = "taskCounter"
        //                     break;

        //                 case 2:
        //                     catagory = "demandCounter"
        //                     break;
                    
        //                 default:
        //                     break;
        //             }
        //             statistics[catagory] = data
        //             return ({
        //                 statistics: statistics
        //             })
        //         })
        //     })
        // })
        Axios.get(workspacesApi).then(res => {
            let { data } = res
            this.setState({workspaces: data}, () => {
                this.state.workspaces.map((workspace, i) => {
                    let current_workspace
                    workspace.users.map((user, index) => {
                        current_workspace = Object.assign({}, current_workspace, {
                            [user.id]: {
                                id: user.id,
                                fullname: user.fullname,
                                avatar_pic: user.avatar_pic,
                                is_admin: user.pivot.is_admin
                            }
                        })
                    })
                    this.setState(prevState => ({
                        workspaces_users: Object.assign({}, prevState.workspaces_users, {
                            [workspace.id]: current_workspace
                        }),
                        isGetting: false
                    }))
                })
            })
        })
        this.tabTitlesRef[0].current.classList.add("active")
    }

    render() {
        let { mixed_tasks, statistics, isGetting, workspaces, navbar, mixed_demands, mixed_needs, workspaces_users } = this.state
        let { workspace_route, task_route, demand_show_route, user_profile_route } = this.props
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
                                {navbar && navbar.map((item, i) => {
                                    return (
                                        <a key={i} className="tab-link" ref={this.tabTitlesRef[item.tab]} onClick={this.changeTab.bind(this, item.tab)} key={i}>
                                            <i className={`fas fa-${item.icon} d-block d-md-inline`}></i>
                                            {item.text}
                                        </a>
                                    )
                                })}
                            </nav>
                            <div className="user-works-results scrollable-items col-12 mt-4 active" ref={this.tabResultsRef[0]}>
                                {workspaces && workspaces.length > 0 && !isGetting 
                                    ? workspaces.map((workspace, i) => (
                                        <div key={i} className="workspace-item col-12" onClick={() => redirectTo(getWorkspace(workspace.id))}>
                                            <div className="workspace-img-container ml-1">
                                                <img src={APP_PATH + workspace.avatar_pic} alt=""/>
                                            </div>
                                            <div className="workspace-item-text-info">
                                                <h6>{ workspace.title }</h6>
                                                <span>{ workspace.description }</span>
                                            </div>
                                        </div>
                                    ))
                                    : isGetting
                                    ? <div className="col-12 text-center"><Sentry size={20} color="#000000" /></div>
                                    : <p className="text-secondary text-center">موردی برای نمایش وجود ندارد</p>
                                }
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
                                        <button className="btn btn-outline-info" onClick={this.sortData.bind(this, 'mixed_tasks')}>مرتب سازی</button>
                                    </div>
                                </div>
                                <div className="scrollable-items user-tasks-container col-12 mt-4">
                                    {mixed_tasks && mixed_tasks.length > 0 && !isGetting
                                        ? mixed_tasks.map((task, i) => (
                                            <div key={i} className="task-item user-work-item" onClick={() => redirectTo(getTask(task.id))}>
                                                <h6 className="text-right">{task.title} ({task.group})</h6>
                                                <span>{moment(task.due_to).fromNow()} {task.finished_at !== null ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}</span>
                                            </div>
                                        ))
                                        : isGetting
                                        ? <div className="col-12 text-center"><Sentry size={20} color="#000000" /></div>
                                        : <p className="text-secondary text-center">موردی برای نمایش وجود ندارد</p>
                                    }
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
                                        <button className="btn btn-outline-info" onClick={this.sortData.bind(this, 'mixed_demands')}>مرتب سازی</button>
                                    </div>
                                </div>
                                <div className="scrollable-items user-tasks-container col-12 mt-4">
                                    {mixed_demands && mixed_demands.length > 0 && !isGetting
                                        ? mixed_demands.map((demand, i) => (
                                            <div key={i} className="demand-item hover-bg" onClick={() => redirectTo(getDemand(demand.workspace_id, demand.id))}>
                                                <div>
                                                    <i className={`fas ${demand.finished_at === null ? "fa-times" : "fa-cehck"}`}></i>
                                                    <img src={APP_PATH + `${demand.from.avatar_pic ? demand.from.avatar_pic : 'images/male-avatar.svg'}`} alt=""/>
                                                </div>
                                                <i className="fas fa-long-arrow-alt-right"></i>
                                                <div className="demand-sender">
                                                    <h6>{ demand.title }</h6>
                                                    <img src={APP_PATH + `${demand.from.avatar_pic ? demand.from.avatar_pic : 'images/male-avatar.svg'}`} alt="" />
                                                </div>
                                            </div>
                                        ))
                                        : isGetting
                                        ? <div className="col-12 text-center"><Sentry size={20} color="#000000" /></div>
                                        : <p className="text-secondary text-center">موردی برای نمایش وجود ندارد</p>
                                    }
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
                                        <button className="btn btn-outline-info" onClick={this.sortData.bind(this, 'mixed_needs')}>مرتب سازی</button>
                                    </div>
                                </div>
                                <div className="scrollable-items user-tasks-container col-12 mt-4">
                                    {mixed_needs && mixed_needs.length > 0 && !isGetting
                                        ? mixed_needs.map((need, i) => (
                                            <div key={i} className="demand-item hover-bg" onClick={() => redirectTo(getDemand(need.workspace_id, need.id))}>
                                                <div className="demand-sender">
                                                    <img src={APP_PATH + `${need.to.avatar_pic ? need.to.avatar_pic : 'images/male-avatar.svg'}`} alt="" />
                                                    <h6 className="mr-1">{ need.title }</h6>
                                                </div>
                                                <i className="fas fa-long-arrow-alt-left"></i>
                                                <div>
                                                    <img src={APP_PATH + `${need.to.avatar_pic ? need.to.avatar_pic : 'images/male-avatar.svg'}`} alt=""/>
                                                    <i className={`ml-1 fas ${need.finished_at === null ? "fa-times" : "fa-cehck"}`}></i>
                                                </div>
                                            </div>
                                        ))
                                        : isGetting
                                        ? <div className="col-12 text-center"><Sentry size={20} color="#000000" /></div>
                                        : <p className="text-secondary text-center">موردی برای نمایش وجود ندارد</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="statistics-section col-12 col-md-8 float-right">
                    <div className="wide-section-statistics col-12 mb-1">
                        <div className="chart-title-section title-section col-12 p-2">
                            <i className="fas fa-handshake"></i>
                            <h5>مسئولیت ها</h5>
                        </div>
                        <div className="col-12 wide-section-charts">
                            <div className="col-12 col-md-9 wide-chart">
                                <div className="col-12 p-3 mt-3 mb-4">
                                    <canvas id="myChart" aria-label="Hello ARIA World" role="img"></canvas>
                                </div>                            
                            </div>
                            <div className="col-12 col-md-3">
                                <CircularProgressbar value={74} text={`74%`} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                        <div className="col-12 col-md-3">
                            <CircularProgressbar value={43} text={`43%`} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="col-12 p-3 mt-3 mb-4">
                            <canvas id="myChart2" aria-label="Hello ARIA World" role="img"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
