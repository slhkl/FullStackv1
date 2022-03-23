import React,{Component} from 'react';
import {variables} from './Variables.js';

import {NavLink} from 'react-router-dom';

export class toDoAPI extends Component{

    constructor(props){
        super(props);

        this.state={
            userList:[],
            toDoList:[],
            modalTitle:"",
            toDoID:0,
            toDoText:"",
            userEMail:""
        }
    }

    refreshList(){

        fetch(variables.API_URL+'toDoAPI')
        .then(response=>response.json())
        .then(data=>{
            this.setState({toDoList:data});
        });

        fetch(variables.API_URL+'userAPI')
        .then(response=>response.json())
        .then(data=>{
            this.setState({userList:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeToDoText =(e)=>{
        this.setState({toDoText:e.target.value});
    }
    changeEMail =(e)=>{
        this.setState({userEMail:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Yapilacak is ekle",
            toDoID:0,
            toDoText:"",
            userEMail:""
        });
    }
    editClick(td){
        this.setState({
            modalTitle:"İs Düzenle",
            toDoID:td.toDoID,
            toDoText:td.toDoText,
            userEMail:td.userEMail
        });
    }

    createClick(){
        fetch(variables.API_URL+'toDoAPI',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                toDoText:this.state.toDoText,
                userEMail:this.state.userEMail
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'toDoAPI',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                toDoID:this.state.toDoID,
                toDoText:this.state.toDoText,
                userEMail:this.state.userEMail
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Emin misin?')){
        fetch(variables.API_URL+'toDoAPI/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }


    render(){
        const {
            userList,
            toDoList,
            modalTitle,
            toDoID,
            toDoText,
            userEMail
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
    onClick={()=>this.addClick()}>
        İs Ekle
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            Is ID
        </th>
        <th>
            Yapilacak İs
        </th>
        <th>
            Kullanici EMail
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {toDoList.map(td=>
            <tr key={td.toDoID}>
                <td>{td.toDoID}</td>
                <td>{td.toDoText}</td>
                <td>{td.userEMail}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(td)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(td.toDoID)}>
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
     
     <div className="p-2 w-100 bd-highlight">
    
        <div className="input-group mb-3">
            <span className="input-group-text">Yapilacak İs</span>
            <input type="text" className="form-control" required="required" 
            value={toDoText}
            onChange={this.changeToDoText}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">UserEMail</span>
            <select className="form-select" required="required" 
            onChange={this.changeEMail}
            value={userEMail}>
                {userList.map(uA=><option key={uA.userID}>
                    {uA.userEMail}
                </option>)}
            </select>
        </div>
     
    </div>

    {toDoID==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Ekle</button>
        :null}

        {toDoID!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
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