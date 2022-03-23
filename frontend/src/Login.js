import React,{Component} from 'react';
import { variables } from './Variables.js';

import {NavLink} from 'react-router-dom';

export class Login extends Component {
    

    constructor(props){
        super(props);

        this.state={
            userList:[],
            modalTitle:"",
            userName:"",
            userSurName:"",
            userEMail:"",
            userPassword:"",
            userID:0,
        }
    }

    refreshListLog(){
        fetch(variables.API_URL+'userAPI')
        .then(response=>response.json())
        .then(data=>{
            this.setState({userList:data});
        });
    }

    componentDidMount(){
        this.refreshListLog();
    }

    addClickLog(){
        this.setState({
            modalTitle:"Kayit Ol",
            userID:0,
            userName:"",
            userSurName:"",
            userEMail:"",
            userPassword:""
        });
    }

    Logout() {
        this.setState({
            userID:0,
            userName:"",
            userSurName:"",
            userEMail:"",
            userPassword:""
        });
    }

    loginClick(){
        this.setState({
            modalTitle:"Giris Yap",
            userID:-1,
            userName:"",
            userSurName:"",
            userEMail:"",
            userPassword:""
        });
        alert("Email ve sifreyi doldurmaniz yeterlidir");
    } 
    checkLoginClick() {
        fetch(variables.API_URL+'userAPI',{
            method:'PATCH',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userID:this.state.userID,
                userName:this.state.userName,
                userSurName:this.state.userSurName,
                userEMail:this.state.userEMail,
                userPassword:this.state.userPassword
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            result.map(re=>{
                if(re.userPassword==this.state.userPassword & re.userEMail==this.state.userEMail) {
                    this.state.userID=re.userID;
                    this.state.userSurName=re.userSurName;
                    this.state.userName=re.userName;

                    alert("giris basarili");
                }     
            })
            this.refreshListLog();
        },(error)=>{
            alert('Failed');
        })
    }
                 

    createClickLog(){
        fetch(variables.API_URL+'userAPI',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName:this.state.userName,
                userSurName:this.state.userSurName,
                userEMail:this.state.userEMail,
                userPassword:this.state.userPassword
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshListLog();
        },(error)=>{
            alert('Failed');
        })
    }

    changeUserNameLog =(e)=>{
        this.setState({userName:e.target.value});
    }

    changeUserSurNameLog =(e)=>{
        this.setState({userSurName:e.target.value});
    }

    changeUserEMailLog =(e)=>{
        this.setState({userEMail:e.target.value});
    }

    changeUserPasswordLog =(e)=>{
        this.setState({userPassword:e.target.value});
    }


    render(){
        const {
            userList,
            modalTitle,
            userName,
            userSurName,
            userEMail,
            userPassword,
            userID
        }=this.state;

        return( 
            <div>

        {userID<=0?
            <button type="button"
            className="btn btn-primary m-2 justify-content-center m-1000"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={()=>this.loginClick()}>
                Giris Yap
            </button>
        :null}

        {userID<=0?
            <button type="button" 
            className="btn btn-primary m-2 justify-content-center m-1000"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={()=>this.addClickLog()}>
                Kayit Ol
            </button>
        :null}      
                      
        <ul className="navbar-nav">
            <li className="nav-item- m-1">
                {userID>0?
                    <NavLink className="btn btn-light btn-outline-primary" to="/home" >
                        Ana Sayfa
                    </NavLink>
                :null} 
            </li>
        </ul>
            
        {userID>0?
        <li className="nav-item- m-1">
        <NavLink className="btn btn-light btn-outline-primary" to="/login" onClick={()=>this.Logout()}>
          Cikis Yap
        </NavLink>
      </li>
        :null} 
                  
        
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
           <div className="modal-header">
               <h5 className="modal-title">{modalTitle}</h5>
               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
               ></button>
           </div>
        
           <div className="modal-body">
               <div className="input-group mb-3">
                <span className="input-group-text">UserName</span>
                <input type="text" className="form-control" required="required" 
                value={userName}
                onChange={this.changeUserNameLog}/>
               </div>
        
               <div className="input-group mb-3">
                <span className="input-group-text">UserSurName</span>
                <input type="text" className="form-control" required="required" 
                value={userSurName}
                onChange={this.changeUserSurNameLog}/>
               </div>
        
               <div className="input-group mb-3">
                <span className="input-group-text">UserEMail</span>
                <input type="text" className="form-control" required="required" 
                value={userEMail}
                onChange={this.changeUserEMailLog}/>
               </div>
        
               <div className="input-group mb-3">
                <span className="input-group-text">userPassword</span>
                <input type="text" className="form-control" required="required" 
                value={userPassword}
                onChange={this.changeUserPasswordLog}/>
               </div>
        
                {userID==0?
                <button type="button"
                className="btn btn-primary float-start"
                onClick={()=>this.createClickLog()}
                >Kayit Ol</button>
                :null}

                {userID==-1?
                <button type="button"
                className="btn btn-primary float-start"
                onClick={()=>this.checkLoginClick()}
                >Giris Yap</button>
                :null}
           </div>
        
        </div>
        </div> 
        </div>  
        </div>
  );
        }
}