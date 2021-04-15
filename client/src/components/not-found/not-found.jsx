/*
 UI routing component of the page cannot be found
 */

import React from "react"
import {Button} from "antd-mobile"

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>Sorry, the page was not found!</h2>
          <Button
            type="primary"
            onClick={() => this.props.history.replace("/")}
          >
            Homepage
          </Button>
        </div>
      </div>
    )
  }
}

export default NotFound