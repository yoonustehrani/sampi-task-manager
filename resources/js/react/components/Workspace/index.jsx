import React, { Component } from 'react'
import TinymcEditor from '../tinymce-editor/index'
import Axios from 'axios'
import moment from 'moment'
moment.locale('fa')
import { Squares } from 'react-activity'
import 'react-activity/dist/react-activity.css'
import Swal from 'sweetalert2'
import { setPriority, redirectTo } from '../../../helpers'
import Task from './Task'

export default class Workspace extends Component {
    constructor(props) {
        super(props)
        this.addTaskRef = React.createRef()
        this.addIconRef = React.createRef()
        this.state = {
            new_task_description: "",
            isGetting: true,
            tasks: {
                data: [],
                nextPage: 1,
                hasMore: true,
            },
            already_added_tasks: {}
        }
    }

    toggleAddBox = () => {
        this.addIconRef.current.classList.toggle("fa-plus")
        this.addIconRef.current.classList.toggle("fa-minus")
        this.addTaskRef.current.classList.toggle("d-none")
    }

    onDescriptionChange = (content) => {
        this.setState({
            new_task_description: content
        })
    }

    handleMore = (table, filtering) => {
        let { list_tasks_api } = this.props
        let { tasks, already_added_tasks } = this.state
        let tasks_order_by = $('#tasks_order_by_select').val(), tasks_order = $('#tasks_order_select').val(), tasks_relation = $('#tasks_relation_select').val()
        const getList = (table) => {            
            Axios.get(`${eval("list_" + table + "_api")}&order_by=${eval(table + "_order_by")}&order=${eval(table + "_order")}&relationship=${eval(table + "_relation")}&page=${this.state[table].nextPage}`).then(res => {
                let { data, current_page, last_page } = res.data
                let filteredArray = data.filter((item) => already_added_tasks && typeof already_added_tasks[item.id] === "undefined")
                this.setState(prevState => {
                return ({
                    [table]: {
                        data: [...prevState[table].data, ...filteredArray],
                        nextPage: current_page + 1,
                        hasMore: current_page === last_page ? false : true
                    },
                    isGetting: false
                })})
            })
        }
        this.setState(prevState => { 
            return ({
                isGetting: true,
                already_added_tasks: filtering ? {} : prevState.already_added_tasks
            })
        })
        if (table == 'tasks') {
            filtering ? this.setState({tasks: {data: [], nextPage: 1, hasMore: true}}, () => {getList("tasks")}) : getList("tasks")
        }
    }

    addTask = () => {
        let { add_task_api } = this.props, { new_task_description, workspace_users } = this.state
        let title = $("#new-task-title").val(), group = $("#new-task-group").val(), priority = parseInt($("#new-task-priority").val()), users = $("#new-task-members").val(), description = new_task_description, due_to = $("input[name='due_to']").val()
        Axios.post(add_task_api, {
            title: title,
            priority: priority,
            group: group,
            users: users,
            description: new_task_description,
            due_to: due_to ? due_to : null
        }).then(res => {
            this.setState(prevState => {
                let new_task_users = users.map((userId, i) => {
                    return ({
                        id: userId,
                        fullname: workspace_users[userId].fullname,
                        name: workspace_users[userId].name,
                    })
                })
                new_task_users.unshift({id: CurrentUser.id, fullname: workspace_users[CurrentUser.id].fullname, name: workspace_users[CurrentUser.id].name})
                return ({
                    tasks: Object.assign({}, prevState.tasks, {
                        data: [{...res.data, users: new_task_users, finished_at: null, finisher_id: null}, ...prevState.tasks.data]
                    }),
                    already_added_tasks: Object.assign({}, prevState.already_added_tasks, {
                        [res.data.id]: res.data.id
                    })
                })
            })
            Swal.fire({
                icon: 'success',
                title: "موفقیت",
                text: "کار شما به لیست افزوده شد",
                showConfirmButton: true,
                customClass: {
                    content: "persian-text"
                }
            })
        }).catch(err => {
            let {status, data} = err.response
            if (status === 422) {
                let {errors} = data, err_html = ""
                Object.entries(errors).map(([param, message]) => {
                    err_html += `<p class="float-right text-center col-12">${message}</p><br>`
                })
                Swal.fire({
                    title: 'خطا',
                    html: err_html,
                    icon: 'error',
                    confirmButtonText: 'تایید',
                    customClass: {
                        content: 'persian-text'
                    }
                })
            }
        })
    }

