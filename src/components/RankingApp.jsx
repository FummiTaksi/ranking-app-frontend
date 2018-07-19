import React from 'react';
import {
  HashRouter as Router, Route, Link, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Menu, Header, Button, Icon, Segment, Divider,
} from 'semantic-ui-react';
import SignInForm from './signin/SignInForm';
import Notification from './notification/Notification';
import RankingForm from './ranking/RankingForm';
import RankingList from './ranking/RankingList';
import RankingView from './ranking/RankingView';
import { logout, initCurrentUser } from '../reducers/loginReducer';

const linkWithIcon = (path, text, iconName) => {
  return (
    <Menu.Item>
      <Link to={path}>
        {text}
        <Icon name={iconName} />
      </Link>
    </Menu.Item>
  );
};

const HomePage = () => {
  return (
    <div>
      <Header as="h2" icon textAlign="center">
        <Icon name="table tennis" circular />
        <Header.Content>
          Welcome to Ranking-app!
        </Header.Content>
      </Header>
      <Segment>
            This website's purpose is to offer Finnish table tennis rankings in user readable form.
        <Divider />
            This website is developed in co-operation with Finnish table tennis union:
        {' '}
        <a href="http://www.sptl.fi/sptl_uudet/">
          www.sptl.fi
        </a>
      </Segment>
    </div>
  );
};

class RankingApp extends React.Component {
  componentDidMount() {
    this.props.initCurrentUser();
  }

  viewForGuest() {
    return (
      <div>
        <Router>
          <div>
            <Menu>
              {this.linkWithIcon('/', 'Home', 'home')}
              {' '}
&nbsp;
              {this.linkWithIcon('/signin', 'Sign in', 'sign in alternate')}
              {' '}
&nbsp;
              {this.linkWithIcon('/rankings', 'Rankings', 'ordered list')}
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
  }


  viewForSignedInUser() {
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
              {this.props.credentials.username}
              {' '}
&nbsp;
              <Button onClick={() => this.props.logout()}>
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
    const { username } = this.props.credentials;
    return (
      <div>
        {username && this.viewForSignedInUser()}
        {!username && this.viewForGuest()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  credentials: state.login,
});

const mapDispatchToProps = {
  logout,
  initCurrentUser,
};

const ConnectedRankingApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RankingApp);

export default ConnectedRankingApp;
