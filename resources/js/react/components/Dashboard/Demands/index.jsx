import React, { Component } from 'react'
import Demand from './Demand'
import { Digital } from 'react-activity'
import 'react-activity/dist/react-activity.css'

export default class Demands extends Component {
    render() {
        let { mixed_demands, mixed_needs, demand_show_route, workspace_route, task_route, user_profile_route, isGetting } = this.props
        let tab = mixed_demands ? "mixed_demands" : "mixed_needs"
        let data = tab === "mixed_demands" ? mixed_demands : mixed_needs
        return (
            <div>
                <div className="filter-box demand-bg-color mb-4 p-2 col-12 animated fadeIn">
                    <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                        <span>جستجو در: </span>
                        <select id={`${tab}_relation_select`} defaultValue="all">
                            <option value="all" icon_name="fas fa-tasks">همه</option>
                            <option value="finished" icon_name="fas fa-check-square">انجام شده</option>
                            <option value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                        </select>
                    </div>
                    <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                        <span>مرتب سازی بر اساس:</span>
                        <select id={`${tab}_order_by_select`} defaultValue="createdw">
                            <option value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                            <option value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                            <option value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                        </select>
                    </div>
                    <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                        <span>نحوه مرتب سازی:</span>
                        <select id={`${tab}_order_select`} defaultValue="desc">
                            <option value="asc" icon_name="fas fa-sort-amount-up">صعودی</option>
                            <option value="desc" icon_name="fas fa-sort-amount-down">نزولی</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-outline-info" onClick={this.props.sortData(tab)}>مرتب سازی</button>
                    </div>
                </div>
                <table className="table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated rubberBand">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                            <th scope="col">عنوان</th>
                            <th scope="col">پروژه مربوطه</th>
                            <th scope="col">کار مربوطه</th>
                            <th scope="col">{tab === "mixed_demands" ? "درخواست کننده" : "مخاطب"}</th>
                            <th scope="col">تعداد پیام ها</th>
                            <th scope="col">اولویت</th>
                            <th scope="col">وضعیت اتمام</th>
                            <th scope="col">تاریخ اتمام</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 && !isGetting && data.map((demand, i) => {
                                return (
                                    <Demand key={i} demand_show_route={demand_show_route} task_route={task_route} workspace_route={workspace_route} user_profile_route={user_profile_route} index={i} {...demand} />
                                )
                            })
                        }
                    </tbody>
                </table> 
                {
                    data.length <= 0 && !isGetting &&
                        <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                }
                {
                    isGetting &&
                    <div className="text-center"><Digital color="#000000" size={24} /></div>
                }
            </div>
        )
    }
}
