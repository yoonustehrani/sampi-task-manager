import React, { Component } from 'react'
import Axios from 'axios'
import moment from 'moment-jalaali'
moment.locale('fa')
import TinymcEditor from '../tinymce-editor/index'
import { formatOption, formatMemberOption } from '../../../select2'
import { setPriority, redirectTo } from '../../../helpers'

export default class ShowTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: "show",
            task_active_users: []
        }
    }

    toggle_finished_check = () => {
        this.setState(prevState => ({
            finished_at_check: !prevState.finished_at_check
        }))
    }

    handleDescriptionChange = (content) => {
        this.setState({
            task_description: content
        })
    }
    
    componentDidMount() {
        let { task_api, workspace_api } = this.props
        Axios.get(task_api).then(res => {
            let { data } = res
            this.setState({
                task: data,
                finished_at_check: data.finished_at !== null ? true : false
            }, () => {
                this.state.task.users.map((user, i) => {
                    this.setState(prevState => {
                        task_active_users: prevState.task_active_users.push(user.id)
                    })
                })
            })
        })
        Axios.get(workspace_api).then(res => {
            let { data } = res
            this.setState({workspace: data}, () => {
                this.state.workspace.users.map((user, i) => {
                    this.setState(prevState => ({
                        workspace_users: Object.assign({}, prevState.workspace_users, {
                            [user.id]: {
                                is_admin: user.pivot.is_admin,
                                fullname: user.fullname,
                            }
                        }),
                    }))
                })
            })
        })
    }

    changeMode = (mode) => {
        this.setState({
            mode: mode
        }, () => {
            if (this.state.mode === "edit") {
                $('#edit-task-priority').select2({
                    templateResult: formatOption,
                    minimumResultsForSearch: Infinity,
                    width: '100%',
                    dir: "rtl",
                })
                $("#edit-task-members").select2({
                    placeholder: "انجام دهندگان این کار",
                    width: "100%",
                    dir: 'rtl',
                    multiple: true,
                    templateResult: formatMemberOption
                })
                $('.select2-search__field').css('width', '100%')
            } else {
                // Axios.put().then(res => {
                //     let { data } = res
                //     this.setState({task: data})
                // })
                $.each($(".select2"), (i, item) => {
                    item.remove()
                })
            }
        })
    }

    editInfo = () => {
        let { task, finished_at_check, workspace, task_active_users } = this.state, { logged_in_user_id } = this.props
        return (
            <div className="col-12 col-md-10 offset-md-1 float-left mt-3 animated flash">
                <div className="edit-tasks-container col-12">
                    <div className="input-group col-12 col-md-6 float-right mt-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">عنوان کار</span>
                        </div>
                        <input type="text" className="form-control" defaultValue={task.title} />
                    </div>
                    <div className="input-group col-12 col-md-6 float-right mt-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">دسته بندی</span>
                        </div>
                        <input type="text" className="form-control" defaultValue={task.group}/>
                    </div>
                    <div className="input-group col-12 col-md-6 float-right mt-3 input-group-single-line">
                        <div className="input-group-prepend">
                            <span className="input-group-text">اولویت</span>
                        </div>
                        <select id="edit-task-priority" defaultValue={`${task.priority_id}`}>
                            <option value="1" icon_name="fas fa-hourglass-end">ضروری و مهم</option>
                            <option value="2" icon_name="fas fa-hourglass-half">ضروری و غیر مهم</option>
                            <option value="3" icon_name="fas fa-hourglass-start">غیر ضروری و غیر مهم</option>
                            <option value="4" icon_name="fas fa-hourglass">غیر ضروری و غیر مهم</option>
                        </select>                    
                    </div>
                    <div className="input-group col-12 col-md-6 float-right mt-3 input-group-single-line">
                        <div className="input-group-prepend">
                            <span className="input-group-text">انجام دهندگان</span>
                        </div>
                        <select id="edit-task-members" className="form-control text-right" defaultValue={task_active_users} multiple>
                            { workspace.users.map((user, i) => {
                                if (user.id !== logged_in_user_id) {
                                    return (
                                        <option key={i} value={user.id} img_address={APP_PATH + user.avatar_pic}>{user.fullname}</option>
                                    )                                            
                                }
                            }) }
                        </select>
                    </div>
                    <div className="input-group col-12 col-md-6 float-right mt-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">موعد تحویل</span>
                        </div>
                        {<input defaultValue={moment(task.due_to).format("jYYYY/jMM/jDD HH:mm")} />}
                    </div>
                    <div className="input-group col-12 col-md-6 float-right mt-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">وضعیت اتمام</span>
                        </div>
                        {/* <input id="finished_at_input" className="form-control" type="text" defaultValue={task.finished_at !== null ? moment(task.finished_at).format("jYYYY/jMM/jDD HH:mm") : ""} disabled={finished_at_check ? false : true} /> */}
                        <input type="text" className="form-control" value={finished_at_check ? "تمام شده" : "نا تمام"} readOnly />
                        <div className="input-group-text">
                            <input className="c-p" type="checkbox" onChange={this.toggle_finished_check.bind(this)} defaultChecked={task.finished_at !== null ? true : false} />
                        </div>
                    </div>
                    <div className="input-group col-12 float-right mt-3 mb-3">
                        <div className="w-100">
                            <TinymcEditor initialValue={task.description} changeContent={this.handleDescriptionChange} />
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4 float-right col-12">
                    <button type="button" className="btn btn-outline-primary" onClick={this.changeMode.bind(this, "show")}>ذخیره <i className="fas fa-check"></i></button>
                </div>
            </div>
        )
    }

    showInfo = () => {
        let { task, workspace_users } = this.state
        return (
            <div className="col-12 col-md-10 offset-md-1 float-left mt-3 animated fadeIn">
                <div className="show-tasks-container">
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-hand-point-left"></i>
                            <span>عنوان:</span>
                        </div>
                        <div className="task-detail">
                            <span>{ task ? task.title : "" }</span>
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-object-group"></i>
                            <span>گروه:</span>
                        </div>
                        <div className="task-detail">
                            <span>{ task ? task.group : "" }</span>
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-layer-group"></i>
                            <span>زیر مجموعه:</span>
                        </div>
                        <div className="task-detail">
                            <a>طراحی api</a> {/* here we will get the parent from the api */}
                            {/* <i className="fas fa-minus"></i> */}
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-star"></i>
                            <span>اولویت:</span>
                        </div>
                        <div className="task-detail">
                            <span>{setPriority(task ? task.priority_id : "")}</span>
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-calendar-day"></i>
                            <span>ساخته شده در تاریخ:</span>
                        </div>
                        <div className="task-detail">
                            <span>{task ? moment(task.created_at).format("jYYYY/jMM/jDD") : ""} ({task ? moment(task.created_at).fromNow() : ""})</span>
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-sync"></i>
                            <span>آخرین تغییرات در تاریخ:</span>
                        </div>
                        <div className="task-detail">
                            <span>{task ? moment(task.updated_at).format("jYYYY/jMM/jDD") : ""} ({task ? moment(task.updated_at).fromNow() : ""})</span>
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-hourglass-start"></i>
                            <span>موعد تحویل:</span>
                        </div>
                        <div className="task-detail">
                            <span>{task ? moment(task.due_to).format("jYYYY/jMM/jDD") : ""} ({task ? moment(task.due_to).fromNow() : ""})</span>
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-clipboard-check"></i>
                            <span>وضعیت اتمام:</span>
                        </div>
                        <div className="task-detail">
                            <span>تمام شده</span>
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-calendar-check"></i>
                            <span>تاریخ اتمام:</span>
                        </div>
                        <div className="task-detail">
                            <span>{task && task.finished_at !== null ? (moment(task.finished_at).format("jYYYY/jMM/jDD") + " (" + moment(task.finished_at).fromNow() + ")") : (<i className="fas fa-minus"></i>)}</span>
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-user-check"></i>
                            <span>اتمام کننده:</span>
                        </div>
                        <div className="task-detail">
                            {/* <a className="task-finisher"><img src={APP_PATH + 'images/male-avatar.svg'} alt="" />امیررضا منصوریان</a> */}
                            <a href="" className="task-finisher">{task && task.finisher_id !== null && workspace_users ? workspace_users[task.finisher_id].fullname : ""}</a>
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section float-right">
                            <i className="fas fa-users"></i>
                            <span>انجام دهندگان:</span>
                        </div>
                        <div className="employees-container task-detail next-line">
                            { task && workspace_users &&
                                task.users.map((user, i) => (
                                    <div key={i} className="user-dropdown-item border-sharp animated jackInTheBox permanent-visible">
                                        <div className="user-right-flex">
                                            <div className="user-img-container ml-md-2 ml-1">
                                                <img src={APP_PATH + user.avatar_pic} />
                                            </div>
                                            <div className="user-info ml-md-2 ml-1">
                                                <p>{user.fullname}</p>
                                                <a href={"#user"}>@{user.name}</a>
                                            </div>
                                        </div>
                                        <div className="user-label-container">
                                            {
                                                workspace_users[user.id].is_admin === 1 ? <button className="btn btn-sm btn-success rtl admin p-1"><span>{user.id === task.creator_id ? <i className="fas fa-star ml-1"></i> : ""}ادمین<i className="fas fa-user-tie mr-1"></i></span></button>
                                                : <button className="btn btn-sm btn-primary rtl"><span>{user.id === task.creator_id ? <i className="fas fa-star ml-1"></i> : ""}عضو<i className="fas fa-user mr-1"></i></span></button>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-5">
                        <div className="task-title-section title-section">
                            <i className="fas fa-tasks"></i>
                            <span>وظایف زیر مجموعه:</span>
                        </div>
                        <div className="task-detail next-line">
                            <ul className="child-tasks">
                                <li><a>طراحی api تسک ها</a></li>
                                <li><a>طراحی api تسک ها</a></li>
                                <li><a>طراحی api تسک ها</a></li>
                                <li><a>طراحی api تسک ها</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-3 col-12 col-md-10">
                        <div className="task-title-section title-section">
                            <i className="fas fa-comment-dots"></i>
                            <span>توضیحات تکمیلی:</span>
                        </div>
                        <div className="task-detail next-line">
                            <p className="text-right">کیر خر</p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4"><button className="btn btn-outline-info" onClick={this.changeMode.bind(this, "edit")}>ویرایش <i className="fas fa-pen-alt"></i></button></div>
            </div>
        )
    }
    
    render() {
        let { mode, task } = this.state

        return (
            <div>
                <div className="col-12 float-right task-info-container">
                    <div className="breadcrumb col-12 float-right">
                        <a className="float-right hoverable">
                            <img src={APP_PATH + "images/elnovel-logo.jpg"} alt=""/>
                            <h6>الناول</h6>
                        </a>
                        <i className="fas fa-arrow-circle-left"></i>
                        <div className="float-right">
                            <h6>طراحی وبسایت</h6>
                        </div>
                        <i className="fas fa-arrow-circle-left"></i>
                        <a className="float-right hoverable">
                            <h6>طراحی api</h6>
                        </a>
                    </div>
                    {mode === "show" ? this.showInfo() : this.editInfo()}
                </div>
            </div>
        )
    }
}
