import React, { Component } from 'react'
import Axios from 'axios'
import moment from 'moment'
moment.locale('fa')
import { Digital } from 'react-activity'
import 'react-activity/dist/react-activity.css'
import { setPriority, redirectTo } from '../../../helpers'
import CounterTab from './CounterTab'
import Workspaces from './Workspaces'
import Tasks from './Tasks'
import Demands from './Demands'

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
            this.setState({ isGetting: true })
            let order_by = $(`#${tab_name}_order_by_select`).val(), order = $(`#${tab_name}_order_select`).val(), relation = $(`#${tab_name}_relation_select`).val()
            Axios.get(`${api}&limit=15&order_by=${order_by}&order=${order}&relation=${tab_name === "mixed_tasks" ? relation : tab_name === "mixed_demands" ? "asked" : "mixed_need"}${tab_name === "mixed_tasks" ? "" : `&filter=${relation}`}`).then(res =>{
                let { data } = res
                this.setState({
                    [tab_name]: data,
                    isGetting: false                    
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
                                    <i className={`fas fa-${item.icon} d-block d-md-inline`}></i>
                                    {item.text}
                                </a>
                            )
                        })}
                    </nav>
                    <div className="result-container col-12 mt-3 active" ref={this.tabResultsRef[0]}>
                        {isGetting
                            ? <div className="text-center"><Digital color="#000000" size={24} /></div>
                            : <Workspaces AllWorkspaces={workspaces} Route={workspace_route} />
                        }
                    </div>
                    <div className="result-container col-12 mt-3" ref={this.tabResultsRef[1]}>
                        <Tasks AllTasks={mixed_tasks} Route={task_route} workspace_route={workspace_route} sortData={(tab) => this.sortData.bind(this, tab)} isGetting={isGetting} workspaces_users={workspaces_users} />
                    </div>
                    <div className="result-container col-12 mt-3" ref={this.tabResultsRef[2]}>
                        <Demands mixed_demands={mixed_demands} demand_show_route={demand_show_route} task_route={task_route} workspace_route={workspace_route} sortData={(tab) => this.sortData.bind(this, tab)} user_profile_route={user_profile_route} isGetting={isGetting} workspaces_users={workspaces_users} />
                    </div>

                    <div className="result-container col-12 mt-3" ref={this.tabResultsRef[3]}>
                        <Demands mixed_needs={mixed_needs} demand_show_route={demand_show_route} task_route={task_route} workspace_route={workspace_route} sortData={(tab) => this.sortData.bind(this, tab)} user_profile_route={user_profile_route} isGetting={isGetting} workspaces_users={workspaces_users} />
                    </div>
                </div>
            </div>
        )
    }
}
