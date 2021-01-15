import React, { Component } from 'react'

export default class Workspace extends Component {
    constructor(props) {
        super(props)
        this.addTaskRef = React.createRef()
        this.addIconRef = React.createRef()
        this.state = {
             
        }
    }

    toggleAddBox = () => {
        this.addIconRef.current.classList.toggle("fa-plus")
        this.addIconRef.current.classList.toggle("fa-minus")
        this.addTaskRef.current.classList.toggle("d-none")
    }

    render() {
        return (
            <div>
                <div className="float-right col-12">
                    <div className="workspace-title-section col-12">
                        <i className="fas fa-clipboard-list"></i>
                        <h4 className="">وظایف :</h4>      
                    </div>  
                    <div className="workspace-add-task">
                        <div className="workspace-title-section" onClick={this.toggleAddBox}>
                            <i className="fas fa-plus animated jello" ref={this.addIconRef}></i>
                            <h5>افزودن کار</h5>
                        </div>
                        <div className="add-task-section d-none animated heartBeat col-12 p-3" ref={this.addTaskRef}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">عنوان</span>
                                </div>
                                <input type="text" className="form-control" placeholder="عنوان کار را در این قسمت وارد کنید"/>
                            </div>
                            <div className="input-group input-group-single-line">
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
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">دسته بندی</span>
                                </div>
                                <input type="text" className="form-control" placeholder="این کار در چه گروهی قرار میگیرد؟" />
                            </div>
                            <div className="input-group input-group-single-line">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">مسئولین</span>
                                </div>
                                <select id="new-task-members" className="form-control text-right" multiple>
                                    <option value="0">امیررضا منصوریان</option>
                                    <option value="1">یونس طهرانیم</option>
                                    <option value="2">باران نخعی</option>
                                    <option value="2">2باران نخعی</option>
                                    <option value="2">3باران نخعی</option>
                                    <option value="2">4باران نخعی</option>
                                    <option value="2">5باران نخعی</option>
                                    <option value="2">6باران نخعی</option>
                                    <option value="2">7باران نخعی</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">توضیحات</span>
                                </div>
                                <textarea className="form-control" placeholder="توضیحات تکمیلی در رابطه با این کار"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
