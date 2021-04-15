/*
Registered routing components
 */

import React, {Component} from 'react'
import { NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {getReportList,findUser,login} from '../../redux/actions'
//import Result
import {withRouter} from 'react-router'
import {Switch, Route} from 'react-router-dom'

import SearchResult from '../../components/search-result/search-result'
import ReportList from '../../components/report-list/report-list'




class Admin extends Component {

  componentDidMount () {
    this.props.getReportList()
  }

  render () {
    const {reportList} = this.props
    return (
    <div>
    <NavBar className='sticky-header'>Report list</NavBar>
      <Switch>
        <Route path='/admin' render={()=><ReportList reportList={reportList} />}/>
        <Route path='/searchResult' render={()=><SearchResult userDetail={this.props.userDetail} />}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter( connect(
  state => ({user:state.user,
            reportList:state.reportList,
            userDetail:state.userDetail}),
  {getReportList,findUser,login}
)(Admin))
