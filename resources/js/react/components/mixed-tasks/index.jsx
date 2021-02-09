import React, { Component } from 'react'
import axios from 'axios'
import { getTask, getUser, getWorkspace, sweetError, setPriority, redirectTo } from '../../../helpers'
import { renderWithImg } from '../../../select2'
import { Digital } from 'react-activity'
import 'react-activity/lib/Digital/Digital.css'
import TinymcEditor from '../tinymce-editor/index'
import moment from 'moment'
moment.locale('fa')

export default class MixedTasks extends Component {
    constructor(props) {
        super(props)
        this.filterBoxRef = React.createRef()
        this.addIconRef = React.createRef()
        this.addTaskRef = React.createRef()
        this.adminViewRef = React.createRef()
        this.state = {
            isGetting: false,
            new_task_description: "",
            already_added_tasks: {},
            search_value: "",
            api_target: 'mixed',
            viewing_as_admin: false,
            target_user_id: null
        }
    }

    getData = (filtering=false) => {            
        let { get_mixed_tasks_api, mixed_tasks_search } = this.props, { already_added_tasks, viewing_as_admin, target_user_id } = this.state
        let order_by = $(`#mixed_tasks_order_by_select`).val(), order = $(`#mixed_tasks_order_select`).val(), relationship = $(`#mixed_tasks_relation_select`).val(), search_value = $(`#tasks-search-input`).val()
        this.setState(prevState => {
            if (filtering && search_value.length >= 3) {
                return {
                    isGetting: true,
                    api_target: "search"
                }
            } else if(filtering && search_value.length < 3) {
                return { 
                    isGetting: true,
                    api_target: "mixed"
                }
            } else {
                return({isGetting: true})
            }
        }, () => {
            axios.get(`${this.state.api_target === "mixed" ? get_mixed_tasks_api : mixed_tasks_search}&order_by=${order_by ? order_by : "created_at"}&order=${order ? order : "desc"}&relationship=${relationship ? relationship : "all"}${viewing_as_admin ? "&view_as_admin=true" : ""}${viewing_as_admin && target_user_id && target_user_id !== "0" ? `&user_id=${target_user_id}` : ""}&page=${this.state.tasks.nextPage}${this.state.api_target === "search" ? `&q=${search_value}` : ""}`).then(res => {
                let { data, current_page, last_page } = res.data
                let filteredArray = data.filter((item) => already_added_tasks && typeof already_added_tasks[item.id] === "undefined")
                this.setState(prevState => {
                return ({
                    tasks: {
                        data: [...prevState.tasks.data, ...filteredArray],
                        nextPage: current_page + 1,
                        hasMore: current_page === last_page ? false : true
                    },
                    isGetting: false
                })})
            })
        })
    }

    handleMore = (filtering) => {
        filtering ? this.setState({tasks: {data: [], nextPage: 1, hasMore: true}, already_added_tasks: {}}, () => this.getData(true)) : this.getData()
    }

    toggleAddBox = () => {
        this.addIconRef.current.classList.toggle("fa-plus")
        this.addIconRef.current.classList.toggle("fa-minus")
        this.addTaskRef.current.classList.toggle("d-none")
    }

    toggleFilterBox = () => {
        this.filterBoxRef.current.classList.toggle("d-none")
    }

    onDescriptionChange = (content) => {
        this.setState({
            new_task_description: content
        })
    }

    addtask = () => {
        let { post_task_api } = this.props, { new_task_description, workspace_users, target_user_id, viewing_as_admin } = this.state
        let title = $("#new-task-title").val(), priority = parseInt($("#new-task-priority").val()), users = $("#new-task-members").val(), related_task = $("#parent-task-select").val() === "0" ? "" : $("#parent-task-select").val(), workspaceId = $("#new-task-project-select").val(), group = $("#new-task-group").val(), due_to = $("input[name='due_to']").val()
        console.log(users)
        axios.post(post_task_api.replace("workspaceId", workspaceId), {
            title: title,
            priority: priority,
            group: group,
            parent_id: related_task,
            users: users,
            due_to: due_to,
            description: new_task_description 
        }).then(res => {
            let { data } = res
            let usersObj = {}
            data.users.map((user, i) => {
                usersObj[user.id] = user.id
            })
            if (typeof usersObj[target_user_id] !== "undefined" || !viewing_as_admin || target_user_id === 0) {
                this.setState(prevState => {
                    return ({
                        tasks: Object.assign(prevState.tasks, {
                            data: [
                            {
                                ...data,
                                priority: {title: setPriority(data.priority_id)},
                                users: data.users,
                                finished_at: null
                            },
                            ...prevState.tasks.data],
                        }),
                        already_added_tasks: Object.assign({}, prevState.already_added_tasks, {
                            [data.id]: data.id
                        })
                    })
                })   
            }
            Swal.default.fire({
                icon: 'success',
                title: "موفقیت",
                text: "مسئولیت جدید ثبت شد",
                showConfirmButton: true,
                customClass: {
                    content: 'persian-text'
                }
            })
        }).catch(err => {
            sweetError(err)
        })
    }

