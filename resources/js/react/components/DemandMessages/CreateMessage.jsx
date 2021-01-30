import axios from 'axios';
import React, { Component } from 'react';
import TinymcEditor from '../tinymce-editor/index'

class CreateMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            display: false,
            target: this.props.Target
        }
    }
    handleChangeContent = (content) => {
        this.setState(prevState => ({
            text: content
        }))
    }
    handleSubmit = () => {
        let {addMessage, editMessage} = this.props;
        let message = {
            text: this.state.text,
            id: null,
            user: CurrentUser,
            created_at: null
        };
        let id = addMessage(message);
        axios.post(this.state.target, {text: message.text}).then(res => {
            let message = res.data;
            editMessage(id, message);
        }).catch(err => {
            if (! err.response) {
                Swal.default.fire({
                    icon: "error",
                    title: "خطا",
                    html: 'خطا در برقراری ارتباط',
                    confirmButtonText: "تایید",
                    customClass: {
                        content: 'persian-text',
                    },
                })
                return;
            }
            let { status, data } = err.response
            if (status === 422) {
                let { errors } = data, err_html = ""
                Object.entries(errors).map(([param, message]) => {
                    err_html += `<p class="float-right text-center col-12">${message}</p>`
                })
                Swal.default.fire({
                    icon: "error",
                    title: "خطا",
                    html: err_html,
                    confirmButtonText: "تایید",
                    customClass: {
                        content: 'persian-text',
                    },
                })
            }
        })
    }
    handleToggle = () => {
        this.setState(prevState => ({
            display: ! prevState.display
        }))
    }
    render() {
        return (
            <div className="col-12 p-0 text-right">
                <button type="button" className="btn btn-primary mb-3" onClick={this.handleToggle}><i className={`fas ${this.state.display ? 'fa-minus' : 'fa-plus'}`}></i></button>
                <div className={`col-12 p-3 ${this.state.display ? '' : 'd-none'} animated fadeIn`}>
                    <div className="input-group col-12 pl-0 pr-0">
                        <div className="tinymc-container">
                            <TinymcEditor changeContent={this.handleChangeContent}/>
                        </div>
                        <div className="text-center mt-2">
                            <button type="button" className="btn btn-outline-primary" onClick={this.handleSubmit}>ارسال <i className="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMessage;