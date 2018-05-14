import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import SignInForm from './signin/SignInForm'

class RankingApp extends React.Component {


    viewForGuest() {
        return (
            <div>
                <Router>
                    <div>
                      <div>
                       <Link to="/">Home</Link> &nbsp;
                        <Link to="/signin">Sign in</Link>
                      </div>
                        <Route exact path="/" render={() => this.HomePage()} />
                        <Route exact path="/signin" render={() => <SignInForm/>} />
                     </div>        
                </Router>       
            </div>
        )
    }

    HomePage() {
        return (
            <h1>Welcome to RankingApp!</h1>
        )
    }

    render() {
        return (
            <div>
              {this.viewForGuest()}
            </div>
        )
    }
}

export default RankingApp