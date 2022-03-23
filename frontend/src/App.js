import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {userAPI} from './userAPI';
import {toDoAPI} from './toDoAPI';
import {Login} from './Login';
import {BrowserRouter, Route, Router, Switch, NavLink} from 'react-router-dom';
import { OpenButton } from './OpenButton';


function App() {
  
  
  return (
    <BrowserRouter>
    <div className="App container">

    <OpenButton></OpenButton>

      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/userAPI' component={userAPI}/>
        <Route path='/toDoAPI' component={toDoAPI}/>
      </Switch>
    </div>
    </BrowserRouter>

    
  );
}


export default App;
