import React, {Component} from 'react'
import {WingBlank, WhiteSpace, Card,SearchBar} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import {findUser} from '../../redux/actions'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'


const Header = Card.Header
const Body = Card.Body
class ReportList extends Component {
    state = {
        username: ''
      };
      onChange= (username) => {
        this.setState({ username });
      };
      clear = () => {
        this.setState({ username: '' });
      };
      handleClick = () => {
        this.manualFocusInst.focus();
      }
      onSubmit=(username)=>{
          this.props.findUser(username)
          this.props.history.replace('/searchResult')
      }
   
  render () {
    const {reportList} = this.props
    return (
    <div>
        <WingBlank style={{marginBottom:50, marginTop:50}}>
        <SearchBar value={this.state.username} placeholder="Find user" onSubmit={username=>this.onSubmit(username)} onChange={this.onChange} cancelText='Cancle'/>
            <QueueAnim type='scale'>
            {
                reportList.map(report => (
                <div key={report._id}>
                    <WhiteSpace/>
                    <Card style={{backgroundColor:'#FFE4E1'}} >  
                    <Header                   
                        extra={report.reportTitle}
                    />
                    <Body>
                    <div>Reported person: {report.reportedUserName}</div>
                    <div>Reason: {report.reportReason}</div>                  
                    <div>Date: {report.reportDate}</div>                  
                    </Body>
                    </Card>
                </div>
                ))
            }
            </QueueAnim>        
        </WingBlank>
      </div>
    )}
}
export default withRouter( connect(
    state => ({userDetail:state.userDetail}),
    {findUser}
  )(ReportList))