import React from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { login } from '../../reducers/loginReducer';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async logIn(e) {
    e.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(credentials);
    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
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
            value={this.state.username}
            onChange={this.handleFormChange}
          />
          <Input
            type="password"
            text="Password:"
            name="password"
            value={this.state.password}
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
const mapDispatchToProps = {
  login,
};

const ConnectedSignInForm = connect(
  null,
  mapDispatchToProps,
)(SignInForm);

export default ConnectedSignInForm;
