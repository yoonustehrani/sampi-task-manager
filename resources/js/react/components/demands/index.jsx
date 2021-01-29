import React, { Component } from 'react'
import { Digital } from 'react-activity'
import moment from 'moment'
moment.locale('fa')
import axios from 'axios'
import 'react-activity/dist/react-activity.css'
import TinymcEditor from '../tinymce-editor/index'
import Swal from 'sweetalert2'
import { setPriority, redirectTo } from '../../../helpers'

export default class Demands extends Component {
    constructor(props) {
        super(props)
        this.tabTitlesRef = []
        this.tabResultsRef = []
        this.addIconRef = React.createRef()
        this.addDemandRef = React.createRef()
        for (let index = 0; index < 2; index++) {
            this.tabTitlesRef.push(React.createRef())
            this.tabResultsRef.push(React.createRef())
        }
        this.state = {
            current_tab: 'demands',
            isGetting: false,
            new_demand_description: "",
            already_added_needs: {}
        }
    }

    changeTab = (tab_index) => {
        this.tabTitlesRef.map((titleRef, i) => {
            if (tab_index === i) {
                this.tabTitlesRef[i].current.classList.add("active")
                this.tabResultsRef[i].current.classList.add("active")
            } else {
                this.tabTitlesRef[i].current.classList.remove("active")
                this.tabResultsRef[i].current.classList.remove("active")
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
        let { get_tickets_api } = this.props, { current_tab, already_added_needs } = this.state
        let order_by = $(`#mixed_${current_tab}_order_by_select`).val(), order = $(`#mixed_${current_tab}_order_select`).val(), filter = $(`#mixed_${current_tab}_relation_select`).val()
        this.setState({ isGetting: true })
        axios.get(`${get_tickets_api}${current_tab === "demands" ? "&relationship=asked" : ""}&order_by=${order_by}&order=${order}&filter=${filter}&page=${this.state[current_tab].nextPage}`).then(res => {
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

    onDescriptionChange = (content) => {
        this.setState({
            new_demand_description: content
        })
    }

    addDemand = () => {
        let { post_new_ticket_api } = this.props, { new_demand_description, workspace_users } = this.state
        let title = $("#new-demand-title").val(), priority = parseInt($("#new-task-priority").val()), toUser = $("#new-demand-member").val(), related_task = $("#task-select").val() === "0" ? "" : $("#task-select").val()
        axios.post(post_new_ticket_api, {
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
            let { status, data } = err.response
            if (status === 422) {
                let { errors } = data, err_html = ""
                Object.entries(errors).map(([param, message]) => {
                    err_html += `<p class="float-right text-center col-12">${message}</p>`
                })
                Swal.fire({
                    icon: "error",
                    title: "خطا",
                    html: err_html,
                    confirmButtonText: "تایید",
                    customClass: {
                        content: 'persian-text',
                    },
                })
            }
        })
    }

    componentDidMount() {
        let { current_tab } = this.state, { get_workspace_api } = this.props
        this.setState({[current_tab]: {data: [], nextPage: 1, hasMore: true}}, () => this.getData())
        axios.get(get_workspace_api).then(res => {
            let { data } = res
            this.setState({workspace: data}, () => {
                this.state.workspace.users.map((user, i) => {
                    this.setState(prevState => ({
                        workspace_users: Object.assign({}, prevState.workspace_users, {
                            [user.id]: {
                                is_admin: user.pivot.is_admin,
                                fullname: user.fullname,
                                name: user.name,
                                avatar_pic: user.avatar_pic
                            } // we have a clear object in our states that tells us all the informations that we need about users
                        }),
                    }))
                })
            })
        })
    }
    
    render() {
        let { demands, needs, isGetting, workspace, already_added_needs } = this.state, { user_profile_route, task_route, logged_in_user_id, demand_show_route } = this.props
        return (
            <div>
                <nav className="demands-tabs-titles col-12">
                    <a href="#demands" className="demand-tab-title active" ref={this.tabTitlesRef[0]} onClick={this.changeTab.bind(this, 0)}>
                        <span>درخواست</span>
                        {/* <i className="fas fa-long-arrow-alt-left right-arrow animated slideInLeft"></i> */}
                        <i className="fas fa-long-arrow-alt-down left-arrow animated slideInDown"></i>
                    </a>
                    <a href="#needs" className="demand-tab-title" ref={this.tabTitlesRef[1]} onClick={this.changeTab.bind(this, 1)}>
                        {/* <i className="fas fa-long-arrow-alt-right left-arrow animated slideInRight"></i> */}
                        <i className="fas fa-long-arrow-alt-up left-arrow animated slideInUp"></i>
                        <span>نیاز</span>
                    </a>
                </nav>
                <div className="col-12 mt-4 float-right demand-tab-result active" ref={this.tabResultsRef[0]}>
                    <div className="filter-box demand-bg-color mb-4 p-2 col-12 animated fadeIn">
                        <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                            <span>جستجو در: </span>
                            <select id="mixed_demands_relation_select" defaultValue="all">
                                <option container_class="select-option-big" value="all" icon_name="fas fa-tasks">همه</option>
                                <option container_class="select-option-big" value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                <option container_class="select-option-big" value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                            <span>مرتب سازی بر اساس:</span>
                            <select id="mixed_demands_order_by_select" defaultValue="createdw">
                                <option container_class="select-option-big" value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                <option container_class="select-option-big" value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                <option container_class="select-option-big" value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                            <span>نحوه مرتب سازی:</span>
                            <select id="mixed_demands_order_select" defaultValue="desc">
                                <option container_class="select-option-big" value="asc" icon_name="fas fa-sort-amount-up">صعودی</option>
                                <option container_class="select-option-big" value="desc" icon_name="fas fa-sort-amount-down">نزولی</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-outline-info" onClick={this.handleMore.bind(this, true)}>مرتب سازی</button>
                        </div>
                    </div>
                    <table className="col-12 table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated bounce">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">عنوان</th>
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
                                    <tr key={i} className="animated fadeIn" onClick={() => redirectTo(demand_show_route.replace("demandId", demand.id))}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{ title }</td>
                                        <td><a href={user_profile_route.replace("userId", from.id)}>{ from.fullname }</a></td>
                                        <td>{task !== null ? <a href={task_route.replace("taskId", task.id)}>{ task.title }</a> : <i className="fas fa-minus fa-3x"></i>}</td>
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
                        demands && demands.data.length <= 0 && !isGetting &&
                            <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                    }
                    {
                        isGetting &&
                            <div className="text-center">
                                <Digital color="#000000" size={24} />
                            </div>
                    }
                </div>
                <div className="col-12 mt-4 float-right demand-tab-result" ref={this.tabResultsRef[1]}>
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
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0 input-group-single-line">
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
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0 input-group-single-line">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">مخاطب نیاز</span>
                                </div>
                                <select id="new-demand-member" className="form-control text-right">
                                    { workspace ? workspace.users.map((user, i) => {
                                        if (user.id !== logged_in_user_id) {
                                            return (
                                                <option key={i} value={user.id} img_address={user.avatar_pic !== null ? APP_PATH + user.avatar_pic : APP_PATH + 'images/male-avatar.svg'}>{user.fullname}</option>
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
                    <div className="filter-box demand-bg-color mb-4 p-2 col-12 animated fadeIn">
                        <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                            <span>جستجو در: </span>
                            <select id="mixed_needs_relation_select" defaultValue="all">
                                <option container_class="select-option-big" value="all" icon_name="fas fa-tasks">همه</option>
                                <option container_class="select-option-big" value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                <option container_class="select-option-big" value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                            <span>مرتب سازی بر اساس:</span>
                            <select id="mixed_needs_order_by_select" defaultValue="createdw">
                                <option container_class="select-option-big" value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                <option container_class="select-option-big" value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                <option container_class="select-option-big" value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                            <span>نحوه مرتب سازی:</span>
                            <select id="mixed_needs_order_select" defaultValue="desc">
                                <option container_class="select-option-big" value="asc" icon_name="fas fa-sort-amount-up">صعودی</option>
                                <option container_class="select-option-big" value="desc" icon_name="fas fa-sort-amount-down">نزولی</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-outline-info" onClick={this.handleMore.bind(this, true)}>مرتب سازی</button>
                        </div>
                    </div>
                    <table className="col-12 table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated bounce">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">عنوان</th>
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
                                    <tr key={i} className="animated fadeIn" onClick={() => redirectTo(demand_show_route.replace("demandId", demand.id))}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{ title }</td>
                                        <td><a href={user_profile_route.replace("userId", to.id)}>{ to.fullname }</a></td>
                                        <td>{task !== null ? <a href={task_route.replace("taskId", task.id)}>{ task.title }</a> : <i className="fas fa-minus fa-3x"></i>}</td>
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
                        needs && needs.length <= 0 && !isGetting &&
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