    componentDidMount() {     
        let { workspace_api } = this.props
        this.handleMore("tasks", false)
        const due_to_input = $("input[name='due_to']");
        $('#task-due-to').persianDatepicker({
            format: 'dddd D MMMM YYYY، HH:mm',
            viewMode: 'day',
            onSelect: unix => {due_to_input.val(unix / 1000);},
            toolbox:{calendarSwitch:{enabled: true,format: 'YYYY'}},
            calendar:{gregorian: {locale: 'en'},persian: {locale: 'fa'}},
            minDate: new persianDate().valueOf(),
            timePicker: {enabled: true,second:{enabled: false},meridiem:{enabled: true}}
        });
        Axios.get(workspace_api).then(res => {
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
        let { isGetting, tasks, workspace_users, workspace } = this.state
        let { taskRoute } = this.props
        return (
            <div>
                <div className="float-right col-12 pr-0 pl-0 pr-md-3 pl-md-3">
                    <div className="workspace-title-section title-section col-12">
                        <i className="fas fa-clipboard-list"></i>
                        <h4 className="">وظایف :</h4>      
                    </div>  
                    <div className="workspace-add-task mb-2 col-12 pl-0 pr-0 pr-md-3 pl-md-3">
                        <div className="workspace-title-section title-section" onClick={this.toggleAddBox}>
                            <i className="fas fa-plus" ref={this.addIconRef}></i>
                            <h5>افزودن کار</h5>
                        </div>
                        <div className="add-task-section d-none col-12 p-3 animated fadeIn" ref={this.addTaskRef}>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">عنوان</span>
                                </div>
                                <input type="text" id="new-task-title" className="form-control" placeholder="عنوان کار را در این قسمت وارد کنید" />
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
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">دسته بندی</span>
                                </div>
                                <input type="text" id="new-task-group" className="form-control" placeholder="این کار در چه گروهی قرار میگیرد؟" />
                            </div>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">موعد تحویل</span>
                                </div>
                                <input type="hidden" id="new-task-due-to" name="due_to"/>
                                <input type="text" id="task-due-to" className="form-control" />
                            </div>
                            <div className="input-group col-12 col-md-6 pl-0 pr-0 mb-2 mb-md-0 input-group-single-line">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">مسئولین</span>
                                </div>
                                <select id="new-task-members" className="form-control text-right" multiple>
                                    <option></option>
                                    { workspace ? workspace.users.map((user, i) => {
                                        if (user.id !== CurrentUser.id) {
                                            return (
                                                <option key={i} value={user.id} img_address={APP_PATH + user.avatar_pic}>{user.fullname}</option>
                                            )                                            
                                        }
                                    }) : null }
                                </select>
                            </div>
                            <div className="input-group col-12 pl-0 pr-0">
                                <div className="tinymc-container">
                                    <TinymcEditor changeContent={this.onDescriptionChange} />
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <button type="button" className="btn btn-outline-primary" onClick={this.addTask}>افزودن <i className="fas fa-check"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="result-container col-12 mt-3 active">
                        <div className="filter-box mt-2 mb-2 p-3 col-12">
                            <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                                <span>جستجو در: </span>
                                <select id="tasks_relation_select" defaultValue="all">
                                    <option value="all" container_class="small" icon_name="fas fa-tasks">همه</option>
                                    <option value="finished" container_class="small" icon_name="fas fa-check-square">انجام شده</option>
                                    <option value="unfinished" container_class="small" icon_name="fas fa-times-circle">انجام نشده</option>
                                    <option value="expired" container_class="small" icon_name="fas fa-calendar-minus">منقضی</option>
                                </select>
                            </div>
                            <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                                <span>مرتب سازی بر اساس:</span>
                                <select id="tasks_order_by_select" defaultValue="due_to">
                                    <option value="due_to" container_class="small" icon_name="fas fa-hourglass-start">تاریخ تحویل</option>
                                    <option value="created_at" container_class="small" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                    <option value="updated_at" container_class="small" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                    <option value="finished_at" container_class="small" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                                </select>
                            </div>
                            <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                                <span>نحوه مرتب سازی:</span>
                                <select id="tasks_order_select" defaultValue="desc">
                                    <option value="asc" container_class="small" icon_name="fas fa-sort-amount-up">صعودی</option>
                                    <option value="desc" container_class="small" icon_name="fas fa-sort-amount-down">نزولی</option>
                                </select>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-outline-info" onClick={this.handleMore.bind(this, "tasks", true)}>مرتب سازی</button>
                            </div>
                        </div>
                        <div className="col-12 float-right pr-0 pl-0 pr-md-3 pl-md-3">
                            <table className="table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">عنوان</th>
                                        <th scope="col">دسته بندی</th>
                                        <th scope="col">اولویت</th>
                                        <th scope="col">انجام دهندگان</th>
                                        <th scope="col">موعد تحویل</th>
                                        <th scope="col">وضعیت اتمام</th>
                                        <th scope="col">تاریخ اتمام</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { tasks.data.length > 0 
                                    ? tasks.data.map((task, i) => {
                                        return (
                                            <Task key={i} index={i}                                            
                                            workspace_users={workspace_users}
                                            onClick={() => redirectTo(taskRoute.replace("taskId", task.id))} 
                                            {...task}/>
                                        )
                                    }) 
                                    : null
                                    }
                                </tbody>
                            </table> 
                            {
                                tasks.data.length > 0 && !isGetting && tasks.hasMore && (
                                    <div className="text-center">
                                        <button className="btn btn-outline-dark text-center" onClick={this.handleMore.bind(this, 'tasks', false)}>بیشتر</button>
                                    </div>
                                )
                            }
                            {
                                tasks.data.length <= 0 && !isGetting &&
                                    <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                            }
                            {
                                isGetting && (
                                    <div className="text-center">
                                        <Squares color="#000000" size={24} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
