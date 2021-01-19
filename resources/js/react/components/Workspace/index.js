import React, { Component } from 'react'
import TinymcEditor from '../tinymce-editor'
import Axios from 'axios'
import moment from 'moment'
moment.locale('fa')
import { Squares  } from 'react-activity'
import 'react-activity/dist/react-activity.css'

export default class Workspace extends Component {
    constructor(props) {
        super(props)
        this.addTaskRef = React.createRef()
        this.addIconRef = React.createRef()
        this.state = {
            description: "",
            isGetting: true,
            tasks: {
                data: [],
                nextPage: 1,
                hasMore: true
            }
        }
    }

    toggleAddBox = () => {
        this.addIconRef.current.classList.toggle("fa-plus")
        this.addIconRef.current.classList.toggle("fa-minus")
        this.addTaskRef.current.classList.toggle("d-none")
    }

    onDescriptionChange = (content) => {
        this.setState({
            description: content
        })
    }

    handleMore = (table, filtering) => {
        let { list_tasks_api } = this.props
        let { tasks } = this.state
        let tasks_order_by = $('#tasks_order_by_select').val(), tasks_order = $('#tasks_order_select').val(), tasks_relation = $('#tasks_relation_select').val()
        this.setState({ isGetting: true })
        const getList = (table) => {            
            Axios.get(`${eval("list_" + table + "_api")}&order_by=${eval(table + "_order_by")}&order=${eval(table + "_order")}&relation=${eval(table + "_relation")}&page=${this.state.tasks.nextPage}`).then(res => {
                let { data, current_page, last_page } = res.data
                this.setState(prevState => {
                return ({
                    [table]: {
                        data: [...prevState[table].data, ...data],
                        nextPage: current_page + 1,
                        hasMore: current_page === last_page ? false : true
                    },
                    isGetting: false
                })})
            })
        }
        switch (table) {
            case "tasks":
                filtering ? this.setState({tasks: {data: [], nextPage: 1, hasMore: true}}, () => {getList("tasks")}) : getList("tasks")
            break
            
            default:
            break
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
        this.handleMore("tasks", false)
    }
    

    render() {
        let { isGetting, tasks } = this.state
        let { taskRoute } = this.props

        return (
            <div>
                <div className="float-right col-12">
                    <div className="workspace-title-section col-12">
                        <i className="fas fa-clipboard-list"></i>
                        <h4 className="">وظایف :</h4>      
                    </div>  
                    <div className="workspace-add-task mb-4 col-12">
                        <div className="workspace-title-section" onClick={this.toggleAddBox}>
                            <i className="fas fa-plus animated jello" ref={this.addIconRef}></i>
                            <h5>افزودن کار</h5>
                        </div>
                        <div className="add-task-section d-none animated zoomIn p-1 pt-2 pb-2 p-md-3" ref={this.addTaskRef}>
                            <div className="input-group col-12 col-md-6 mb-0 mb-md-0 pl-2 pr-2 pr-lg-3 pl-lg-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">عنوان</span>
                                </div>
                                <input type="text" className="form-control" placeholder="عنوان کار را در این قسمت وارد کنید" />
                            </div>
                            <div className="input-group col-12 col-md-6 mb-0 mb-md-0 pl-2 pr-2 pr-lg-3 pl-lg-3 input-group-single-line">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">اولویت</span>
                                </div>
                                <select id="new-task-priority" defaultValue="0">
                                    <option value="0" icon_name="fas fa-hourglass-end">ضروری و مهم</option>
                                    <option value="1" icon_name="fas fa-hourglass-half">ضروری و غیر مهم</option>
                                    <option value="2" icon_name="fas fa-hourglass-start">غیر ضروری و غیر مهم</option>
                                    <option value="3" icon_name="fas fa-hourglass">غیر ضروری و غیر مهم</option>
                                </select>
                            </div>
                            <div className="input-group col-12 col-md-6 mb-0 mb-md-0 pl-2 pr-2 pr-lg-3 pl-lg-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">دسته بندی</span>
                                </div>
                                <input type="text" className="form-control" placeholder="این کار در چه گروهی قرار میگیرد؟" />
                            </div>
                            <div className="input-group col-12 col-md-6 mb-0 mb-md-0 pl-2 pr-2 pr-lg-3 pl-lg-3 input-group-single-line">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">مسئولین</span>
                                </div>
                                <select id="new-task-members" className="form-control text-right" multiple>
                                    <option value="0" img_address={APP_PATH + "images/yosef.jpg"}>امیررضا منصوریان</option>
                                    <option value="1" img_address={APP_PATH + "images/yosef.jpg"}>یونس طهرانیم</option>
                                    <option value="2" img_address={APP_PATH + "images/yosef.jpg"}>باران نخعی</option>
                                    <option value="2" img_address={APP_PATH + "images/yosef.jpg"}>2باران نخعی</option>
                                    <option value="2" img_address={APP_PATH + "images/yosef.jpg"}>3باران نخعی</option>
                                    <option value="2" img_address={APP_PATH + "images/yosef.jpg"}>4باران نخعی</option>
                                    <option value="2" img_address={APP_PATH + "images/yosef.jpg"}>5باران نخعی</option>
                                    <option value="2" img_address={APP_PATH + "images/yosef.jpg"}>6باران نخعی</option>
                                    <option value="2" img_address={APP_PATH + "images/yosef.jpg"}>7باران نخعی</option>
                                </select>
                            </div>
                            <div className="input-group col-12 input-group-single-line pl-2 pr-2 pr-lg-3 pl-lg-3">
                                {/* <div className="input-group-prepend">
                                    <span className="input-group-text">توضیحات</span>
                                </div> */}
                                <div className="tinymc-container">
                                    <TinymcEditor changeContent={this.onDescriptionChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="result-container col-12 mt-3 active">
                        <div className="filter-box mt-2 mb-2 p-3 col-12 animated fadeIn">
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
                        <div className="col-12 float-right">
                            <table className="table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated swing">
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
                                    {
                                        tasks.data.length > 0 ? tasks.data.map((task, i) => {
                                            let { id, title, group, finished_at, priority_id, due_to, workspace, workspace_id, users } = task
                                            return (
                                                <tr key={i} onClick={this.redirectTo.bind(this, taskRoute.replace("taskId", id))}>
                                                    <th scope="row">{ i + 1 }</th>
                                                    <td>{title}</td>
                                                    <td>{group}</td>
                                                    <td>{this.setPriority(priority_id)}</td>
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
                                                                            <div key={i} className="user-dropdown-item no-roll animated jackInTheBox">
                                                                                <div className="user-right-flex">
                                                                                    <div className="user-img-container ml-2">
                                                                                        <img src={user.avatar_pic !== null ? APP_PATH + user.avatar_pic : APP_PATH + 'images/male-avatar.svg'} />
                                                                                    </div>
                                                                                    <div className="user-info ml-2">
                                                                                        <p>{ user.fullname }</p>
                                                                                        <a href={"#user"}>@{user.name}</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
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
