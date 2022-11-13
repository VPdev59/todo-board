import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./Board";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [apiStatus, setApiStatus] = useState({
    isFetching: false,
    isError: false,
  });
  const { isError, isFetching } = apiStatus;
  useEffect(() => {
    setApiStatus((prev) => ({ ...prev, isFetching: true }));

    const fetchData = async () => {
      const result = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      try {
        const data = await result.json();
        setApiStatus((prev) => ({ ...prev, isFetching: false }));

        setTodoList((prev) =>
          data
            .filter((s) => s.userId === 1)
            .map((i) =>
              i.completed ? { ...i, status: "C" } : { ...i, status: "O" }
            )
        );
      } catch (e) {
        setApiStatus({ isError: true, isFetching: false });
      }
    };
    fetchData();
  }, []);

  if (isError)
    return <div className="error error-view">Something went wrong!</div>;
  return (
    <div className="app">
      {isFetching ? (
        "Loading..."
      ) : (
        <>
          <h2>ToDo List{`(${todoList.length})`}</h2>
          {todoList.length && <Board todoList={todoList} />}
        </>
      )}
    </div>
  );
}

export default App;
