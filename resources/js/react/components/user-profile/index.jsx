import React, { Component } from 'react'
import Axios from 'axios'
import { getDemand, getTask, getUser, getWorkspace, redirectTo } from '../../../helpers'
import moment from 'moment-jalaali'
import { Sentry } from 'react-activity'
import 'react-activity/lib/Sentry/Sentry.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MonthlyChart from './Charts/MonthlyChart'

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
            mixed_needs: [],
            charts: [
                {
                    title: 'تکمیل مسئولیت ها',
                    data: null
                },
                {
                    title: 'تکمیل به موقع مسئولیت ها',
                    data: null
                },
                null,
            ]
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
                Axios.get(`${api}&user_id=${TargetUser.id}&limit=15&order_by=${tabName === "mixed_tasks" ? "due_to" : "created_at"}&order=desc${tabName === "mixed_demands" ? "&relationship=asked" : ""}`).then(res => {
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
                Axios.get(`${api}&limit=15&order_by=${order_by}&order=${order}&relationship=${tab_name === "mixed_tasks" ? relation : tab_name === "mixed_demands" ? "asked" : "mixed_need"}${tab_name === "mixed_tasks" ? "" : `&filter=${relation}`}&user_id=${TargetUser.id}`).then(res => {
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
        let { workspace_counter, task_counter, demand_counter, workspacesApi, workspace_route, chart_one, chart_two, chart_three } = this.props
        let fromdate  = moment().locale('en').subtract(31, 'day').format('YYYY-M-D');
        let todate = moment().locale('en').add(1, 'day').format('YYYY-M-D');
        [chart_one, chart_two].map((chart_url, i) => {
            chart_url += `&start_date=${fromdate}&end_date=${todate}`;
            Axios.get(chart_url).then(res => {
                let data = res.data;
                this.setState(prevState => {
                    let prevCharts = prevState.charts;
                    prevCharts[i].data = data;
                    return {
                        chart: prevCharts
                    }
                });
            })
        })
        // let fromdate  = moment().subtract(31, 'day').format('YYYY-M-D');
        // let todate = moment().add(1, 'day').format('YYYY-M-D');
        // Axios.get(chart_three).then(res => {
        //     let { data } = res.data;
            
        // })
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
        Axios.get(`${workspacesApi}&user_id=${TargetUser.id}`).then(res => {
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
        let { mixed_tasks, statistics, isGetting, workspaces, navbar, mixed_demands, mixed_needs, charts } = this.state
        let { workspace_route, task_route, demand_show_route, user_profile_route } = this.props
        let roles = ""
        TargetUser.roles.map((role, i) => {
            roles += role.label + `${i !== 0 ? "-" : ""}`                       
        })
        return (
            <div>
                <div className="user-info-section col-12 col-md-4 pl-0 pr-0 float-right">
                    <div className="user-card pt-4 pb-2">
                        <div className="user-info-section text-center">
                            <div className="user-img-container">
                                <img src={APP_PATH + (TargetUser.avatar_pic ? TargetUser.avatar_pic : 'images/male-avatar.svg')} alt=""/>
                            </div>
                            <div className="user-text-info-container">
                                <h5 className="d-block mt-3">{TargetUser.fullname}</h5>
                                <h6 className="float-right">@{TargetUser.name}</h6>
                                <h6 className="mr-1 float-right">{ roles }</h6>
                            </div>
                            <hr/>
                        </div>
                        <div className="user-work-section">
                            <nav className="tab-title-bar text-center">
                                {navbar && navbar.map((item, i) => {
                                    return (
                                        <a key={i} className="tab-link user-profile-tab-link" ref={this.tabTitlesRef[item.tab]} onClick={this.changeTab.bind(this, item.tab)} key={i}>
                                            <i className={`fas fa-${item.icon} d-block d-md-inline`}></i>
                                            {item.text}
                                        </a>
                                    )
                                })}
                            </nav>
                            <div className="user-works-results scrollable-items col-12 mt-4 active mb-4 pr-2 pl-2" ref={this.tabResultsRef[0]}>
                                {workspaces && workspaces.length > 0 && !isGetting 
                                    ? workspaces.map((workspace, i) => (
                                        <div key={i} className="workspace-item col-12" onClick={() => redirectTo(getWorkspace(workspace.id))}>
                                            <div className="workspace-img-container ml-1">
                                                <img src={APP_PATH + (workspace.avatar_pic !== null ? workspace.avatar_pic : "images/idea.svg")} alt=""/>
                                            </div>
                                            <div className="workspace-item-text-info">
                                                <h6>{ workspace.title }</h6>
                                                <span>{ workspace.description.length < 50 ? workspace.description : workspace.description.substring(0, 47) + " ..." }</span>
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
                                <div className="scrollable-items scrollable-shadow user-tasks-container col-12 mt-4">
                                    {mixed_tasks && mixed_tasks.length > 0 && !isGetting
                                        ? mixed_tasks.map((task, i) => {
                                            let content = task.title + " (" + task.group + ")"
                                            return (
                                                <div key={i} className="task-item user-work-item" onClick={() => redirectTo(getTask(task.id))}>
                                                    <h6 className="text-right small-font">{ (task.title.length + task.group.length) < 33 ? content : content.substring(0, 30) + " ..." }</h6>
                                                    <span className="small-font">{moment(task.due_to).fromNow()} {task.finished_at !== null ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}</span>
                                                </div>
                                            )
                                        })
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
                                <div className="scrollable-items scrollable-shadow user-tasks-container col-12 mt-4">
                                    {mixed_demands && mixed_demands.length > 0 && !isGetting
                                        ? mixed_demands.map((demand, i) => (
                                            <div key={i} className="demand-item hover-bg" onClick={() => redirectTo(getDemand(demand.workspace_id, demand.id))}>
                                                <div>
                                                    <i className={`mr-1 fas ${demand.finished_at === null ? "fa-times" : "fa-cehck"}`}></i>
                                                    <img src={APP_PATH + `${TargetUser.avatar_pic ? TargetUser.avatar_pic : 'images/male-avatar.svg'}`} alt="" />
                                                </div>
                                                <i className="fas fa-long-arrow-alt-right"></i>
                                                <div className="demand-sender">
                                                    <h6 className="ml-1 small-font">{ demand.title.length < 30 ? demand.title : demand.title.substring(0, 27) + " ..." }</h6>
                                                    <img src={APP_PATH + `${demand.from.avatar_pic ? demand.from.avatar_pic : 'images/male-avatar.svg'}`} alt=""/>
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
                                <div className="scrollable-items scrollable-shadow user-tasks-container col-12 mt-4">
                                    {mixed_needs && mixed_needs.length > 0 && !isGetting
                                        ? mixed_needs.map((need, i) => (
                                            <div key={i} className="demand-item hover-bg" onClick={() => redirectTo(getDemand(need.workspace_id, need.id))}>
                                                <div className="demand-sender">
                                                    <img src={APP_PATH + `${TargetUser.avatar_pic ? TargetUser.avatar_pic : 'images/male-avatar.svg'}`} alt="" />
                                                    <h6 className="mr-1 small-font">{ need.title.length < 30 ? need.title : need.title.substring(0, 27) + " ..." }</h6>
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
                <div className="statistics-section col-12 col-md-8 float-right mt-4 mt-md-0 pr-0 pl-0 pr-md-3 pl-md-3">
                    <div className="wide-section-statistics col-12 mb-1 bg-light">
                        <div className="chart-title-section title-section col-12 p-2">
                            <i className="fas fa-handshake"></i>
                            <h5>مسئولیت ها</h5>
                        </div>
                        <div className="col-12 wide-section-charts pl-0 pr-0 pl-md-3 pr-md-3">
                            <div className="col-12 col-md-9 wide-chart p-0">
                                <div className="mt-3 mb-3 pr-0 pl-0 pr-md-3 pl-md-3 pb-2 pb-md-0">
                                    <MonthlyChart Data={charts[0].data} Title={charts[0].title} id={1}/>
                                </div>                            
                            </div>
                            <div className="col-6 offset-3 offset-md-0 col-md-3 p-0 p-md-3 mb-2 mb-md-0">
                                <CircularProgressbar value={20} text={`20%`} />
                            </div>
                        </div>
                    </div>
                    <div className="small-chart-sections-container col-12 p-0">
                        <div className="text-center bg-light col-12 col-md-6 mt-3 mt-md-0">
                            <div className="chart-title-section title-section col-12 p-2">
                                <i className="fas fa-chart-line"></i>
                                <h5>اتمام به موقع مسئولیت های</h5>
                            </div>
                            <div className="col-6 offset-3 small-section-charts p-md-3 pt-3 pb-3">
                                <CircularProgressbar value={0} text={`0%`} />
                            </div>
                        </div>
                        <div className="bg-light col-12 col-md-6 mt-3 mt-md-0">
                            <div className="chart-title-section title-section col-12 p-2">
                                <i className="fas fa-chart-bar"></i>
                                <h5>مسئولیت های ساخته شده</h5>
                            </div>
                            <div className="col-12 pr-0 pl-0 small-section-charts p-md-3 pt-3 pb-3">
                                <MonthlyChart Data={charts[1].data} Title={charts[1].title} id={2}/>
                            </div>
                        </div>
                    </div>
                    <div className="small-chart-sections-container col-12 p-0">
                        <div className="text-center bg-light col-12 col-md-6 mt-3 mt-md-0">
                            <div className="chart-title-section title-section col-12 p-2">
                                <i className="fas fa-chart-pie"></i>
                                <h5>پیشرفت در سرعت</h5>
                            </div>
                            <div className="col-6 offset-3 small-section-charts p-md-3 pt-3 pb-3">
                                <CircularProgressbar value={0} text={`0%`} />
                            </div>
                        </div>
                        <div className="bg-light col-12 col-md-6 mt-3 mt-md-0">
                            <div className="chart-title-section title-section col-12 p-2">
                                <i className="fas fa-chart-area"></i>
                                <h5>حجم مسئولیت ها</h5>
                            </div>
                            <div className="col-12 pr-0 pl-0 small-section-charts p-md-3 pt-3 pb-3">
                                <canvas id="myChart3" aria-label="Hello ARIA World" role="img"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
