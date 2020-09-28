import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

class App extends Component{
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/activities' component={Activities}/>
          <Route path='/categories' component={Categories}/>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
      </div>
    )
  }
  
}

export default App;
