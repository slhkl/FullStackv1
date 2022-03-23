import React,{Component} from 'react';
import {variables} from './Variables.js';

import {NavLink} from 'react-router-dom';

export class userAPI extends Component{

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
            uAID:-1
        }
    }


    refreshListuA(){
        fetch(variables.API_URL+'userAPI')
        .then(response=>response.json())
        .then(data=>{
            this.setState({userList:data});
        });
    }

    componentDidMount(){
        this.refreshListuA();
    }
    
    changeUserNameuA =(e)=>{
        this.setState({userName:e.target.value});
    }

    changeUserSurNameuA =(e)=>{
        this.setState({userSurName:e.target.value});
    }

    changeUserEMailuA =(e)=>{
        this.setState({userEMail:e.target.value});
    }

    changeUserPassworduA =(e)=>{
        this.setState({userPassword:e.target.value});
    }

    addClickuA(){
        this.setState({
            modalTitle:"Kullanici Ekle",
            userID:0,
            userName:"",
            userSurName:"",
            userEMail:"",
            userPassword:"",
            uAID:0
        });
    }

    editClickuA(uA){
        this.setState({
            modalTitle:"Kullanici Duzenle",
            userID:uA.userID,
            userName:uA.userName,
            userSurName:uA.userSurName,
            userEMail:uA.userEMail,
            userPassword:uA.userPassword,
            uAID:1
        });
    }

    createClickuA(){
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
            this.refreshListuA();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClickuA(){
        fetch(variables.API_URL+'userAPI',{
            method:'PUT',
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
            alert(result);
            this.refreshListuA();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClickuA(id){
        if(window.confirm('Emin misin?')){
        fetch(variables.API_URL+'userAPI/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshListuA();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            userList,
            modalTitle,
            userName,
            userSurName,
            userEMail,
            userPassword,
            userID,
            uAID
        }=this.state;

        return(
<div>
<nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
        </ul>
      </nav>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClickuA()}>
        Kullanici Ekle
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            userID
        </th>
        <th>
            userName
        </th>
        <th>
            userSurName
        </th>
        <th>
            userEMail
        </th>
        <th>
            Options
        </th> 
    </tr>
    </thead>
    <tbody>
        {userList.map(uA=>
            <tr key={uA.userID}>
                <td>{uA.userID}</td>
                <td>{uA.userName}</td>
                <td>{uA.userSurName}</td>
                <td>{uA.userEMail}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClickuA(uA)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClickuA(uA.userID)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

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
        onChange={this.changeUserNameuA}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">UserSurName</span>
        <input type="text" className="form-control" required="required" 
        value={userSurName}
        onChange={this.changeUserSurNameuA}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">UserEMail</span>
        <input type="text" className="form-control" required="required" 
        value={userEMail}
        onChange={this.changeUserEMailuA}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">userPassword</span>
        <input type="text" className="form-control" required="required" 
        value={userPassword}
        onChange={this.changeUserPassworduA}/>
       </div>

        {uAID==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClickuA()}
        >Ekle</button>
        :null}

        {uAID!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClickuA()}
        >Guncelle</button>
        :null}

   </div>

</div>
</div> 
</div>


</div>
        )
    }
}