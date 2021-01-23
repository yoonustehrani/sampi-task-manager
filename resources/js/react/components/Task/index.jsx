import React, { Component } from 'react'
import Axios from 'axios'
import moment from 'moment'
moment.locale('fa')
import TinymcEditor from '../tinymce-editor/index'

export default class ShowTask extends Component {

    state = {
        mode: "show"
    }
    
    componentDidMount() {
        let { task_api } = this.props
        console.log(task_api)
    }

    editInfo = (
        <div className="col-12 col-md-10 offset-md-1 float-left">
            <div className="input-group col-12 col-md-6 float-right mt-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">عنوان کار</span>
                </div>
                <input type="text" className="form-control" />
            </div>
            <div className="input-group col-12 col-md-6 float-right mt-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">دسته بندی</span>
                </div>
                <input type="text" className="form-control" />
            </div>
            <div className="input-group col-12 col-md-6 float-right mt-3 input-group-single-line">
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
            <div className="input-group col-12 col-md-6 float-right mt-3 input-group-single-line">
                <div className="input-group-prepend">
                    <span className="input-group-text">انجام دهندگان</span>
                </div>
                <select id="new-task-members" className="form-control text-right" multiple>
                    {/* { workspace ? workspace.users.map((user, i) => {
                        if (user.api_token !== logged_in_api_token) {
                            return (
                                <option key={i} value={user.id} img_address={APP_PATH + user.avatar_pic}>{user.fullname}</option>
                            )                                            
                        }
                    }) : null } */}
                    <option value="1" img_address={APP_PATH + "images/male-avatar.svg"}>"ترانه نخعی"</option>
                    <option value="2" img_address={APP_PATH + "images/male-avatar.svg"}>"ترانه نخعی"</option>
                    <option value="3" img_address={APP_PATH + "images/male-avatar.svg"}>"ترانه نخعی"</option>
                </select>
            </div>
            <div className="input-group col-12 col-md-6 float-right mt-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">موعد تحویل</span>
                </div>
                {<input value={moment("2020-12-16 07:36:59").fromNow()} />}
            </div>
            <div className="input-group col-12 col-md-6 float-right mt-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">وضعیت اتمام</span>
                </div>
                <input className="form-control" type="text" name="" id=""/>
                <div class="input-group-text">
                    <input className="c-p" type="checkbox" value="" />
                </div>
            </div>
            <div className="input-group col-12 float-right mt-3">
                <div className="w-100">
                    <TinymcEditor />
                </div>
            </div>
            <div className="text-center mt-2 float-right col-12">
                <button type="button" className="btn btn-outline-primary">ذخیره <i className="fas fa-check"></i></button>
            </div>
        </div>
    )

    showInfo = (
        <div className="col-12 col-md-8 offset-md-4 float-left mt-3">
            <div className="show-tasks-container">
                <div className="mt-3 col-12 col-md-5">
                    <div className="task-title-section title-section">
                        <i className="fas fa-hand-point-left"></i>
                        <span>عنوان:</span>
                    </div>
                    <div className="task-detail">
                        <span>طراحی صفحه تسک</span>
                    </div>
                </div>
                <div className="mt-3 col-12 col-md-5">
                    <div className="task-title-section title-section">
                        <i className="fas fa-object-group"></i>
                        <span>گروه:</span>
                    </div>
                    <div className="task-detail">
                        <span>برنامه نویسی</span>
                    </div>
                </div>
                <div className="mt-3 col-12 col-md-5">
                    <div className="task-title-section title-section">
                        <i className="fas fa-layer-group"></i>
                        <span>زیر مجموعه:</span>
                    </div>
                    <div className="task-detail">
                        <a>طراحی api</a>
                        {/* <i className="fas fa-minus"></i> */}
                    </div>
                </div>
                <div className="mt-3 col-12 col-md-5">
                    <div className="task-title-section title-section">
                        <i className="fas fa-star"></i>
                        <span>اولویت:</span>
                    </div>
                    <div className="task-detail">
                        <span>ضروری و مهم</span>
                    </div>
                </div>
                <div className="mt-3 col-12 col-md-5">
                    <div className="task-title-section title-section">
                        <i className="fas fa-calendar-day"></i>
                        <span>ساخته شده در تاریخ:</span>
                    </div>
                    <div className="task-detail">
                        <span>۱۲ مهر</span>
                    </div>
                </div>
                <div className="mt-3 col-12 col-md-5">
                    <div className="task-title-section title-section">
                        <i className="fas fa-sync"></i>
                        <span>آخرین تغییرات در تاریخ:</span>
                    </div>
                    <div className="task-detail">
                        <span>۱۲ مهر</span>
                    </div>
                </div>
                <div className="mt-3 col-12 col-md-5">
                    <div className="task-title-section title-section">
                        <i className="fas fa-hourglass-start"></i>
                        <span>موعد تحویل:</span>
                    </div>
                    <div className="task-detail">
                        <span>۳ روز دیگر</span>
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
                        <span>۱۲ مهر</span>
                    </div>
                </div>
                <div className="mt-3 col-12 col-md-5">
                    <div className="task-title-section title-section">
                        <i className="fas fa-user-check"></i>
                        <span>اتمام کننده:</span>
                    </div>
                    <div className="task-detail">
                        {/* <a className="task-finisher"><img src={APP_PATH + 'images/male-avatar.svg'} alt="" />امیررضا منصوریان</a> */}
                        <a href="" className="task-finisher">امیررضا منصوریان</a>
                    </div>
                </div>
                <div className="mt-3 col-12 col-md-5">
                    <div className="task-title-section title-section float-right">
                        <i className="fas fa-users"></i>
                        <span>انجام دهندگان:</span>
                    </div>
                    <div className="employees-container task-detail next-line">
                        <div className="user-dropdown-item border-sharp animated jackInTheBox permanent-visible">
                            <div className="user-right-flex">
                                <div className="user-img-container ml-md-2 ml-1">
                                    <img src={typeof workspace_users !== 'undefined' && workspace_users[user.id].avatar_pic !== null ? APP_PATH + workspace_users[user.id].avatar_pic : APP_PATH + 'images/male-avatar.svg'} />
                                </div>
                                <div className="user-info ml-md-2 ml-1">
                                    <p>امیررضا منصوریان</p>
                                    <a href={"#user"}>@amirmns</a>
                                </div>
                            </div>
                            <div className="user-label-container">
                                <button className="btn btn-sm btn-success rtl admin p-1"><span><i className="fas fa-star ml-1"></i>ادمین<i className="fas fa-user-tie mr-1"></i></span></button>
                            </div>
                        </div>
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
            <div className="text-center mt-4"><button className="btn btn-outline-info">ویرایش <i className="fas fa-pen-alt"></i></button></div>
        </div>
    )
    
    render() {
        let { mode } = this.state
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
                    {mode === "show" ? this.showInfo : this.editInfo}
                </div>
            </div>
        )
    }
}
