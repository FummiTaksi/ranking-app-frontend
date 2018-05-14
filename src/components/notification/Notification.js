import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {

    render() {
      const {notification} = this.props
        if (notification === "") {
            return null
          }
          return (
            <div className = "success">
              {notification}
            </div>
          )
    }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification