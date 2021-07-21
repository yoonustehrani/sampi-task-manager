import React, { Component } from 'react'
import Workspace from './Workspace';

export default class Workspaces extends Component {
    constructor(props) {
        super(props)
        this.state = {
            route: this.props.Route
        }
    }
    render() {
        let workspaces = this.props.AllWorkspaces;
        return (
            <div>
                <table className="table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated bounceIn">
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
                        {
                            workspaces.length > 0 
                            ? workspaces.map((workspace, i) => { 
                                let workspace_url = this.state.route.replace("workspaceId", workspace.id);
                                return (
                                    <Workspace key={i} index={i} onClick={() => redirectTo(workspace_url)} {...workspace}/>
                                )
                            })
                            : null
                        }
                    </tbody>
                </table>
                {workspaces.length <= 0 &&
                    <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                }
            </div>
        )
    }
}