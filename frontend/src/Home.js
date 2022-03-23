import React,{Component} from 'react';

import {NavLink} from 'react-router-dom';

export class Home extends Component{
    render(){
        return(
            <div className="App container">  
            <nav className="navbar navbar-expand-sm bg-light navbar-dark">
              <ul className="navbar-nav">
                <li className="nav-item- m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/userAPI">
                    userAPI
                  </NavLink>
                </li>
                <li className="nav-item- m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/toDoAPI">
                    toDoAPI
                  </NavLink>
                </li>
                <li className="nav-item- m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/login">
                    Cikis Yap
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        )
    }
}