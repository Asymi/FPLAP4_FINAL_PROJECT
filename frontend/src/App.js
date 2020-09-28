import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
// import { Activities, Categories, Dashboard, Login, Signup } from './containers'
import Login from './containers/Login'
import Signup from './containers/Signup'
import NavBar from './components/NavBar'

class App extends Component{
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
        <Switch>
          {/* <Route exact path='/' component={Landing}/>
          <Route path='/about' component={About}/>
          <Route path='/activities' component={Activities}/>
          <Route path='/categories' component={Categories}/>
          <Route path='/dashboard' component={Dashboard}/> */}
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
        </Switch>
      </div>
    )
  }
  
}

export default App;
