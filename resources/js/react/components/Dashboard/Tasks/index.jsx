import React, { Component } from 'react';
import { redirectTo } from '../../../../helpers'
import Task from './Task';

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            route: this.props.Route,
            workspace_route: this.props.workspace_route,
        }
    }
    render() {
        let tasks = this.props.AllTasks;
        return (
            <div>
                <table className="table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated swing">
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
                        {
                            tasks.length > 0 
                            ? tasks.map((task, i) => {
                                return (
                                    <Task key={i} index={i} workspace_route={this.state.workspace_route} onClick={() => redirectTo(this.state.route.replace("taskId", task.id))}  {...task}/>
                                )
                            })
                            : null
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Tasks;