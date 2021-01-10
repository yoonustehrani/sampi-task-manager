import React, { Component } from 'react'
import Axios from 'axios'
import moment from 'moment'
moment.locale('fa')

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.tabResultsRef = []
        for (let i = 0; i < 4; i++) {
            this.tabResultsRef.push(React.createRef())
        }
        this.tabTitlesRef = []
        for (let i = 0; i < 4; i++) {
            this.tabTitlesRef.push(React.createRef())
        }
        this.state = {
            tasks: []
        }
    }
    
    changeTab = (tab_index) => {
        let { mixedTasksApi } = this.props
        if (tab_index === 1) {
            Axios.get(`${mixedTasksApi}&limit=15&order_by=due_to&order=desc`).then(res => {
                let { data } = res
                this.setState({
                    
                })
            })
        }
        this.tabResultsRef.map((tabResultRef, i) => {
            if (tab_index === i) {
                tabResultRef.current.classList.add("active")
            } else {
                tabResultRef.current.classList.remove("active")
            }
        })
        this.tabTitlesRef.map((tabTitleRef, i) => {
            if (tab_index === i) {
                tabTitleRef.current.classList.add("active")
            } else {
                tabTitleRef.current.classList.remove("active")
            }
        })
    }

    sortData = (tab) => {
        let { mixedTasksApi } = this.props
        let order_by = $('#order_by_select').val(), order = $('#order_select').val()
        if (tab === "tasks") {
            Axios.get(`${mixedTasksApi}&limit=15&order_by=${order_by}&order=${order}`).then(res => {
                let { data } = res
                this.setState({
                    tasks: data
                })
            })
        }
    }

    setPriority = (id) => {
        switch(id) {
            case 1:
                return 'ضروری و فوری'
                break
            case 2:
                return 'ضروری و غیر فوری'
                break
            case 3:
                return 'غیرضروری و فوری'
                break
            case 4:
                return 'غیر ضروری و غیرفوری'
                break
            default:
                break
        }
    }

    formatOption = (option) => {
        if (option.element) {
            let icon_name = option.element.attributes.icon_name.nodeValue
            return $(`<div class="select-option">${option.text}<i class="${icon_name}"></i></div>`)
        }
    }

    render() {
        let { tasks } = this.state
        $('#order_select, #order_by_select').select2({
            templateResult: this.formatOption,
            minimumResultsForSearch: Infinity,
            width: 'element'
        })
        return (
            <div className="col-12 dashboard-tab-container">
                <nav className="tab-title-bar text-center">
                    <a className="tab-link active" ref={this.tabTitlesRef[0]} onClick={this.changeTab.bind(this, 0)}>
                        <i className="fas fa-project-diagram"></i>
                        پروژه ها
                    </a>
                    <a className="tab-link" ref={this.tabTitlesRef[1]} onClick={this.changeTab.bind(this, 1)}>
                        <i className="fas fa-tasks"></i>
                        وظایف
                    </a>
                    <a className="tab-link" ref={this.tabTitlesRef[2]} onClick={this.changeTab.bind(this, 2)}>
                        <i className="fas fa-comment-dots"></i>
                        درخواست ها
                    </a>
                    <a className="tab-link" ref={this.tabTitlesRef[3]} onClick={this.changeTab.bind(this, 3)}>
                        <i className="fas fa-clipboard-list"></i>
                        نیاز ها
                    </a>
                </nav>

                <div className="result-container col-12 mt-3 active" ref={this.tabResultsRef[0]}>
                    <table className="table table-striped table-bordered table-responsive-sm float-right">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">عنوان پروژه</th>
                                <th scope="col">کارمندان</th>
                                <th scope="col">وضعیت وظایف</th>
                                <th scope="col">خواسته های جاری</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">۱</th>
                                <td className="text-right">
                                    <img src="workspace img link"/>
                                    <a href="workspace link">workspace title</a>
                                </td>
                                <td>
                                    1 <i className="fas fa-user"></i>
                                    {/* 7 <i className="fas fa-users"></i>
                                    0 <i className="fas fa-user-slash"></i> */}
                                </td>
                                <td>
                                    کل : <span className="badge badge-primary ml-1">3</span>
                                    اتمام : <span className="badge badge-success ml-1">2</span>
                                    باقی مانده : <span className="badge badge-danger ml-1">4</span>
                                </td>
                                <td>
                                    2
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>

                <div className="result-container col-12 mt-3" ref={this.tabResultsRef[1]}>
                    <div className="filter-box mt-2 mb-2 p-3 col-12">
                        <div className="filter-option col-12 col-md-4 mb-3 mb-md-0 text-center">
                            <span>مرتب سازی بر اساس:</span>
                            <select id="order_by_select" defaultValue="due_to">
                                <option value="due_to" icon_name="fas fa-hourglass-start">تاریخ تحویل</option>
                                <option value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                                <option value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                                <option value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-4 mb-3 mb-md-0 text-center">
                            <span>نحوه مرتب سازی:</span>
                            <select id="order_select" defaultValue="asc">
                                <option value="desc" icon_name="fas fa-sort-amount-up">صعودی</option>
                                <option value="asc" icon_name="fas fa-sort-amount-down">نزولی</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-4 text-center">
                            <button className="btn btn-outline-info" onClick={this.sortData.bind(this, 'tasks')}>مرتب سازی</button>
                        </div>
                    </div>
                    <table className="table table-striped table-bordered table-responsive-sm float-right">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">عنوان</th>
                                <th scope="col">پروژه</th>
                                <th scope="col">دسته بندی</th>
                                <th scope="col">اولویت</th>
                                <th scope="col">موعد تحویل</th>
                                <th scope="col">وضعیت اتمام</th>
                                <th scope="col">تاریخ اتمام</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tasks !== null ? tasks.map((task, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{ i + 1 }</th>
                                        <td>{task.title}</td>
                                        <td className="text-right">
                                            <img href="" />
                                            <a href="">{task.workspace.title}</a>
                                        </td>
                                        <td>{task.group}</td>
                                        <td>{this.setPriority(task.priority_id)}</td>
                                        <td>{moment(task.due_to).fromNow()}</td>
                                        <td>
                                            {task.finished_at === null ? <i className="fas fa-times-circle fa-3x"></i> : <i className="fas fa-check-circle fa-3x"></i>}
                                        </td>
                                        <td>
                                        {task.finished_at === null ? <i className="fas fa-calendar-times fa-3x"></i> : moment(task.finished_at).fromNow()}
                                        </td>
                                    </tr>
                                )
                            }) : null}
                        </tbody>
                    </table> 
                </div>

                <div className="result-container col-12 mt-3" ref={this.tabResultsRef[2]}>
                    <table className="table table-striped table-bordered table-responsive-sm float-right">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">عنوان</th>
                                <th scope="col">پروژه</th>
                                <th scope="col">درخواست کننده</th>
                                <th scope="col">تسک مربوطه</th>
                                <th scope="col">اولویت</th>
                                <th scope="col">موعد تحویل</th>
                                <th scope="col">وضعیت اتمام</th>
                                <th scope="col">تاریخ اتمام</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">۱</th>
                                <td>ارسال فرمت پی ان جی لوگو</td>
                                <td className="text-right">
                                    <img src="workspace img link"/>
                                    <a href="workspace link">workspace title</a>
                                </td>
                                <td>امیررضا منصوریان</td>
                                <td>طراحی صفحه اصلی اپ</td>
                                <td>ضروری و مهم</td>
                                <td>۱۲ فروردین</td>
                                <td>
                                    <i className="fas fa-check-circle fa-3x"></i>
                                    {/* <i className="fas fa-times-circle"></i> */}
                                </td>
                                <td>
                                    {/* ۱۰ فروردین */}
                                    <i className="fas fa-calendar-times fa-3x"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>

                <div className="result-container col-12 mt-3" ref={this.tabResultsRef[3]}>
                    <table className="table table-striped table-bordered table-responsive-sm float-right">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">عنوان</th>
                                <th scope="col">پروژه</th>
                                <th scope="col">فرد مربوطه</th>
                                <th scope="col">تسک مربوطه</th>
                                <th scope="col">اولویت</th>
                                <th scope="col">موعد تحویل</th>
                                <th scope="col">وضعیت اتمام</th>
                                <th scope="col">تاریخ اتمام</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">۱</th>
                                <td>ارسال فرمت پی ان جی لوگو</td>
                                <td className="text-right">
                                    <img src="workspace img link"/>
                                    <a href="workspace link">workspace title</a>
                                </td>
                                <td>امیررضا منصوریان</td>
                                <td>طراحی صفحه اصلی اپ</td>
                                <td>ضروری و مهم</td>
                                <td>۱۲ فروردین</td>
                                <td>
                                    <i className="fas fa-check-circle fa-3x"></i>
                                    {/* <i className="fas fa-times-circle"></i> */}
                                </td>
                                <td>
                                    {/* ۱۰ فروردین */}
                                    <i className="fas fa-calendar-times fa-3x"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
            </div>
        )
    }
}
