import React, { useState } from 'react';


export default function TodoListItem(props) {
    const  [value,setState] =useState(props.title)
    const {id,title,user,completed,handleDelete,index,isEdit,handleEdit,handleSave}= props
  // console.log("isEdit",isEdit)
  console.log("value",value)
 const  updateInputValue=(evt)=> {
    const val = evt.target.value;
    console.log("update",val)
    setState(val)
    }
    
    
    
  return (
    <div>
        
            {/* {isEdit?<EditTodo/>: <div>    */}
    <p>{id}</p>
    
    
    {isEdit?(<input value={value} onChange={evt =>updateInputValue(evt)} />):(<h3> <li>{title}</li></h3>)}
    <p>{user}</p>
    <p>{completed}</p>
    <button id="btn-Del" onClick={(e) => handleDelete(index, e)} >Delete</button>
    <button id="btn-Edit"onClick={(e) => handleEdit(index, e)}>Edit</button>
    <button id ="btn-save" onClick={(e) => handleEdit(index,e,"save",value)}>Save</button>
    </div> 
   

  )
}





