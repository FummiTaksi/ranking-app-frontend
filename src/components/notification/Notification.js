import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class Notification extends React.Component {

    render() {
      const {notification} = this.props
        if (notification === "") {
            return null
          }
          return (
            <div className = "success">
               <Message
                icon='inbox'
                header={notification}
                content=''
                />
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