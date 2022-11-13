import React, { useEffect, useState } from "react";
import ToDoList from "./todoList";

const Board = (props) => {
  const { todoList } = props;
  const [allItems, setAllItems] = useState(todoList);
  const [openItems, setOpenItems] = useState([]);
  const [inprogressItems, setInprogressItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const dragStart = (e) => {
    e.dataTransfer.setData("item", e.target.id);
  };
  const drop = (e) => {
    const draggedItem = e.dataTransfer.getData("item");
    const selected = allItems.find((i) => i.id === Number(draggedItem));
    if (e.target.className === "Open") selected.status = "O";
    else if (e.target.className === "Inprogress") selected.status = "P";
    else if (e.target.className === "Completed") selected.status = "C";

    setAllItems((prev) => [
      ...prev.filter((s) => s.id !== selected.id),
      selected,
    ]);
  };

  useEffect(() => {
    setCompletedItems(allItems.filter((item) => item.status === "C"));
    setInprogressItems(allItems.filter((item) => item.status === "P"));
    setOpenItems(allItems.filter((item) => item.status === "O"));
  }, [allItems]);

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="board">
      <ToDoList
        items={openItems}
        status="Open"
        dropHandler={drop}
        allowDropHandler={allowDrop}
        dragStartHandler={dragStart}
      />
      <ToDoList
        items={inprogressItems}
        status="Inprogress"
        dropHandler={drop}
        allowDropHandler={allowDrop}
        dragStartHandler={dragStart}
      />
      <ToDoList
        items={completedItems}
        status="Completed"
        dropHandler={drop}
        allowDropHandler={allowDrop}
        dragStartHandler={dragStart}
      />
    </div>
  );
};

export default Board;
