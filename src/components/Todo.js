import React, { useState } from "react";

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    if (input) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const deleteTodo = (i) => {
    const updateTodos = todos.filter((todo, idx) => {
      return idx !== i;
    });
    setTodos(updateTodos);
  };

  const removeAllTodos = () => {
    setTodos([]);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Todo App With React</h1>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="mb-4">
              <label htmlFor="todo" className="form-label">
                <b>✅ Add Todo Here</b>
              </label>
              <form onSubmit={addTodo}>
                <div className="row">
                  <div className="col-md-10 m-auto">
                    <input
                      type="text"
                      id="todo"
                      className="form-control"
                      placeholder="Enter Todo..."
                      maxLength={50}
                      autoFocus
                      autoComplete="off"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 m-auto">
                    <button type="submit" className="btn btn-info">
                      <i style={{ fontSize: "18px" }} className="fa me-1">
                        &#xf1d9;
                      </i>
                      Add Todo
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <div className="container mt-2 mb-1">
        <div className="row">
          <div className="col-md-8 m-auto">
            {todos.length != 0 ? (
              <buton className="btn btn-danger mb-2" onClick={removeAllTodos}>
                <i style={{ fontSize: "18px" }} className="fa me-1">
                  &#xf06d;
                </i>
                Remove All
              </buton>
            ) : null}

            <ul className="list-group">
              {todos.map((todo, idx) => {
                return (
                  <li
                    key={idx}
                    className="mb-2 list-group-item list-group-item-primary d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                      />
                      {todo}
                    </div>

                    <div className="d-flex">
                      <button className="btn btn-warning btn-sm">
                        <i style={{ fontSize: "18px" }} className="fa me-1">
                          &#xf044;
                        </i>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => deleteTodo(idx)}
                      >
                        <i style={{ fontSize: "18px" }} className="fa me-1">
                          &#xf014;
                        </i>
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
