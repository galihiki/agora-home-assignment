import { useState, type ChangeEvent } from "react";
import "./TodoList.scss";

export default function TodoList() {
  const [todoList, setTodoList] = useState<string[]>([
    "key",
    "new",
    "test",
    "list",
  ]);
  const [todoContent, setTodoContent] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [editingItemIndex, setEditingItemIndex] = useState<number>(-1);

  function addTodoItem() {
    if (!todoContent) return;
    setTodoList([...todoList, todoContent]);
    setTodoContent("");
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setTodoContent(event.target.value);
  }
  function deleteItem(index: number) {
    const newArray = [...todoList];
    newArray.splice(index, 1);
    setTodoList(newArray);
  }

  function editItem(index: number) {
    setEditContent(todoList[index]);
    setEditingItemIndex(index);
  }

  function saveEditItem(index: number) {
    const newArray = [...todoList];
    newArray[index] = editContent;
    setTodoList(newArray);
    setEditingItemIndex(-1);
  }

  function handleEditChange(event: ChangeEvent<HTMLInputElement>) {
    setEditContent(event.target.value);
  }

  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {todoList.map((todoItem, index) => {
          return (
            <li key={index}>
              <div className="item-container">
                {editingItemIndex !== index ? (
                  <div className="title">{todoItem}</div>
                ) : (
                  <input
                    type="text"
                    value={editContent}
                    onChange={handleEditChange}
                    className="title"
                  />
                )}
                <div className="actions">
                  <button className="action" onClick={() => deleteItem(index)}>
                    Delete
                  </button>
                  {editingItemIndex == -1 ? (
                    <button className="action" onClick={() => editItem(index)}>
                      Edit
                    </button>
                  ) : (
                    <button
                      className="action"
                      onClick={() => saveEditItem(index)}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="actions">
        <div>
          <input type="text" value={todoContent} onChange={handleInputChange} />
          <button className="action" onClick={addTodoItem}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
