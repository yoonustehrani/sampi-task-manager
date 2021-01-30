import axios from 'axios';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Spinner} from 'react-activity';
import Message from './Message';
import 'react-activity/lib/Spinner/Spinner.css'

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
    // toggleLoader = () => {
    //     this.setState({
    //         loading: true,
    //     })
    // }
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
        }).catch(e => {
            console.log(e);
        })

    }
    componentDidMount() {
        this.handleLoadMore(); 
    }
    render() {
        let {messages, hasMore, loading} = this.state;
        return (
            <div className="col-12 float-left" style={
                {
                    height:'100%',
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
                        <Message key={i} index={i} {...message}/>
                    )
                })}
                </InfiniteScroll>
                {loading && <Spinner />}
            </div>
        );
    }
}

export default DemandMessages;