import React, { Component } from 'react'
import axios from 'axios'
import { getTask, getDemand, getUser, getWorkspace, sweetError } from '../../../helpers'
import { Digital } from 'react-activity'
import 'react-activity/lib/Digital/Digital.css'
import TinymcEditor from '../tinymce-editor/index'
import { setPriority, redirectTo } from '../../../helpers'
import moment from 'moment'
moment.locale('fa')

export default class MixedDemands extends Component {
    constructor(props) {
        super(props)
        this.tabTitlesRefs = []
        this.tabResultsRefs = []
        this.filterBoxRefs = []
        this.addIconRef = React.createRef()
        this.addDemandRef = React.createRef()
        for (let index = 0; index < 2; index++) {
            this.tabTitlesRefs.push(React.createRef())
            this.tabResultsRefs.push(React.createRef())
            this.filterBoxRefs.push(React.createRef())
        }
        this.state = {
            current_tab: 'demands',
            isGetting: false,
            new_demand_description: "",
            already_added_needs: {}
        }
    }

    changeTab = (tab_index) => {
        this.tabTitlesRefs.map((titleRef, i) => {
            if (tab_index === i) {
                this.tabTitlesRefs[i].current.classList.add("active")
                this.tabResultsRefs[i].current.classList.add("active")
            } else {
                this.tabTitlesRefs[i].current.classList.remove("active")
                this.tabResultsRefs[i].current.classList.remove("active")
            }
        })
        let activeTab
        this.setState(prevState => {
            switch (tab_index) {
                case 0:
                    activeTab = "demands"
                    break;
            
                case 1:
                    activeTab = "needs"
                    break;

                default:
                    break;
            }
            return ({
                current_tab: activeTab
            })
        }, () => {
            if (typeof this.state[activeTab] === 'undefined') {
                this.setState({[activeTab]: {data: [], nextPage: 1, hasMore: true}}, () => this.getData())
            }
        })
    }

    getData = () => {            
        let { get_mixed_demands_api } = this.props, { current_tab, already_added_needs } = this.state
        let order_by = $(`#mixed_${current_tab}_order_by_select`).val(), order = $(`#mixed_${current_tab}_order_select`).val(), filter = $(`#mixed_${current_tab}_relation_select`).val()
        this.setState({ isGetting: true })
        axios.get(`${get_mixed_demands_api}${current_tab === "demands" ? "&relationship=asked" : ""}&order_by=${order_by ? order_by : "created_at"}&order=${order ? order : "desc"}&filter=${filter ? filter : "all"}&page=${this.state[current_tab].nextPage}`).then(res => {
            let { data, current_page, last_page } = res.data
            let filteredArray = data.filter((item) => already_added_needs && typeof already_added_needs[item.id] === "undefined")
            this.setState(prevState => {
            return ({
                [current_tab]: {
                    data: [...prevState[current_tab].data, ...filteredArray],
                    nextPage: current_page + 1,
                    hasMore: current_page === last_page ? false : true
                },
                isGetting: false
            })})
        })
    }

    handleMore = (filtering) => {
        let { current_tab } = this.state
        filtering ? this.setState({[current_tab]: {data: [], nextPage: 1, hasMore: true}, already_added_needs: {}}, () => this.getData()) : this.getData()
    }

    toggleAddBox = () => {
        this.addIconRef.current.classList.toggle("fa-plus")
        this.addIconRef.current.classList.toggle("fa-minus")
        this.addDemandRef.current.classList.toggle("d-none")
    }

    toggleFilterBox = (index) => {
        this.filterBoxRefs[index].current.classList.toggle("d-none")
    }

    onDescriptionChange = (content) => {
        this.setState({
            new_demand_description: content
        })
    }

