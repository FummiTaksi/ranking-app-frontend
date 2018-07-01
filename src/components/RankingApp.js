import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import SignInForm from './signin/SignInForm'
import Notification from './notification/Notification'
import RankingForm from './ranking/RankingForm'
import RankingList from './ranking/RankingList'
import {logout, initCurrentUser} from '../reducers/loginReducer'
import { connect } from 'react-redux'

class RankingApp extends React.Component {


    componentDidMount() {
      this.props.initCurrentUser()
    }


    viewForGuest() {
        return (
            <div>
                <Router>
                    <div>
                      <div>
                        <Link to="/">Home</Link> &nbsp;
                        <Link to="/signin">Sign in</Link>
                        <Link to="rankings">Rankings</Link>
                      </div>
                        <Route exact path="/" render={() => this.HomePage()} />
                        <Route exact path="/signin" render={() => <SignInForm/>} />
                        <Route exact path="/rankings" render={() => <RankingList/>} />
                     </div>        
                </Router>       
                <Notification/>

            </div>
        )
    }

    viewForSignedInUser() {
        return (
            <div>
                <Router>
                    <div>
                      <div>
                        <Link to="/">Home</Link> &nbsp;
                        <Link to="/upload"> Create new ranking</Link> &nbsp;
                        <Link to="rankings">Rankings</Link> &nbsp;
                        You are signed in as {this.props.credentials.username} &nbsp;
                        <button onClick = {() => this.props.logout()}>Logout</button>
                      </div>
                        <Route exact path="/" render={() => this.HomePage()} />
                        <Route exact path="/upload" render={() => <RankingForm/>} />
                        <Route exact path="/rankings" render={() => <RankingList/>} />
                     </div>        
                </Router>       
                <Notification/>
            </div>
        )

    }

    HomePage() {
        return (
            <div>
                <h1>Welcome to RankingApp!</h1>
                <p>This websites purpose is to offer Finnish table tennis rankings.</p>
                <p>This website is developed in co-operation with Finnish table tennis union: <a href="http://www.sptl.fi/sptl_uudet/">www.sptl.fi</a></p>
            </div>
        )
    }

    render() {
        const username = this.props.credentials.username
        return (
            <div>
              {username && this.viewForSignedInUser()}  
              {!username && this.viewForGuest()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        credentials: state.login
    }
}

const mapDispatchToProps = {
    logout,
    initCurrentUser
}

const ConnectedRankingApp = connect(
    mapStateToProps,
    mapDispatchToProps
  )(RankingApp)

export default ConnectedRankingApp