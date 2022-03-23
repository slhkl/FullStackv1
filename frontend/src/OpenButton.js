import React,{Component} from 'react';
import { variables } from './Variables.js';

import {NavLink} from 'react-router-dom';

export class OpenButton extends Component {

    constructor(props){
        super(props);

        this.state={
            OpenID:1
        }
    }
    Redirection() {
        this.setState({
            OpenID:0
        });
    }
    render(){
        const {
            OpenID
        }=this.state;

        return( 
            <div>

            
    {OpenID>0?
        <li className="nav-item- m-1">
        <NavLink className="btn btn-light btn-outline-primary" to="/login" onClick={()=>this.Redirection()}>
            Giris Sayfasina Git
        </NavLink>
      </li>
        :null} 

</div>
      
        );
    }
}
