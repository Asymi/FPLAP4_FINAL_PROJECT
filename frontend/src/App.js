import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { Activities, Categories, Dashboard, Login, Signup, Landing, About, Covid19, ForgotPassword } from './containers'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux'
import { logIn } from './Actions/Actions'
import NavBar from './components/NavBar'
import './App.css'

class App extends Component{
  componentDidMount(){
    if(localStorage.token){
      this.props.setLoggedIn()
    }
  }

  render() {
    return (
      <div className="App">
        <div className="logo-icon">
            <Link to='/'><FontAwesomeIcon icon={faMapMarkerAlt}/>Find-Do</Link>
        </div>
        <NavBar></NavBar>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/about' component={About}/>
          <Route path='/activities' component={Activities}/>
          <Route path='/categories' component={Categories}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/forgot' component={ForgotPassword}/>
          <Route path='/covid' component={Covid19}/>
          <Route path='/forgotpassword' component={ForgotPassword}/>
        </Switch>
        <footer>
          &copy; 2020 Find-Do All rights reserved.
        </footer>
      </div>
    )
  }
  
}

const mDTP = dispatch => ({
    setLoggedIn: () => dispatch(logIn())
})

export default connect(null, mDTP)(App);