    addDemand = () => {
        let { post_demand_api } = this.props, { new_demand_description, workspace_users } = this.state
        let title = $("#new-demand-title").val(), priority = parseInt($("#new-task-priority").val()), toUser = $("#new-demand-member").val(), related_task = $("#task-select").val() === "0" ? "" : $("#task-select").val(), workspaceId = $("#new-demand-project-select").val()
        axios.post(post_demand_api.replace("workspaceId", workspaceId), {
            title: title,
            priority: priority,
            task_id: related_task,
            target_user: toUser,
            text: new_demand_description 
        }).then(res => {
            let { data } = res
            this.setState(prevState => {
                return ({
                    needs: Object.assign(prevState.needs, {
                        data: [{...data, priority: {title: setPriority(data.priority_id)}, to: {id: data.to_id, fullname: workspace_users[data.to_id].fullname, avatar_pic: workspace_users[data.to_id].avatar_pic}, task: null}, ...prevState.needs.data],
                    }),
                    already_added_needs: Object.assign({}, prevState.already_added_needs, {
                        [data.id]: data.id
                    })
                })
            })
            Swal.fire({
                icon: 'success',
                title: "موفقیت",
                text: "درخواست شما ارسال شد",
                showConfirmButton: true,
                customClass: {
                    content: 'persian-text'
                }
            })
        }).catch(err => {
            sweetError(err)
        })
    }

