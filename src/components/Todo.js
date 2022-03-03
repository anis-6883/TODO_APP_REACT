import React, { useEffect, useState } from "react";

const getTodos = () => {
  let todos = localStorage.getItem("todos");
  if (todos) {
    return JSON.parse(todos);
  }
  return [];
};

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(getTodos());
  const [toggleBtn, setToggleBtn] = useState(false);
  const [editId, setEditId] = useState(null);

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const manageTodo = (e) => {
    e.preventDefault();

    if (!input) {
      alert("Don't save any empty todo!");
    } else if (input && toggleBtn) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === editId) {
            return { ...todo, title: input };
          }
          return todo;
        })
      );
      setToggleBtn(false);
      setInput("");
      setEditId(null);
    } else {
      let id = `${getRndInteger(100000000000000, 999999999999999)}`;

      const todo = { id, title: input };
      setTodos([...todos, todo]);
      setInput("");
    }
  };

  const editTodo = (id) => {
    const findTodo = todos.find((todo) => {
      return todo.id === id;
    });
    setToggleBtn(true);
    setInput(findTodo.title);
    setEditId(id);
  };

  const deleteTodo = (id) => {
    const updateTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updateTodos);
  };

  const removeAllTodos = () => {
    setTodos([]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
              <form onSubmit={manageTodo}>
                <div className="row">
                  <div className="col-md-10 m-auto">
                    <input
                      type="text"
                      id="todo"
                      className="form-control"
                      placeholder="Enter Todo..."
                      maxLength={70}
                      autoFocus
                      autoComplete="off"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 m-auto">
                    {!toggleBtn ? (
                      <button type="submit" className="btn btn-info">
                        <i style={{ fontSize: "18px" }} className="fa me-1">
                          &#xf1d9;
                        </i>
                        Add Todo
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-warning">
                        <i style={{ fontSize: "18px" }} className="fa me-1">
                          &#xf044;
                        </i>
                        Edit Todo
                      </button>
                    )}
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
            {todos.length !== 0 ? (
              <button className="btn btn-danger mb-2" onClick={removeAllTodos}>
                <i
                  style={{ fontSize: "18px", color: "#000" }}
                  className="fa me-1"
                >
                  &#xf1e2;
                </i>
                Remove All
              </button>
            ) : null}

            <ul className="list-group">
              {todos.map((todo) => {
                return (
                  <li
                    key={todo.id}
                    className="mb-2 list-group-item list-group-item-primary d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                      />
                      {todo.title}
                    </div>

                    <div className="d-flex">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => editTodo(todo.id)}
                      >
                        <i style={{ fontSize: "18px" }} className="fa me-1">
                          &#xf044;
                        </i>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => deleteTodo(todo.id)}
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
