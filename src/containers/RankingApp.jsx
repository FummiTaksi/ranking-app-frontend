import React from 'react';
import {
  HashRouter as Router, Route, Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Menu, Button, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SignInForm from './signin/SignInForm';
import Notification from './notification/Notification';
import RankingForm from './ranking/RankingForm';
import RankingList from './ranking/RankingList';
import RankingView from './ranking/RankingView';
import PlayerPage from './player/PlayerPage';
import PlayerView from './player/PlayerView';
import HomePage from '../components/homepage/Homepage';

import { logout, initCurrentUser } from '../reducers/loginReducer';

const linkWithIcon = (path, text, iconName) => (
  <Menu.Item>
    <Link to={path}>
      {text}
      <Icon name={iconName} />
    </Link>
  </Menu.Item>
);

class RankingApp extends React.Component {
  componentDidMount() {
    const { initUser } = this.props;
    initUser();
  }

  logInOrLogOut() {
    const { credentials, logOut } = this.props;
    const { username } = credentials;
    if (username) {
      return (
        <div id="loggedIn">
          <p>
            {`You are logged in as ${username} `}
          </p>
          <Button onClick={() => logOut()}>
            <Icon name="sign out alternate" />
            Logout
          </Button>
        </div>
      );
    }
    return (
      <div>
        {linkWithIcon('/signin', 'Sign in', 'sign in alternate')}
      </div>
    );
  }

  renderUploadLink() {
    const { credentials } = this.props;
    const { username } = credentials;
    if (username) {
      return (
        <div>
          {linkWithIcon('/upload', 'Create new ranking', 'plus')}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Menu>
              {linkWithIcon('/', 'Home', 'home')}
              {linkWithIcon('/players', 'Players', 'id card')}
              {this.renderUploadLink()}
              {linkWithIcon('/rankings', 'Rankings', 'ordered list')}
              {this.logInOrLogOut()}
            </Menu>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/upload" render={() => <RankingForm />} />
            <Route exact path="/rankings" render={() => <RankingList />} />
            <Route exact path="/rankings/:rankingId" render={location => <RankingView location={location} />} />
            <Route exact path="/players" render={() => <PlayerPage />} />
            <Route exact path="/players/:playerId" render={location => <PlayerView location={location} />} />
          </div>
        </Router>
        <Notification />
      </div>
    );
  }
}

RankingApp.propTypes = {
  initUser: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  credentials: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  credentials: state.login,
});

const mapDispatchToProps = {
  logOut: logout,
  initUser: initCurrentUser,
};

const ConnectedRankingApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RankingApp);

export default ConnectedRankingApp;
