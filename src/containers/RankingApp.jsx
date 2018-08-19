import React from 'react';
import {
  HashRouter as Router, Route, Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Menu, Header, Button, Icon, Segment, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SignInForm from './signin/SignInForm';
import Notification from './notification/Notification';
import RankingForm from './ranking/RankingForm';
import RankingList from './ranking/RankingList';
import RankingView from './ranking/RankingView';

import { logout, initCurrentUser } from '../reducers/loginReducer';

const linkWithIcon = (path, text, iconName) => (
  <Menu.Item>
    <Link to={path}>
      {text}
      <Icon name={iconName} />
    </Link>
  </Menu.Item>
);

const HomePage = () => (
  <div>
    <Header as="h2" icon textAlign="center">
      <Icon name="table tennis" circular />
      <Header.Content>
        Welcome to Ranking-app!
      </Header.Content>
    </Header>
    <Segment>
      Purpose of this website is to offer Finnish table tennis rankings in user readable form.
      <Divider />
        This website is developed in co-operation with Finnish table tennis union:
      {' '}
      <a href="http://www.sptl.fi/sptl_uudet/">
        www.sptl.fi
      </a>
    </Segment>
  </div>
);


const viewForGuest = () => (
  <div>
    <Router>
      <div>
        <Menu>
          {linkWithIcon('/', 'Home', 'home')}
          {' '}
&nbsp;
          {linkWithIcon('/signin', 'Sign in', 'sign in alternate')}
          {' '}
&nbsp;
          {linkWithIcon('/rankings', 'Rankings', 'ordered list')}
          {' '}
&nbsp;
        </Menu>
        <Route exact path="/" render={() => HomePage()} />
        <Route exact path="/signin" render={() => <SignInForm />} />
        <Route exact path="/rankings" render={() => <RankingList />} />
        <Route exact path="/rankings/:rankingId" render={location => <RankingView location={location} />} />
      </div>
    </Router>
    <Notification />
  </div>
);

class RankingApp extends React.Component {
  componentDidMount() {
    const { initUser } = this.props;
    initUser();
  }

  viewForSignedInUser() {
    const { credentials, logOut } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Menu>
              {linkWithIcon('/', 'Home', 'home')}
              {' '}
&nbsp;
              {linkWithIcon('/upload', 'Create new ranking', 'plus')}
              {' '}
&nbsp;
              {linkWithIcon('/rankings', 'Rankings', 'ordered list')}
              {' '}
&nbsp;
                        You are signed in as
              {' '}
              {credentials.username}
              {' '}
&nbsp;
              <Button onClick={() => logOut()}>
                <Icon name="sign out alternate" />
Logout
              </Button>
            </Menu>
            <Route exact path="/" render={() => HomePage()} />
            <Route exact path="/upload" render={() => <RankingForm />} />
            <Route exact path="/rankings" render={() => <RankingList />} />
            <Route exact path="/rankings/:rankingId" render={location => <RankingView location={location} />} />
          </div>
        </Router>
        <Notification />
      </div>
    );
  }

  render() {
    const { credentials } = this.props;
    const { username } = credentials;
    return (
      <div>
        {username && this.viewForSignedInUser()}
        {!username && viewForGuest()}
      </div>
    );
  }
}

RankingApp.propTypes = {
  initUser: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  credentials: PropTypes.shape({
    username: PropTypes.string.isRequired,
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