    componentDidMount() {
        let { current_tab } = this.state, { get_workspaces_api } = this.props
        this.setState({[current_tab]: {data: [], nextPage: 1, hasMore: true}}, () => this.getData())
        axios.get(get_workspaces_api).then(res => {
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
                        })
                    }))
                })
            })
        })
        $("#new-demand-project-select").on("select2:select", () => this.setState({selectedProject: $("#new-demand-project-select").val()}))
    }

    render() {
        let { demands, needs, isGetting, already_added_needs, workspaces, workspaces_users, selectedProject } = this.state, { logged_in_user_id, demand_show_route } = this.props

        return (
            <div>
                <nav className="demands-tabs-titles col-12 mt-2">
                    <a className="demand-tab-title-small-arrow active" ref={this.tabTitlesRefs[0]} onClick={this.changeTab.bind(this, 0)}>
                        <i className="fas fa-arrow-circle-down animated tada delay-1s"></i>
                        <span>درخواست</span>
                    </a>
                    <a className="demand-tab-title-small-arrow" ref={this.tabTitlesRefs[1]} onClick={this.changeTab.bind(this, 1)}>
                        <i className="fas fa-arrow-circle-up animated tada delay-1s"></i>
                        <span>نیاز</span>
                    </a>
                </nav>
                <div className="col-12 mt-4 float-right demand-tab-result active pr-0 pl-0 pr-md-3 pl-md-3" ref={this.tabResultsRefs[0]}>
                    <div className="search-box p-2 p-md-4">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button className="btn btn-primary" onClick={this.handleMore.bind(this, true)}>جستجو</button>
                            </div>
                            <input type="text" className="form-control" placeholder="جستجو در خواسته ها"/>
                            <div className="input-group-append">
                                <button className="btn btn-info" onClick={this.toggleFilterBox.bind(this, 0)}>فیلتر ها<i className="fas fa-filter"></i></button>
                            </div>
                        </div>
                    </div>
                    <div ref={this.filterBoxRefs[0]} className="filter-box mixed-demands-filter-box mt-2 p-2 col-12 d-none animated fadeIn">
                        <div className="filter-option mb-4 mb-lg-0 text-center col-12 col-md-6 col-lg-3">
                            <span>جستجو در: </span>
                            <select id="mixed_demands_relation_select" defaultValue="all">
                                <option container_class="select-option-big" value="all" icon_name="fas fa-tasks">همه</option>
                                <option container_class="select-option-big" value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                <option container_class="select-option-big" value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                            </select>
                        </div>
                        <div className="filter-option mb-4 mb-lg-0 text-center col-12 col-md-6 col-lg-3">
                            <span>مرتب سازی بر اساس:</span>
                            <select id="mixed_demands_order_by_select" defaultValue="createdw">
                                <option container_class="select-option-big" value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                <option container_class="select-option-big" value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                <option container_class="select-option-big" value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                            </select>
                        </div>
                        <div className="filter-option mb-4 mb-lg-0 text-center col-12 col-md-6 col-lg-3">
                            <span>نحوه مرتب سازی:</span>
                            <select id="mixed_demands_order_select" defaultValue="desc">
                                <option container_class="select-option-big" value="asc" icon_name="fas fa-sort-amount-up">صعودی</option>
                                <option container_class="select-option-big" value="desc" icon_name="fas fa-sort-amount-down">نزولی</option>
                            </select>
                        </div>
                    </div>
                    <table className="col-12 table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated bounce mt-4">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">عنوان</th>
                                <th scope="col">پروژه مربوطه</th>
                                <th scope="col">درخواست کننده</th>
                                <th scope="col">تسک مربوطه</th>
                                <th scope="col">اولویت</th>
                                <th scope="col">وضعیت اتمام</th>
                                <th scope="col">تاریخ اتمام</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demands && demands.data.length > 0 && demands.data.map((demand, i) => {
                                let { title, task, priority, finished_at, from } = demand
                                return (
                                    <tr key={i} className="animated fadeIn" onClick={() => redirectTo(getDemand(demand.id))}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{ title }</td>
                                        <td className="text-right">
                                            <img className="workspace_avatar" src={APP_PATH + demand.workspace.avatar_pic} />
                                            <a href={getWorkspace(demand.workspace.id)}>{demand.workspace.title}</a>
                                        </td>
                                        <td>
                                            <div className="employees-container horizontal-centerlize">
                                                <span>{ from.fullname }</span>
                                                <div className="dropdown-users d-none" onClick={(e) => e.stopPropagation()}>
                                                    <div className="user-dropdown-item animated jackInTheBox">
                                                        <div className="user-right-flex">
                                                            <div className="user-img-container ml-2">
                                                                <img src={from.avatar_pic !== null ? APP_PATH + from.avatar_pic : APP_PATH + 'images/male-avatar.svg'} />
                                                            </div>
                                                            <div className="user-info ml-2">
                                                                <p>{ from.fullname }</p>
                                                                <a href={getUser(from.id)}>@{from.name}</a>
                                                            </div>
                                                        </div>
                                                        <div className="user-label-container">
                                                            {
                                                                workspaces_users && workspaces_users[demand.workspace.id][from.id].is_admin === 1 
                                                                ? <button className="btn btn-sm btn-success rtl admin p-1"><span>ادمین<i className="fas fa-user-tie mr-1"></i></span></button>
                                                                : <button className="btn btn-sm btn-primary rtl"><span>عضو<i className="fas fa-user mr-1"></i></span></button>
                                                            } 
                                                        </div>
                                                    </div>                                                
                                                </div>
                                            </div>
                                        </td>

                                        <td>{task !== null ? <a href={getTask(task.id)}>{ task.title }</a> : <i className="fas fa-minus fa-3x"></i>}</td>
                                        <td>{ priority.title }</td>
                                        <td>
                                            {finished_at === null ? <i className="fas fa-times-circle fa-3x"></i> : <i className="fas fa-check-circle fa-3x"></i>}
                                        </td>
                                        <td>
                                            {finished_at === null ? <i className="fas fa-calendar-times fa-3x"></i> : moment(finished_at).fromNow()}
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table> 
                    {
                        demands && demands.data.length > 0 && !isGetting && demands.hasMore && (
                            <div className="text-center">
                                <button className="btn btn-outline-dark text-center" onClick={this.handleMore.bind(this, false)}>بیشتر</button>
                            </div>
                        )
                    }
                    {
                        demands && demands.data.length === 0 && !isGetting &&
                            <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                    }
                    {
                        isGetting &&
                            <div className="text-center">
                                <Digital color="#000000" size={24} />
                            </div>
                    }
                </div>
                <div className="col-12 mt-4 float-right demand-tab-result pr-0 pl-0 pr-md-3 pl-md-3" ref={this.tabResultsRefs[1]}>
                    <div className="workspace-add-task mb-2 col-12 pl-0 pr-0 pr-md-3 pl-md-3">
                        <div className="workspace-title-section title-section" onClick={this.toggleAddBox}>
                            <i className="fas fa-plus" ref={this.addIconRef}></i>
                            <h5>نیاز جدید</h5>
                        </div>
                        <div className="add-task-section mb-4 d-none col-12 p-3 animated fadeIn" ref={this.addDemandRef}>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">عنوان</span>
                                </div>
                                <input type="text" id="new-demand-title" className="form-control" placeholder="عنوان نیاز را در این قسمت وارد کنید" />
                            </div>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0 input-group-single-line-all">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">اولویت</span>
                                </div>
                                <select id="new-task-priority" defaultValue="1">
                                    <option value="1" icon_name="fas fa-hourglass-end">ضروری و مهم</option>
                                    <option value="2" icon_name="fas fa-hourglass-half">ضروری و غیر مهم</option>
                                    <option value="3" icon_name="fas fa-hourglass-start">غیر ضروری و غیر مهم</option>
                                    <option value="4" icon_name="fas fa-hourglass">غیر ضروری و غیر مهم</option>
                                </select>
                            </div>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0 input-group-single-line-all">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">پروژه مربوطه</span>
                                </div>
                                <select id="new-demand-project-select" placeholder="(انتخاب پروژه (اجباری">
                                    <option></option>
                                    {
                                        workspaces && workspaces.map((workspace, i) => (
                                            <option key={i} value={workspace.id} img_address={APP_PATH + workspace.avatar_pic}>{workspace.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0 input-group-single-line-all">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">کار مربوطه</span>
                                </div>
                                <select id="task-select">
                                    <option></option>
                                    <option value="0">هیچکدام</option>
                                    <option value="1">کیر تو کون کردن</option>
                                    <option value="2">جق زدن رو قرآن</option>
                                </select>
                            </div>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0 input-group-single-line-all">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">مخاطب نیاز</span>
                                </div>
                                <select id="new-demand-member" className="form-control text-right">
                                    { workspaces_users && selectedProject ? Object.values(workspaces_users[parseInt(selectedProject)]).map((user, i) => {
                                        if (user.id !== logged_in_user_id) {
                                            return (
                                                <option key={i} value={user.id} img_address={user.avatar_pic !== null ? APP_PATH + user.avatar_pic : APP_PATH + 'images/male-avatar.svg'} is_admin={user.is_admin}>{user.fullname}</option>
                                            )                                            
                                        }
                                    }) : null }
                                </select>
                            </div>
                            <div className="input-group col-12 pl-0 pr-0">
                                {/* <div className="input-group-prepend">
                                    <span className="input-group-text">توضیحات</span>
                                </div> */}
                                <div className="tinymc-container">
                                    <TinymcEditor changeContent={this.onDescriptionChange} />
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <button type="button" className="btn btn-outline-primary" onClick={this.addDemand}>ارسال <i className="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="search-box p-2 p-md-4 float-right col-12">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button className="btn btn-primary" onClick={this.handleMore.bind(this, true)}>جستجو</button>
                            </div>
                            <input type="text" className="form-control" placeholder="جستجو در نیاز ها"/>
                            <div className="input-group-append">
                                <button className="btn btn-info" onClick={this.toggleFilterBox.bind(this, 1)}>فیلتر ها<i className="fas fa-filter"></i></button>
                            </div>
                        </div>
                    </div>
                    <div ref={this.filterBoxRefs[1]} className="filter-box mixed-demands-filter-box mt-2 p-2 col-12 d-none animated fadeIn">
                        <div className="filter-option col-12 col-md-6 col-lg-4 mb-3 mb-lg-0 text-center">
                            <span>جستجو در: </span>
                            <select id="mixed_needs_relation_select" defaultValue="all">
                                <option container_class="select-option-big" value="all" icon_name="fas fa-tasks">همه</option>
                                <option container_class="select-option-big" value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                <option container_class="select-option-big" value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-6 col-lg-4 mb-3 mb-lg-0 text-center">
                            <span>مرتب سازی بر اساس:</span>
                            <select id="mixed_needs_order_by_select" defaultValue="createdw">
                                <option container_class="select-option-big" value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                <option container_class="select-option-big" value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                <option container_class="select-option-big" value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-6 col-lg-4 mb-3 mb-lg-0 text-center">
                            <span>نحوه مرتب سازی:</span>
                            <select id="mixed_needs_order_select" defaultValue="desc">
                                <option container_class="select-option-big" value="asc" icon_name="fas fa-sort-amount-up">صعودی</option>
                                <option container_class="select-option-big" value="desc" icon_name="fas fa-sort-amount-down">نزولی</option>
                            </select>
                        </div>
                    </div>
                    <table className="col-12 table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated bounce mt-4">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">عنوان</th>
                                <th scope="col">پروژه مربوطه</th>
                                <th scope="col">مخاطب</th>
                                <th scope="col">تسک مربوطه</th>
                                <th scope="col">اولویت</th>
                                <th scope="col">وضعیت اتمام</th>
                                <th scope="col">تاریخ اتمام</th>
                            </tr>
                        </thead>
                        <tbody>
                            {needs && needs.data.length > 0 && needs.data.map((need, i) => {
                                let { title, task, priority, due_to, finished_at, to, id } = need
                                return (
                                    <tr key={i} className="animated fadeIn" onClick={() => redirectTo(getDemand(need.id))}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{ title }</td>
                                        <td className="text-right">
                                            <img className="workspace_avatar" src={APP_PATH + need.workspace.avatar_pic} />
                                            <a href={getWorkspace(need.workspace.id)}>{need.workspace.title}</a>
                                        </td>
                                        <td>
                                            <div className="employees-container horizontal-centerlize">
                                                <span>{ to.fullname }</span>
                                                <div className="dropdown-users d-none" onClick={(e) => e.stopPropagation()}>
                                                    <div className="user-dropdown-item animated jackInTheBox">
                                                        <div className="user-right-flex">
                                                            <div className="user-img-container ml-2">
                                                                <img src={to.avatar_pic !== null ? APP_PATH + to.avatar_pic : APP_PATH + 'images/male-avatar.svg'} />
                                                            </div>
                                                            <div className="user-info ml-2">
                                                                <p>{ to.fullname }</p>
                                                                <a href={getUser(to.id)}>@{to.name}</a>
                                                            </div>
                                                        </div>
                                                        <div className="user-label-container">
                                                            {
                                                                workspaces_users && workspaces_users[need.workspace.id][to.id].is_admin === 1 
                                                                ? <button className="btn btn-sm btn-success rtl admin p-1"><span>ادمین<i className="fas fa-user-tie mr-1"></i></span></button>
                                                                : <button className="btn btn-sm btn-primary rtl"><span>عضو<i className="fas fa-user mr-1"></i></span></button>
                                                            } 
                                                        </div>
                                                    </div>                                                
                                                </div>
                                            </div>
                                        </td>
                                        <td>{task !== null ? <a href={getTask(task.id)}>{ task.title }</a> : <i className="fas fa-minus fa-3x"></i>}</td>
                                        <td>{ priority.title }</td>
                                        <td>
                                            {finished_at === null ? <i className="fas fa-times-circle fa-3x"></i> : <i className="fas fa-check-circle fa-3x"></i>}
                                        </td>
                                        <td>
                                            {finished_at === null ? <i className="fas fa-calendar-times fa-3x"></i> : moment(finished_at).fromNow()}
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table> 
                    {
                        needs && needs.data.length > 0 && !isGetting && needs.hasMore && (
                            <div className="text-center">
                                <button className="btn btn-outline-dark text-center" onClick={this.handleMore.bind(this, false)}>بیشتر</button>
                            </div>
                        )
                    }
                    {
                        needs && needs.data.length === 0 && !isGetting &&
                            <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                    }
                    {
                        isGetting &&
                            <div className="text-center">
                                <Digital color="#000000" size={24} />
                            </div>
                    }
                </div>
            </div>
        )
    }
}