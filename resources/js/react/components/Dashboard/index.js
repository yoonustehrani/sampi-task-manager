import React, { Component } from 'react'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.tabResultsRef = []
        for (let i = 0; i < 4; i++) {
            this.tabResultsRef.push(React.createRef())
        }
        this.tabTitlesRef = []
        for (let i = 0; i < 4; i++) {
            this.tabTitlesRef.push(React.createRef())
        }
        this.state = {

        }
    }

    changeTab = (tab_index) => {
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
            <div className="col-12 dashboard-tab-container">
                <nav className="tab-title-bar text-center">
                    <a className="tab-link active" ref={this.tabTitlesRef[0]} onClick={this.changeTab.bind(this, 0)}>
                        <i className="fas fa-project-diagram"></i>
                        پروژه ها
                    </a>
                    <a className="tab-link" ref={this.tabTitlesRef[1]} onClick={this.changeTab.bind(this, 1)}>
                        <i className="fas fa-tasks"></i>
                        وظایف
                    </a>
                    <a className="tab-link" ref={this.tabTitlesRef[2]} onClick={this.changeTab.bind(this, 2)}>
                        <i className="fas fa-comment-dots"></i>
                        درخواست ها
                    </a>
                    <a className="tab-link" ref={this.tabTitlesRef[3]} onClick={this.changeTab.bind(this, 3)}>
                        <i className="fas fa-clipboard-list"></i>
                        نیاز ها
                    </a>
                </nav>

                <div className="result-container col-12 mt-3 active" ref={this.tabResultsRef[0]}>
                    <table className="table table-striped table-bordered table-responsive-sm float-right">
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
                            <tr>
                                <th scope="row">۱</th>
                                <td className="text-right">
                                    <img src="workspace img link"/>
                                    <a href="workspace link">workspace title</a>
                                </td>
                                <td>
                                    1 <i className="fas fa-user"></i>
                                    {/* 7 <i className="fas fa-users"></i>
                                    0 <i className="fas fa-user-slash"></i> */}
                                </td>
                                <td>
                                    کل : <span className="badge badge-primary ml-1">3</span>
                                    اتمام : <span className="badge badge-success ml-1">2</span>
                                    باقی مانده : <span className="badge badge-danger ml-1">4</span>
                                </td>
                                <td>
                                    2
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>

                <div className="result-container col-12 mt-3" ref={this.tabResultsRef[1]}>
                    <table className="table table-striped table-bordered table-responsive-sm float-right">
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
                            <tr>
                                <th scope="row">۱</th>
                                <td>طراحی صفحه هوم</td>
                                <td className="text-right">
                                    <img src="workspace img link"/>
                                    <a href="workspace link">workspace title</a>
                                </td>
                                <td>طراحی وبسابت - فرانت</td>
                                <td>ضروری و مهم</td>
                                <td>۱۲ فروردین</td>
                                <td>
                                    <i className="fas fa-check-circle fa-3x"></i>
                                    {/* <i className="fas fa-times-circle"></i> */}
                                </td>
                                <td>
                                    {/* ۱۰ فروردین */}
                                    <i className="fas fa-calendar-times fa-3x"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>

                <div className="result-container col-12 mt-3" ref={this.tabResultsRef[2]}>
                    <table className="table table-striped table-bordered table-responsive-sm float-right">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">عنوان</th>
                                <th scope="col">پروژه</th>
                                <th scope="col">درخواست کننده</th>
                                <th scope="col">تسک مربوطه</th>
                                <th scope="col">اولویت</th>
                                <th scope="col">موعد تحویل</th>
                                <th scope="col">وضعیت اتمام</th>
                                <th scope="col">تاریخ اتمام</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">۱</th>
                                <td>ارسال فرمت پی ان جی لوگو</td>
                                <td className="text-right">
                                    <img src="workspace img link"/>
                                    <a href="workspace link">workspace title</a>
                                </td>
                                <td>امیررضا منصوریان</td>
                                <td>طراحی صفحه اصلی اپ</td>
                                <td>ضروری و مهم</td>
                                <td>۱۲ فروردین</td>
                                <td>
                                    <i className="fas fa-check-circle fa-3x"></i>
                                    {/* <i className="fas fa-times-circle"></i> */}
                                </td>
                                <td>
                                    {/* ۱۰ فروردین */}
                                    <i className="fas fa-calendar-times fa-3x"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>

                <div className="result-container col-12 mt-3" ref={this.tabResultsRef[3]}>
                    <table className="table table-striped table-bordered table-responsive-sm float-right">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">عنوان</th>
                                <th scope="col">پروژه</th>
                                <th scope="col">فرد مربوطه</th>
                                <th scope="col">تسک مربوطه</th>
                                <th scope="col">اولویت</th>
                                <th scope="col">موعد تحویل</th>
                                <th scope="col">وضعیت اتمام</th>
                                <th scope="col">تاریخ اتمام</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">۱</th>
                                <td>ارسال فرمت پی ان جی لوگو</td>
                                <td className="text-right">
                                    <img src="workspace img link"/>
                                    <a href="workspace link">workspace title</a>
                                </td>
                                <td>امیررضا منصوریان</td>
                                <td>طراحی صفحه اصلی اپ</td>
                                <td>ضروری و مهم</td>
                                <td>۱۲ فروردین</td>
                                <td>
                                    <i className="fas fa-check-circle fa-3x"></i>
                                    {/* <i className="fas fa-times-circle"></i> */}
                                </td>
                                <td>
                                    {/* ۱۰ فروردین */}
                                    <i className="fas fa-calendar-times fa-3x"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
            </div>
        )
    }
}
