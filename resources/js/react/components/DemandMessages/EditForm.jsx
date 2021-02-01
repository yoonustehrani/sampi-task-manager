import axios from 'axios';
import React, { Component } from 'react';
import { sweetError } from '../../../helpers';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            priority: '',
            priorities: [],
            display: false,
        }
    }
    handleChangeTitle = (e) => {
        let {value} = e.target;
        this.setState(prevState => ({
            title: value
        }));
    }
    handleChangeSelect = (e) => {
        let {value} = e.target;
        this.setState(prevState => ({
            priority: Number(value)
        }));
    } 
    componentDidMount() {
        let title = $('#react-state-title > span').html();
        let priority = Number($('#react-state-priority').attr('data-id'));
        this.setState(prevState => ({
            title: title,
            priority: priority
        }))
        axios.get(PRIORITY_ROUTE).then(res => {
            let {data} = res;
            this.setState(prevState => ({
                priorities: data,
            }));
        });
    }
    handleSubmit = () => {
        let targets = ['#react-state-title > span', '#react-state-priority'];
        let {Target} = this.props;
        axios.put(Target, {
            title: this.state.title,
            priority: this.state.priority
        }).then(res => {
            let {title, priority} = res.data;
            let priorityText = priority.icon_class ? `(${priority.title} <i class="text-${priority.color_class} ${priority.icon_class}"></i>)` : `(${priority.title})`;
            $(targets[0]).html(title);
            $(targets[1]).html(priorityText);
            $(targets[1]).attr('data-id', priority.id);
        }).catch(err => {
            sweetError(err)
        });
    }
    handleToggle = () => {
        this.setState(prevState => ({
            display: ! prevState.display
        }))
    }
    render() {
        let {priorities} = this.state;
        return (
            <div className="col-12 float-left p-0 text-right">
                <button type="button" className="btn btn-sm btn-primary mb-3" onClick={this.handleToggle}><i className={`fas ${this.state.display ? 'fa-arrow-up' : 'fa-pencil-alt'}`}></i></button>
                <div className={`col-12 float-left p-3 form-group d-rtl ${this.state.display ? '' : 'd-none'}`}>
                    <div className="input-group float-right col-md-6 col-12 mb-3">
                        <div className="input-group-append">
                            <span className="input-group-text">عنوان</span>
                        </div>
                        <input type="text" value={this.state.title} onChange={this.handleChangeTitle} className="form-control text-right d-rtl"/>
                    </div>
                    <div className="input-group float-right col-md-6 col-12 mb-3">
                        <div className="input-group-append">
                            <span className="input-group-text">اولویت</span>
                        </div>
                        <select value={this.state.priority} onChange={this.handleChangeSelect} className="form-control">
                            {priorities.length > 0 && priorities.map((priority, i) => {
                                return (
                                    <option value={priority.id} key={i}>{priority.title}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-12 text-center float-left">
                        <button type="button" className="btn btn-sm btn-success" onClick={this.handleSubmit}>ذخیره <i className="fas fa-save"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditForm;