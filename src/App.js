import { useEffect, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Task from "./Components/Task";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("toDoList")) || []
  );
  const [msg, setMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(list));
  }, [list]);

  function addTask() {
    if (input === "") {
      setMsg("Please enter a task");
    } else {
      setList((prevList) => {
        return [
          ...prevList,
          {
            id: nanoid(),
            task: input,
            done: false,
          },
        ];
      });
      setInput("");
      setMsg("");
    }
  }

  function saveTask(editedTaskId, editedTask) {
    setList((prevList) =>
      prevList.map((prevTask) => {
        if (prevTask.id === editedTaskId) {
          return {
            ...prevTask,
            task: editedTask,
          };
        } else {
          return {
            ...prevTask,
          };
        }
      })
    );
  }

  function deleteTask(taskId) {
    setList((prevList) => prevList.filter((task) => task.id !== taskId));
  }

  function markDone(checked, taskId) {
    setList((prevList) =>
      prevList.map((prevTask) => {
        if (prevTask.id === taskId) {
          return {
            ...prevTask,
            done: checked,
          };
        } else {
          return {
            ...prevTask,
          };
        }
      })
    );
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
      <p className="msg">{msg}</p>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter your task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button title="Add" onClick={addTask}>
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
      </div>
      {list.length > 0 && (
        <div className="to-do-list">
          {list.map((listItem) => (
            <Task
              key={listItem.id}
              id={listItem.id}
              task={listItem.task}
              done={listItem.done}
              deleteTask={deleteTask}
              saveTask={saveTask}
              markDone={markDone}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
