import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../components/form/Input';
import { login } from '../../reducers/loginReducer';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  logIn(e) {
    e.preventDefault();
    const { logIn } = this.props;
    logIn(this.state);
    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h2>
          Signing in is only available for admin!
        </h2>
        <form onSubmit={this.logIn}>
          <Input
            type="input"
            text="Username:"
            name="username"
            value={username}
            onChange={this.handleFormChange}
          />
          <Input
            type="password"
            text="Password:"
            name="password"
            value={password}
            onChange={this.handleFormChange}
          />
          <button type="submit">
            Log in
            {' '}
          </button>
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = {
  logIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logIn: login,
};

const ConnectedSignInForm = connect(
  null,
  mapDispatchToProps,
)(SignInForm);

export default ConnectedSignInForm;
