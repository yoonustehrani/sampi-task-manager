import React, { Component } from 'react'

export default class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.tabResultsRef = []
        this.tabTitlesRef = []
        for (let i = 0; i < 4; i++) {
            this.tabResultsRef.push(React.createRef())
            this.tabTitlesRef.push(React.createRef())
        }
        this.state = {
            mixedTasks: [],
            statistics: {},
            isGetting: true,
            workspaces: []
        }
    }

    changeTab = (tab_index) => {
        let { mixedTasksApi } = this.props
        let { mixedTasks } = this.state
        // if (tab_index === 1 && mixedTasks.length === 0) {
        //     this.setState({
        //         isGetting: true
        //     })
        //     Axios.get(`${mixedTasksApi}&limit=15&order_by=due_to&order=desc`).then(res => {
        //         let { data } = res
        //         this.setState({
        //             mixedTasks: data,
        //             isGetting: false
        //         })
        //     })
        // }
        this.tabResultsRef.map((tabResultRef, i) => {
            if (tab_index === i) {
                tabResultRef.current.classList.add("active")
            } else {
                tabResultRef.current.classList.remove("active")
            }
        })
        this.tabTitlesRef.map((tabTitleRef, i) => {
            if (tab_index === i) {
                tabTitleRef.current.classList.add("active")
            } else {
                tabTitleRef.current.classList.remove("active")
            }
        })
    }

    render() {
        return (
            <div>
                <div className="float-right">
                    <div className="user-info-section col-12 col-md-4 float-right pl-0 pr-0">
                        <div className="user-card pt-4">
                            <div className="user-info-section text-center">
                                <div className="user-img-container">
                                    <img src={APP_PATH + "images/danial.jpg"} alt=""/>
                                </div>
                                <div className="user-text-info-container">
                                    <h5 className="d-block mt-3">دانیال طهرانیم</h5>
                                    <h6 className="float-right">danialtehrani@</h6>
                                    <h6 className="float-right mr-1">مدیر بخش مالی</h6>
                                </div>
                                <hr/>
                            </div>
                            <div className="user-work-section">
                                <nav className="tab-title-bar text-center">
                                    <a className="tab-link active" ref={this.tabTitlesRef[0]} onClick={this.changeTab.bind(this, 0)}>
                                        <i className="fas fa-project-diagram d-block d-md-inline"></i>
                                        پروژه ها
                                    </a>
                                    <a className="tab-link" ref={this.tabTitlesRef[1]} onClick={this.changeTab.bind(this, 1)}>
                                        <i className="fas fa-tasks d-block d-md-inline"></i>
                                        وظایف
                                    </a>
                                    <a className="tab-link" ref={this.tabTitlesRef[2]} onClick={this.changeTab.bind(this, 2)}>
                                        <i className="fas fa-comment-dots d-block d-md-inline"></i>
                                        درخواست ها
                                    </a>
                                    <a className="tab-link" ref={this.tabTitlesRef[3]} onClick={this.changeTab.bind(this, 3)}>
                                        <i className="fas fa-clipboard-list d-block d-md-inline"></i>
                                        نیاز ها
                                    </a>
                                </nav>
                                <div className="user-works-results col-12 mt-4 active" ref={this.tabResultsRef[0]}>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                    <div className="workspace-item col-12">
                                        <div className="workspace-img-container float-right ml-1">
                                            <img src={APP_PATH + "images/elnovel-logo.png"} alt=""/>
                                        </div>
                                        <div className="float-right">
                                            <h6 className="d-block">الناول</h6>
                                            <span>مکانی برای علاقه مندان به هنر و فرهنگ ایرانی</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-works-results col-12 mt-4" ref={this.tabResultsRef[1]}>
                                    
                                </div>
                                <div className="user-works-results col-12 mt-4" ref={this.tabResultsRef[2]}>
                                
                                </div>
                                <div className="user-works-results col-12 mt-4" ref={this.tabResultsRef[3]}>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="statistics-section col-12 col-md-8 float-right">
                        <div className="wide-section-statistics col-12 mb-1">
                            cahrt
                        </div>
                        <div className="small-section-statictics col-12 col-md-6 mr-2 mb-1">
                            cahrt
                        </div>
                        <div className="small-section-statictics col-12 col-md-6 mb-1">
                            cahrt
                        </div>
                        <div className="small-section-statictics col-12 col-md-6 mr-2 mb-1">
                            cahrt
                        </div>
                        <div className="small-section-statictics col-12 col-md-6 mb-1">
                            cahrt
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
