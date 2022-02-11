import React from 'react';

import "./index.css";
import TodoListItem from './TodoListItem';

// import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'
class Todo extends React.Component {
    constructor() {
        super()
        this.state = { inputText: "", listItems: [], Jason: [], isEdit: false }
    }


    async componentDidMount() {
        let url = "https://jsonplaceholder.typicode.com/todos";
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData,"parsed data")
        this.setState({ Jason: parsedData })
    }
    eventhandle = (event) => {
        // console.log(event.target.value,"input text")

        this.setState({ inputText: event.target.value })
        // console.log(event.target.value,"hey")
        // console.log(this.state.inputText,"inputtext")
    }
    handleEdit = (e, index, x, value) => {
        // console.log("index", e,value)
        const { Jason, listItems } = this.state
        // console.log("listItems", listItems)
        if (x == "save") {
            //code of save button
            let list = listItems.map((item) => {
console.log("saveItem",item.index,e)
                if (item.index == e) {
                    item.isEdit = false;
                    item.title = value;
                    return item;
                }
                else {
                    return item;
                }
            })
            this.setState({ listItems: list })


        }
        else {

            //code of edit button
            let updatedList = listItems.map((value, ind) => {
                // console.log("event", e, index, "")
                if (value.index == e) {
                    value.isEdit = true;
                    return value;
                }
                else {
                    return value;
                }

            }
            )
            // console.log("updatedlist", updatedList)
            this.setState({ listItems: updatedList })
        }
        // NewEdit= Jason, listItems;

        //  if(this.state.isEdit){
        //      alert(`i am ${this.state.isEdit}`)
        //  }
        //  else{
        //     alert(`i am ${this.state.isEdit}`)
        //     }
    }


    Addition = (e) => {
        e.preventDefault();
        const { listItems } = this.state;
        const inputValue = this.state.inputText;
        
        // console.log(this.state.inputText, "inputText")
        // () => listItems.save(this.state.listItems)
        if (this.state.inputText) {
            const items = [...listItems, { title: inputValue, isEdit: false, index: inputValue }]
            this.setState({ listItems: items, inputText: "" })
            // console.log(listItems, this.state.inputText, "lisitems")
            
        
        console.log("Items", items)
        }
        else {
            alert("Can't take empty")
        }
    }

    Delete = (index, event) => {
        // console.log(event, "event")
        event.preventDefault();
        // console.log(index, "Iam deleted")
        const { listItems } = this.state
        const { Jason } = this.state
        // console.log("Jsonfile", Jason)
        const newJason = Jason
        newJason.splice(index, 1)
        const newList = listItems
        newList.splice(index, 1)
        this.setState({ listItems: newList, inputText: " ", })

    }
    // handleEdit = (index, event) => {
    //     event.preventDefault()
    //     const { listItems, Jason } = this.state
    //     this.setState({ isEdit: true })

    // }
    //   Deletion = () => {

    //         event.preventDefault()
    //         console.log("I am deleted")
    //         const { Jason } = this.state
    //         const JasonList = Jason
    //         JasonList.splice(index, 1)
    //         this.setState({ Jason: JasonList })


    //     }


    // handleEditing = () => {
    //     console.log("edit mode activated")
    //     this.setState({ isEdit: true })
    //   }

    componentWillMount() {
        // load items array from localStorage, set in state
        let itemsList = localStorage.getItem('items')
        if (itemsList) {
          this.setState({
            listItems: JSON.parse(localStorage.getItem('items'))
          })
        }
      }
      componentDidUpdate() {
        // on each update, sync our state with localStorage
        localStorage.setItem('items', JSON.stringify(this.state.listItems))
      }

    render() {
        const { Jason, isEdit } = this.state;
        // console.log("isEdit", this.state.isEdit)
        // console.log("updated", this.state.listItems)
        
        return (

            <div className='Main'>
                <div className='center'>
                    <form>
                        <input type="text" id="input-text-value" value={this.state.inputText} placeholder="Add todo" onChange={this.eventhandle}></input>
                        <button id="btn-Add" onClick={this.Addition} >Add</button>



                    </form>
                    {this.state.listItems.map((data, index) => {
                        return (

                            <TodoListItem

                                id={data.id}
                                title={data.title}
                                user={data.user}
                                completed={data.completed}
                                handleDelete={this.Delete}
                                index={data.index}
                                isEdit={data.isEdit}
                                handleEdit={this.handleEdit}

                            />
                            // <div>
                            //     <p>{data.id}</p>
                            //     <div >
                            //     <h3> {data.title}</h3>
                            //     </div>
                            //     <p>{data.user}</p>
                            //     <p>{data.completed}</p>
                            //     <button id="btn-Del" onClick={(e) => this.Delete(index, e)} >Delete</button>
                            // </div>
                        )
                    })}



                </div>
            </div>
        );
    }

}
export default Todo;