    setViewAsAdmin = () => {
        let { viewing_as_admin } = this.state, { get_all_users } = this.props
        this.adminViewRef.current.classList.toggle("d-none")
        if (! viewing_as_admin) {
            axios.get(`${get_all_users}&view_as_admin=true`).then(res => {
                let { data } = res
                this.setState({
                    allUsers: data
                })
            })
        } else {
            $("#select-user-target").val(null).change()
                this.setState({tasks: {data: [], nextPage: 1, hasMore: true}, already_added_tasks: {}}, () => this.getData())
        }
        this.setState(prevState => ({
            viewing_as_admin: !prevState.viewing_as_admin 
        }))
    }

    componentDidMount() {
        let { get_workspaces_api } = this.props
        this.setState({tasks: {data: [], nextPage: 1, hasMore: true}}, () => this.getData())
        axios.get(get_workspaces_api).then(res => {
            let { data } = res
            this.setState(prevState => {
                let workspace_obj = {}
                data.map((workspace, i) => {
                    workspace_obj[workspace.id] = workspace
                })
                return {
                    workspaces: workspace_obj
                }
            }, () => {
                data.map((workspace, i) => {
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
        const due_to_input = $("input[name='due_to']");
        var pdt = $('#task-due-to').persianDatepicker({
            format: 'dddd D MMMM YYYY، HH:mm',
            viewMode: 'day',
            onSelect: unix => {due_to_input.val(unix / 1000);},
            toolbox:{calendarSwitch:{enabled: true,format: 'YYYY'}},
            calendar:{gregorian: {due_tolocale: 'en'},persian: {locale: 'fa'}},   
            // minDate: new persianDate().valueOf(),
            timePicker: {enabled: true,second:{enabled: false},meridiem:{enabled: true}},
        })
        // here we will use select2, jquery and react states to make a connection between three select2s and the options inside them(warning: do not move this code to another js file(like select2.js) or out of this order)
        const setWorkspaceId = () => {
            let id = $("#new-task-project-select").val()
            this.setState({
                selected_workspace: id
            })
        }
        function setSelectValue (id, value) {
            let selected_task_workspace = $("#parent-task-select").find("option:selected").attr('workspace_id'), selectedProject = $("#new-task-project-select").val()
            if (selectedProject !== selected_task_workspace) {
                $(id).val(eval(value)).change()
            }
        }
        $("#parent-task-select").on("select2:select", function () {
            setSelectValue("#new-task-project-select", "selected_task_workspace")
            setWorkspaceId()
        })
        $("#new-task-project-select").on("select2:select", function () {
            setSelectValue("#parent-task-select", null)
            setWorkspaceId()
        })    
        renderWithImg("#select-user-target", "کاربر مورد نظر را انتخاب کنید", false)    
        const setTargetUser = () => {
            let id = $("#select-user-target").val()
            this.setState({
                target_user_id: id,
                already_added_tasks: {}
            }, () => {
                this.setState({tasks: {data: [], nextPage: 1, hasMore: true}}, () => this.getData())
            })
        }
        $("#select-user-target").on("select2:select", () => {
            setTargetUser()
        })   
    }

    render() {
        let { isGetting, already_added_tasks, workspaces, workspaces_users, selected_workspace, tasks, viewing_as_admin, allUsers } = this.state, { logged_in_user_id } = this.props

        return (
            <div>
                {CAN_VIEW_AS_ADMIN &&
                    <div className="form-check col-12 text-right">
                        <input className="form-check-input c-p" type="checkbox" value={viewing_as_admin} id="flexCheckDefault" onChange={this.setViewAsAdmin} />
                        <label className="form-check-label c-p" htmlFor="flexCheckDefault">
                            مشاهده به عنوان ادمین
                        </label>
                        <div className="add-task-section rtl mt-2 animated slideInLeft d-none" ref={this.adminViewRef}>
                            <div className="input-group col-12 col-md-4 pl-0 pr-0 mb-2 mb-md-0 input-group-single-line-all">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">مخاطب</span>
                                </div>
                                <select id="select-user-target" className="form-control text-right">
                                    <option></option>
                                    <option value="0" img_address={APP_PATH + "images/check-all.svg"}>همه</option>
                                    { allUsers ? allUsers.map((user, i) => {
                                        if (user.id !== CurrentUser.id) {
                                            return (
                                                <option key={i} value={user.id} img_address={user.avatar_pic !== null ? APP_PATH + user.avatar_pic : APP_PATH + 'images/male-avatar.svg'}>{user.fullname}</option>
                                            )                                            
                                        }
                                    }) : null }
                                </select>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-12 mt-3 float-right task-tab-result pr-0 pl-0 pr-md-3 pl-md-3">
                    <div className="workspace-add-task mb-2 col-12 pl-0 pr-0 pr-md-3 pl-md-3">
                        <div className="workspace-title-section title-section" onClick={this.toggleAddBox}>
                            <i className="fas fa-plus" ref={this.addIconRef}></i>
                            <h5>مسئولیت جدید</h5>
                        </div>
                        <div className="add-task-section mb-4 d-none col-12 p-3 animated fadeIn" ref={this.addTaskRef}>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 pr-md-3 pl-md-3 float-right">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">عنوان</span>
                                </div>
                                <input type="text" id="new-task-title" className="form-control" placeholder="عنوان نیاز را در این قسمت وارد کنید" />
                            </div>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 pr-md-3 pl-md-3 float-right input-group-single-line-all">
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
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 pr-md-3 pl-md-3 float-right mt-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">موعد تحویل</span>
                                </div>
                                <input type="hidden" id="new-task-due-to" name="due_to" />
                                <input type="text" id="task-due-to" className="form-control" />
                            </div>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 pr-md-3 pl-md-3 float-right mt-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">دسته بندی</span>
                                </div>
                                <input type="text" id="new-task-group" className="form-control" placeholder="این مسئولیت در چه گروهی قرار میگیرد؟" />
                            </div>  
                            <div className="input-group col-12 col-md-4 pl-0 pr-0 pr-md-3 pl-md-3 float-right mt-3 input-group-single-line-all">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">پروژه مربوطه</span>
                                </div>
                                <select id="new-task-project-select" placeholder="انتخاب پروژه اجباری">
                                    <option></option>
                                    {
                                        workspaces && Object.values(workspaces).length > 0 && Object.values(workspaces).map((workspace, i) => (
                                            <option key={i} value={workspace.id} img_address={APP_PATH + workspace.avatar_pic}>{workspace.title}</option>
                                        ))
                                    }
                                </select>
                            </div>                          
                            <div className="input-group col-12 col-md-4 pl-0 pr-0 pr-md-3 pl-md-3 float-right mt-3 input-group-single-line">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">زیر مجموعه</span>
                                </div>
                                <select id="parent-task-select">
                                    <option></option>
                                </select>
                            </div>
                            <div className="input-group col-12 col-md-4 pl-0 pr-0 pr-md-3 pl-md-3 float-right mt-3 input-group-single-line-all">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">مسئولین</span>
                                </div>
                                <select id="new-task-members" multiple>
                                    { workspaces_users && selected_workspace ? Object.values(workspaces_users[parseInt(selected_workspace)]).map((user, i) => {
                                        if (user.id !== logged_in_user_id) {
                                            return (
                                                <option key={i} value={user.id} img_address={APP_PATH + user.avatar_pic} is_admin={user.is_admin}>{user.fullname}</option>
                                            )                                            
                                        }
                                    }) : null }
                                </select>
                            </div>
                            <div className="input-group col-12 pl-0 pr-0 mt-3">
                                <div className="tinymc-container">
                                    <TinymcEditor changeContent={this.onDescriptionChange} />
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <button type="button" className="btn btn-outline-primary" onClick={this.addtask}>ارسال <i className="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="search-box p-2 p-md-4 float-right col-12">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button className="btn btn-primary" onClick={this.handleMore.bind(this, true)}>جستجو</button>
                            </div>
                            <input type="text" id="tasks-search-input" className="form-control" placeholder="جستجو در مسئولیت ها"/>
                            <div className="input-group-append">
                                <button className="btn btn-info" onClick={this.toggleFilterBox}>فیلتر ها<i className="fas fa-filter"></i></button>
                            </div>
                        </div>
                    </div>
                    <div ref={this.filterBoxRef} className="filter-box mixed-tasks-filter-box mt-2 p-2 col-12 d-none animated fadeIn">
                        <div className="filter-option col-12 col-md-6 col-lg-4 mb-3 mb-lg-0 text-center">
                            <span>جستجو در: </span>
                            <select id="mixed_tasks_relation_select" defaultValue="all">
                                <option container_class="select-option-big" value="all" icon_name="fas fa-tasks">همه</option>
                                <option container_class="select-option-big" value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                <option container_class="select-option-big" value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                                <option container_class="select-option-big" value="expired" icon_name="fas fa-calendar-minus">منقضی</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-6 col-lg-4 mb-3 mb-lg-0 text-center">
                            <span>مرتب سازی بر اساس:</span>
                            <select id="mixed_tasks_order_by_select" defaultValue="due_to">
                                <option container_class="select-option-big" value="due_to" icon_name="fas fa-hourglass-start">تاریخ تحویل</option>
                                <option container_class="select-option-big" value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                <option container_class="select-option-big" value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                <option container_class="select-option-big" value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-6 col-lg-4 mb-3 mb-lg-0 text-center">
                            <span>نحوه مرتب سازی:</span>
                            <select id="mixed_tasks_order_select" defaultValue="desc">
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
                                <th scope="col">پروژه</th>
                                <th scope="col">دسته بندی</th>
                                <th scope="col">انجام دهندگان</th>
                                <th scope="col">اولویت</th>
                                <th scope="col">موعد تحویل</th>
                                <th scope="col">وضعیت اتمام</th>
                                <th scope="col">تاریخ اتمام</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tasks && tasks.data.length > 0 && tasks.data.map((task, i) => {
                            let { title, priority_id, due_to, finished_at, id, users, workspace, group, workspace_id } = task
                            return (
                                <tr key={i} className="animated fadeIn" onClick={() => redirectTo(getTask(id))}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{ title }</td>
                                    <td className="text-right">
                                        <img className="workspace_avatar" src={APP_PATH + workspace.avatar_pic} />
                                        <a href={getWorkspace(workspace_id)}>{workspace.title}</a>
                                    </td>
                                    <td>{group}</td>
                                    <td>
                                        <div className="employees-container horizontal-centerlize">
                                            {users.length === 0 && <i className="fas fa-user-slash"></i>}
                                            {users.length === 1 && <span>{ users.length }<i className="fas fa-user mr-2"></i></span>}
                                            {users.length > 1 && <span>{ users.length }<i className="fas fa-users mr-2"></i></span>}
                                            <div className="dropdown-users d-none" onClick={(e) => e.stopPropagation()}>
                                            {users.length >= 1 && users.map((user, i) => (
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
                                                        {workspaces_users && workspaces_users[workspace_id][user.id].is_admin === 1 
                                                        ? <button className="btn btn-sm btn-success rtl admin"><span>ادمین<i className="fas fa-user-tie mr-1"></i></span></button>
                                                        : <button className="btn btn-sm btn-primary rtl"><span>عضو<i className="fas fa-user mr-1"></i></span></button>
                                                        } 
                                                    </div>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{ setPriority(priority_id) }</td>
                                    <td>
                                        {due_to !== null ? moment(due_to).fromNow() : <i className="fas fa-calendar-minus  fa-3x"></i>}
                                    </td>
                                    <td>
                                        {finished_at === null ? <i className="fas fa-times-circle fa-3x"></i> : <i className="fas fa-check-circle fa-3x"></i>}
                                    </td>
                                    <td>
                                        {finished_at === null ? <i className="fas fa-calendar-times fa-3x"></i> : moment(finished_at).fromNow()}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table> 
                    {
                        tasks && tasks.data.length > 0 && !isGetting && tasks.hasMore && (
                            <div className="text-center">
                                <button className="btn btn-outline-dark text-center" onClick={this.handleMore.bind(this, false)}>بیشتر</button>
                            </div>
                        )
                    }
                    {
                        tasks && tasks.data.length === 0 && !isGetting &&
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
