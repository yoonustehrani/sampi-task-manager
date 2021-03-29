import React, { Component } from 'react';
import { redirectTo } from '../../../../helpers'
import Task from './Task';
import { formatOptionWithIcon } from '../../../../select2'
import { Digital } from 'react-activity'
import 'react-activity/dist/react-activity.css'


class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            route: this.props.Route,
            workspace_route: this.props.workspace_route,
        }
    }

    componentDidMount() {
        $('#new-task-priority, #tasks_order_select, #tasks_order_by_select, #tasks_relation_select, #mixed_tasks_order_select, #mixed_tasks_order_by_select, #mixed_tasks_relation_select, #mixed_demands_order_select, #mixed_demands_order_by_select, #mixed_demands_relation_select, #mixed_needs_order_select, #mixed_needs_order_by_select, #mixed_needs_relation_select').select2({
            templateResult: formatOptionWithIcon,
            minimumResultsForSearch: Infinity,
            width: '100%',
            dir: "rtl",
        })
    }    

    render() {
        let tasks = this.props.AllTasks, { isGetting, workspaces_users, toggle_task_state_api } = this.props
        return (
            <div>
                <div className="filter-box mt-2 mb-2 p-3 col-12 animated fadeIn">
                    <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                        <span>جستجو در: </span>
                        <select id="mixed_tasks_relation_select" defaultValue="all">
                            <option value="all" icon_name="fas fa-tasks">همه</option>
                            <option value="finished" icon_name="fas fa-check-square">انجام شده</option>
                            <option value="unfinished" icon_name="fas fa-times-circle">انجام نشده</option>
                            <option value="expired" icon_name="fas fa-calendar-minus">منقضی</option>
                        </select>
                    </div>
                    <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                        <span>مرتب سازی بر اساس:</span>
                        <select id="mixed_tasks_order_by_select" defaultValue="due_to">
                            <option value="due_to" icon_name="fas fa-hourglass-start">تاریخ تحویل</option>
                            <option value="created_at" icon_name="fas fa-calendar-plus">تاریخ ایجاد</option>
                            <option value="updated_at" icon_name="fas fa-user-edit">تاریخ تغییرات</option>
                            <option value="finished_at" icon_name="fas fa-calendar-check">تاریخ اتمام</option>
                        </select>
                    </div>
                    <div className="filter-option col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 text-center">
                        <span>نحوه مرتب سازی:</span>
                        <select id="mixed_tasks_order_select" defaultValue="desc">
                            <option value="asc" icon_name="fas fa-sort-amount-up">صعودی</option>
                            <option value="desc" icon_name="fas fa-sort-amount-down">نزولی</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-outline-info" onClick={this.props.sortData("mixed_tasks")}>مرتب سازی</button>
                    </div>
                </div>
                <table className="table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated swing">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">عنوان</th>
                            <th scope="col">پروژه</th>
                            <th scope="col">دسته بندی</th>
                            <th scope="col">مشاهده پدر</th>
                            <th scope="col">انجام دهندگان</th>
                            <th scope="col">اولویت</th>
                            <th scope="col">موعد تحویل</th>
                            <th scope="col">وضعیت اتمام</th>
                            <th scope="col">تاریخ اتمام</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.length > 0 && !isGetting 
                            ? tasks.map((task, i) => {
                                return (
                                    <Task 
                                        key={i} 
                                        index={i} 
                                        workspace_route={this.state.workspace_route} 
                                        onClick={() => redirectTo(this.state.route.replace("taskId", task.id))} 
                                        workspaces_users={workspaces_users}  
                                        toggle_task_state_api={toggle_task_state_api}
                                        {...task}
                                    />
                                )
                            })
                            : null
                        }
                    </tbody>
                </table>
                {
                    tasks.length <= 0 && !isGetting &&
                        <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                }
                {
                    isGetting &&
                    <div className="text-center"><Digital color="#000000" size={24} /></div>
                }
            </div>
        );
    }
}

export default Tasks;