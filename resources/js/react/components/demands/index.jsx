import React, { Component } from 'react'

export default class Demands extends Component {
    render() {
        return (
            <div>
                <div className="col-12 mt-4 float-right">
                    <div className="title-section">
                        <i className="fas fa-arrow-left"></i>
                        <h4>خواسته ها</h4>
                    </div>
                    <table className="col-12 table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated rubberBand">
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
                            <tr className="animated fadeIn">
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
                    {/* {
                        workspaces.length <= 0 && !isGetting &&
                            <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                    } */}
                    {/* {
                        isGetting &&
                            <div className="text-center">
                                <Digital color="#000000" size={24} />
                            </div>
                    } */}
                </div>
                <div className="col-12 mt-4 float-right">
                    <div className="title-section">
                        <i className="fas fa-arrow-right"></i>
                        <h4>نیاز ها</h4>
                    </div>
                    <table className="col-12 table table-striped table-bordered table-hover table-responsive w-100 d-block d-md-table float-right animated rubberBand">
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
                            <tr className="animated fadeIn">
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
                    {/* {
                        workspaces.length <= 0 && !isGetting &&
                            <p className="text-center text-secondary">موردی برای نمایش وجود ندارد</p>
                    } */}
                    {/* {
                        isGetting &&
                            <div className="text-center">
                                <Digital color="#000000" size={24} />
                            </div>
                    } */}
                </div>
            </div>
        )
    }
}
