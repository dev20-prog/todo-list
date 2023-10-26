import { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan, faSave } from "@fortawesome/free-solid-svg-icons";

export default function Task(props) {
  const [editing, setEditing] = useState(false);
  const [editedInput, setEditedInput] = useState("");

  function handleEdit() {
    setEditing(true);
    setEditedInput(props.task);
  }

  function handleSave(id, editedInput) {
    props.saveTask(id, editedInput);
    setEditing(false);
    setEditedInput("");
  }

  function handleMarkDone(checked, id) {
    props.markDone(checked, id);
  }

  return editing === false ? (
    <div className="task-item" key={props.id}>
      <div className="flex-container">
        <input checked={props.done} type="checkbox" onChange={(e)=> handleMarkDone(e.target.checked, props.id)}/>
        <span className={props.done ? "task-done": ""}>{props.task}</span>
      </div>
      <div className="flex-container edit-delete-btns">
        {!props.done && <button title="Edit" onClick={() => handleEdit()}>
          <FontAwesomeIcon icon={faEdit} size="lg"/>
        </button>}
        <button title="Delete" onClick={() => props.deleteTask(props.id)}>
          <FontAwesomeIcon icon={faTrashCan} size="lg"/>
        </button>
      </div>
    </div>
  ) : (
    <div className="task-item" key={props.id}>
      <input
        value={editedInput}
        onChange={(e) => setEditedInput(e.target.value)}
      />
      <button title="Save" onClick={() => handleSave(props.id, editedInput)}>
        <FontAwesomeIcon icon={faSave} size="lg"/>
      </button>
    </div>
  );
}
