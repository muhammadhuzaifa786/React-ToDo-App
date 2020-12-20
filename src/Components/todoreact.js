import React from 'react'
import '../css/style.css'
import firebase from '../Config/firebase.js'
class Todoreact extends React.Component{

    constructor(){
        super()
        this.state={
            todoes:[],
            task:'',
            time:'',
            edit_task:'',
            edit_title:''
        }
    }
    componentDidMount() {
        const userRef = firebase.database().ref('/').child("todoes");
        userRef.on('value', (snapshot) => {
        let newUsersState = [];
        snapshot.forEach(data => {
            const dataVal = data.val()
            newUsersState.push({
            key: data.key,
            task: dataVal.task,
            time: dataVal.time,
            edit:false
            })
        })
        this.setState({
            todoes:newUsersState,
          })

        })
    }
      
    

    addTask = () => {
        let obj = {task: this.state.task, time:this.state.time} 
        firebase.database().ref('/').child("todoes").push(obj)
        this.setState({
            todoes:[...this.state.todoes,obj],
            task:'',
            time:''
        })
    }

    deleteAll = () =>{
        firebase.database().ref('/').remove();
    }
    
    editTask = (e) =>{
        this.state.todoes[e].edit = true;
        this.setState({
            todoes:this.state.todoes
        })
    }

    saveTask = (e,key) =>{
        this.state.todoes[e].edit = false;
        let newTask = this.state.todoes[e].task
        let newTime = this.state.todoes[e].time
        firebase.database().ref('/').child("todoes/"+key).set({
            task:newTask,
            time:newTime
        })
        this.setState({
            todoes:this.state.todoes
        })
    }

    deleteTask = (e,key) =>{


        console.log(e,key)
        firebase.database().ref('/').child("todoes/"+key).remove();
        this.state.todoes.splice(e,1);
        this.setState({
            todoes:this.state.todoes
        })
    }

    handleTask = (e,i,key) =>{
        console.log(e.target.value,i)
        console.log(e.target.value,i)
        this.state.todoes[i].task = e.target.value;
        
    }

    handleTime = (e,i,key) =>{
        console.log(e.target.value,i)
        this.state.todoes[i].time = e.target.value
        
    }

    
    
    render(){
        let {todoes,task,time} = this.state;
        return(
            <div className="bg-maroon">                                
                <h1 className="mt-5 mb-5">TODO APPLICATION</h1>

                <div>

                    Enter Your Task
                    <br/>
                    <input type="text" id="task" value={task} onChange={(e)=> this.setState({task:e.target.value})} className="form-control" placeholder="Enter Your Task" required/>
                    <br/><br/> Enter Your Time
                    <br/>
                    <input type="time" id="time" value={time} onChange={(e)=> this.setState({time:e.target.value})} className="form-control" placeholder="Enter Your Task Time" required/>
                </div>
                <br/>
                <div>
                    <button id="addTask" className="button" onClick={this.addTask}>Add To List</button>
                    <button id="deleteAll" className="button" onClick={this.deleteAll}>Delete All</button>
                </div>
                <br/><br/>
                {/* <div>

                    <p id="nothing">You Did Not Add Any Thing Yet In Todo List</p>

                </div> */}
                <div id="main" className="table-responsive">


                    <table id="list">
                        <thead id="thead">
                            <tr>
                            <th style={{display:'none'}}>Key</th>
                            <th>Task</th>
                            <th>Time</th>
                            <th>Edit / Save</th>
                            <th>Delete</th>
                            </tr>
                            
                        </thead>
                        
                        <tbody>
                            {/* {firebase.database().ref('/').child("todoes").on('value',function(snapshot){
                                if (snapshot.exists()) {
                                    var content = '';
                                    snapshot.forEach(function(data) {
                                        var val = data.val();
                                        return <tr>
                                        <td>{data.key}</td>
                                        <td>{val.task}</td>
                                        <td>{val.time}</td>
                                    </tr>
                                    });
                        
                                    
                                } else {
                                    alert("No Data Found");
                                }
                            })} */}
                            {todoes.map((v,i) => {
                                return <tr key={i}>
                                        <td style={{display:'none'}}>{v.key}</td>
                                        <td>{v.edit? <input type="text" placeholder={v.task} onChange={(e)=>this.handleTask(e,i,v.key)} /> : v.task}</td>
                                        <td>{v.edit? <input type="text" placeholder={v.time} onChange={(e)=>this.handleTime(e,i,v.key)} /> : v.time}</td>
                                        <td>{v.edit? <button id="saveBtn" className="save_button button" onClick={()=>this.saveTask(i,v.key)}>Save</button> : <button id="editBtn" className="edit_button button" onClick={()=>this.editTask(i)}>Edit</button>}</td>
                                        <td><button id="dltBtn" className="delete_button button" onClick={()=>this.deleteTask(i,v.key)}>Delete</button></td>
                                    </tr>
                               
                            })} 
                        </tbody>

                    </table>



                </div>



            </div>
        )
    }
}

export default Todoreact;