import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");

    const [todoEditing, setToDoEditing] = useState(null);
    const [editingText, setEditingText] = useState("");

    React.useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
          setTodos(loadedTodos);
        }
      }, []);
    
      React.useEffect(() => {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
      }, [todos]);

    // Add the handlesubmit code here

    const handlesubmit = event => {
        event.preventDefault();

        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false,
        };

        if (newTodo.text.length > 0) {
            setTodos([...todos].concat(newTodo));
            setTodo("");
        }
        else {
            alert("Enter valid Task!!");
            setTodo("");
        }
    }

    // Add the deleteToDo code here

    const deleteHandler = id => {
        let filtered = [...todos].filter((te) => {
            return te.id !== id;
        });
        setTodos(filtered);
    }

    // Add the toggleComplete code here

    const toggleCompleted = id => {
        let updated = [...todos].map((todo) => {
            if(todo.id === id){
                todo.completed =!todo.completed;
            }
            return todo;
        });
        setTodos(updated);
    }


    // Add the submitEdits code here

    const submitEdits = id =>{
        const updated = [...todos].map((todo) =>{
            if(todo.id === id){
                todo.text = editingText;
            }
            return todo;
        });

        setTodos(updated);
        setToDoEditing(null);
    }


    return (
        <div id="todo-list" className="App">
            <h1>Todo List</h1>
            <form onSubmit={handlesubmit}>
                <input type="text" align="center" onChange={(e) => setTodo(e.target.value)} placeholder="Add a new Task" value={todo} />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo.id)}
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setToDoEditing(todo.id)}>Edit</button>
                )}
    
                <button onClick={() => deleteHandler(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      );
    };
export default App;