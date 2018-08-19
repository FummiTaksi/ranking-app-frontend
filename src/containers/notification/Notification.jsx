import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

function Notification({ notification }) {
  if (notification.icon === '') {
    return null;
  }
  return (
    <div className="success">
      <Message
        icon={notification.icon}
        header={notification.header}
        content={notification.content}
      />
    </div>
  );
}
Notification.propTypes = {
  notification: PropTypes.shape({
    icon: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  notification: state.notification,
});

const ConnectedNotification = connect(
  mapStateToProps,
)(Notification);

export default ConnectedNotification;
