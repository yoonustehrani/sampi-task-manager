import axios from 'axios';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Spinner} from 'react-activity';
import Message from './Message';
import 'react-activity/lib/Spinner/Spinner.css'
import CreateMessage from './CreateMessage';
import { sweetError } from '../../../helpers';
import EditForm from './EditForm';
import Swal from 'sweetalert2';

class DemandMessages extends Component {
    constructor(props) {
        super(props)
        this.scrollParentRef = React.createRef();
        this.state = {
            messages: [],
            currentPage: 0,
            hasMore: true,
            loading: true,
            api_token: this.props.apiKey,
            demand: null
        }
        setTimeout(() => {
            axios.get(this.props.getDemand + `?api_token=${this.state.api_token}`).then(res => {
                let demand = res.data;
                this.setState(prevState => ({
                    demand: demand
                }));
            }).catch(e => sweetError(e));
        }, 1000);
    }
    handleLoadMore = () => {
        let {getMessages} = this.props;
        let {api_token, currentPage, hasMore} = this.state;
        let url = getMessages + `?api_token=${api_token}&page=${currentPage + 1}`;
        this.setState({
            loading: true
        })
        axios.get(url).then(res => {
            let {data, next_page_url} = res.data;
            this.setState(prevState => ({
                hasMore: next_page_url !== null ? true : false,
                currentPage: prevState.currentPage + 1,
                messages: [...prevState.messages, ...data],
                loading: false,
            }))
        }).catch(err => {
            sweetError(err);
        })
    }
    handleAddMessage = (message) => {
        let id = new Date().valueOf();
        message.id = id;
        this.setState(prevState => ({
            messages: [message, ...prevState.messages],
        }))
        return id;
    }
    handleEditMessage = (messageId, newMessage) => {
        this.setState(prevState => ({
            messages: [...prevState.messages.map(message => {
                if (message.id === messageId) {
                    return newMessage;
                }
                return message;
            })]
        }))
    }
    handleToggleDemand = () => {
        let {toggleDemand} = this.props;
        let {api_token} = this.state;
        axios.put(toggleDemand + `?api_token=${api_token}`).then(res => {
            if (res.data.okay) {
                let {value} = res.data;
                let demand = this.state.demand;
                demand.finished_at = value;
                this.setState(prevState => ({
                    demand: demand
                }));
                Swal.default.fire({
                    icon: "success",
                    title: "موفقیت",
                    html: 'اطلاعات با موفقیت تغییر پیدا کرد',
                    confirmButtonText: "تایید",
                    customClass: {
                        content: 'persian-text',
                    },
                });
            }
        }).catch(err => sweetError(err));
    }
    componentDidMount() {
        this.handleLoadMore(); 
    }
    render() {
        let {messages, hasMore, loading, api_token, demand} = this.state;
        let {updateDemand} = this.props;
        return (
            <div className="h-100">
                {demand && demand.to.id == CurrentUser.id && ! demand.finished_at &&
                    <div className="col-12 float-left text-center p-3">
                        <button onClick={this.handleToggleDemand} className="btn btn-sm btn-danger"><i className="far fa-check-circle"></i> اعلام اتمام</button>
                    </div>
                }
                {demand && demand.finished_at && demand.to.id == CurrentUser.id &&
                    <div className="col-12 float-left text-center p-3">
                        <button onClick={this.handleToggleDemand} className="btn btn-sm btn-success"><i className="fas fa-redo-alt"></i> از سر گیری</button>
                    </div>
                }
                {demand && ! demand.finished_at &&
                    <CreateMessage addMessage={this.handleAddMessage.bind(this)} editMessage={this.handleEditMessage.bind(this)} Target={this.props.newMessage + '?api_token=' + api_token}/>
                }
                {demand && demand.from.id == CurrentUser.id &&
                    <EditForm Target={updateDemand + '?api_token=' + api_token}/>
                }
                <div className="col-12 float-left" style={
                    {
                        height:'700px',
                        overflow:'auto'
                    }
                } ref={this.scrollParentRef}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.handleLoadMore}
                        hasMore={hasMore && !loading}
                        useWindow={false}
                        getScrollParent={() => {return this.scrollParentRef.current}}
                    >
                    {messages && messages.length > 0 && messages.map((message, i) => {
                        return (
                            <Message key={i} index={i} id={message.id} {...message}/>
                        )
                    })}
                    </InfiniteScroll>
                    {loading && <Spinner />}
                </div>
            </div>
        );
    }
}

export default DemandMessages;