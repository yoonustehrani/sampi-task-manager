import axios from 'axios';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Spinner} from 'react-activity';
import Message from './Message';
import 'react-activity/lib/Spinner/Spinner.css'
import CreateMessage from './CreateMessage';
import { sweetError } from '../../../helpers';

class DemandMessages extends Component {
    constructor(props) {
        super(props)
        this.scrollParentRef = React.createRef();
        this.state = {
            messages: [],
            currentPage: 0,
            hasMore: true,
            loading: true,
            api_token: this.props.apiKey
        }
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
    componentDidMount() {
        this.handleLoadMore(); 
    }
    render() {
        let {messages, hasMore, loading, api_token} = this.state;
        return (
            <div className="h-100">
                <CreateMessage addMessage={this.handleAddMessage.bind(this)} editMessage={this.handleEditMessage.bind(this)} Target={this.props.newMessage + '?api_token=' + api_token}/>
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