import React from "react";

const ToDoList = (props) => {
  const { items, status, dropHandler, allowDropHandler, dragStartHandler } =
    props;

  return (
    <div className={status} onDrop={dropHandler} onDragOver={allowDropHandler}>
      <h3>{`${status}(${items.length})`}</h3>
      {items.map((todo) => (
        <div
          id={todo.id}
          draggable
          className="item"
          key={`${status}-${todo.id}`}
          onDragStart={dragStartHandler}
        >
          {todo.title}
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
