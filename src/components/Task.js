import React, { useState } from "react";
import "./App.css";

export default function Task(props) {
  const { addTask, deleteTask, moveTask, task } = props;

  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
  const [collapsed, setCollapsed] = useState(task.isCollapsed);
  const [formAction, setFormAction] = useState("");

  function setUrgency(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formAction === "save") {
      let newTask = {
        id: task.id,
        title: event.target.elements.title.value,
        description: event.target.elements.description.value,
        urgency: urgencyLevel,
        status: task.status,
        isCollapsed: true
      };

      addTask(newTask);
      setCollapsed(true);
    }
    if (formAction === "delete") {
      deleteTask(task.id);
    }
  }

  function handleMoveLeft() {
    let newStatus = "";

    if (task.status === "In Progress") {
      newStatus = "To Do";
    } else if (task.status === "Review") {
      newStatus = "In Progress";
    } else if (task.status === "Done") {
      newStatus = "Review";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  function handleMoveRight() {
    let newStatus = "";

    if (task.status === "To Do") {
      newStatus = "In Progress";
    } else if (task.status === "In Progress") {
      newStatus = "Review";
    } else if (task.status === "Review") {
      newStatus = "Done";
    }
    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        padding: "5px",
        borderRadius: "3%"
      }}
    >
      <button onClick={handleMoveLeft} className="button moveTask">
        &#171;
      </button>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "12em", height: "3em", marginBottom: "15px" }}
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.title}
        />
        <textarea
          style={{ float: "right", height: "4em", width: "16em" }}
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description}
        />
        <div className="urgencyLabels">
          <label style={{ fontWeight: urgencyLevel === "Task" ? "bold" : "" }}>
            <input
              urgency="Task"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            Task
          </label>
          <label style={{ fontWeight: urgencyLevel === "Bug" ? "bold" : "" }}>
            <input
              urgency="Bug"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            Bug
          </label>
          <label
            style={{ fontWeight: urgencyLevel === "Feature" ? "bold" : "" }}
          >
            <input
              urgency="Feature"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            Feature
          </label>
        </div>
        <button
          onClick={() => {
            setFormAction("save");
          }}
          className="button"
        >
          {collapsed ? "" : "Save"}
        </button>
        {collapsed && (
          <button
            onClick={() => {
              setFormAction("delete");
            }}
            className="button delete"
          >
            X
          </button>
        )}
      </form>
      <button onClick={handleMoveRight} className="button moveTask">
        &#187;
      </button>
    </div>
  );
}
