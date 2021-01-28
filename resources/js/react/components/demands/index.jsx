import axios from 'axios'
import React, { Component } from 'react'

export default class Demands extends Component {
    constructor(props) {
        super(props)
        this.tabTitlesRef = []
        this.tabResultsRef = []
        for (let index = 0; index < 2; index++) {
            this.tabTitlesRef.push(React.createRef())
            this.tabResultsRef.push(React.createRef())
        }
        this.state = {
            current_tab: 'demands'
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
    }

    sortData = (catagory) => {

    }

    componentDidMount() {
        let { get_tickets_api } = this.props, { current_tab } = this.state
        let order_by = $(`#mixed_${current_tab}_order_by_select`).val(), mixed_tasks_order = $('#mixed_tasks_order_select').val(), mixed_tasks_relation = $('#mixed_tasks_relation_select').val()
        // axios.get(`${get_tickets_api}${current_tab === "demands" ? "&relation=asked" : ""}`)
    }
    
    
    render() {
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
                    {/* <div className="title-section">
                        <i className="fas fa-arrow-left"></i>
                        <h4>خواسته ها</h4>
                    </div> */}
                    <div className="filter-box demand-bg-color mb-4 p-2 col-12 animated fadeIn">
                        <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                            <span>جستجو در: </span>
                            <select id="mixed_demands_relation_select" defaultValue="all">
                                <option container_class="select-option-big" value="all" icon_name="fas fa-tasks">همه</option>
                                <option container_class="select-option-big" value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                <option container_class="select-option-big" value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                                <option container_class="select-option-big" value="expired" icon_name="fas fa-calendar-minus">منقضی</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                            <span>مرتب سازی بر اساس:</span>
                            <select id="mixed_demands_order_by_select" defaultValue="due_to">
                                <option container_class="select-option-big" value="due_to" icon_name="fas fa-hourglass-start">تاریخ تحویل</option>
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
                            <button className="btn btn-outline-info" onClick={this.sortData.bind(this, 'demands')}>مرتب سازی</button>
                        </div>
                    </div>
                    <table className="col-12 table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated rubberBand">
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
                            <tr className="animated fadeIn">
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
                    {/* {
                        workspaces.length <= 0 && !isGetting &&
                            <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                    } */}
                    {/* {
                        isGetting &&
                            <div className="text-center">
                                <Digital color="#000000" size={24} />
                            </div>
                    } */}
                </div>
                <div className="col-12 mt-4 float-right demand-tab-result" ref={this.tabResultsRef[1]}>
                    {/* <div className="title-section">
                        <i className="fas fa-arrow-right"></i>
                        <h4>نیاز ها</h4>
                    </div> */}
                    <div className="filter-box demand-bg-color mb-4 p-2 col-12 animated fadeIn">
                        <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                            <span>جستجو در: </span>
                            <select id="mixed_needs_relation_select" defaultValue="all">
                                <option container_class="select-option-big" value="all" icon_name="fas fa-tasks">همه</option>
                                <option container_class="select-option-big" value="finished" icon_name="fas fa-check-square">انجام شده</option>
                                <option container_class="select-option-big" value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                                <option container_class="select-option-big" value="expired" icon_name="fas fa-calendar-minus">منقضی</option>
                            </select>
                        </div>
                        <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                            <span>مرتب سازی بر اساس:</span>
                            <select id="mixed_needs_order_by_select" defaultValue="due_to">
                                <option container_class="select-option-big" value="due_to" icon_name="fas fa-hourglass-start">تاریخ تحویل</option>
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
                            <button className="btn btn-outline-info" onClick={this.sortData.bind(this, 'demands')}>مرتب سازی</button>
                        </div>
                    </div>
                    <table className="col-12 table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated rubberBand">
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
                            <tr className="animated fadeIn">
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
                    {/* {
                        workspaces.length <= 0 && !isGetting &&
                            <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                    } */}
                    {/* {
                        isGetting &&
                            <div className="text-center">
                                <Digital color="#000000" size={24} />
                            </div>
                    } */}
                </div>
            </div>
        )
    }
}
