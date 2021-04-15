import React, {Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

// Want to use the routing library in non-routing components api?
// withRoute()
class NavFooter extends Component {

  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired
  }

  render () {
    let {navList, unReadCount} = this.props
    // Filter out nav whose hide is true
    navList = navList.filter(nav => !nav.hide)
    const path = this.props.location.pathname // Requested path
    return (
      <TabBar>
        {
          navList.map((nav) => (
            <Item key={nav.path}
                  badge={nav.path==='/message' ? unReadCount : 0}
                  title={nav.text}
                  icon={{uri: require(`./images/${nav.icon}.png`)}}
                  selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                  selected={path===nav.path}
                  onPress={() => this.props.history.replace(nav.path)}/>
          ))
        }

      </TabBar>
    )
  }
}

// Expose the components produced by the withRouter() package
// Some routing component-specific attributes will be passed into the component internally: history/location/math
export default withRouter(NavFooter)