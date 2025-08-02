import React, { useState, useEffect } from "react";
import { Task } from "../types";
import classes from "../styles/taskitem.module.scss";
import { useTasks } from "../context/TaskContext";

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [addingSubtask, setAddingSubtask] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const { addTask, fetchSubtasks } = useTasks();
  const [subtasks, setSubtasks] = useState<Task[]>([]);
  const [fetchedSubtasks, setFetchedSubtasks] = useState(false);

  useEffect(() => {
    if (addingSubtask) {
      setSubtaskTitle("");
    }
  }, [addingSubtask]);

  async function addSubtask() {
    await addTask(subtaskTitle, task.id);
    setAddingSubtask(false);
    setSubtasks(await fetchSubtasks(task.id));
  }
  return (
    <div
      className={classes.taskItem}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "0.75rem",
        margin: "0.5rem 0",
        backgroundColor: task.parentId ? "#f9f9f9" : "#fff",
        marginLeft: task.parentId ? "2rem" : "0",
      }}
    >
      <div className={classes.taskItemContent}>
        <div className={classes.taskItemTitle}>
          <strong>{task.title}</strong>
        </div>
        {fetchedSubtasks && (
          <button onClick={() => setAddingSubtask((s) => !s)}>
            {addingSubtask ? "X" : "Add Subtask"}
          </button>
        )}
        {addingSubtask && (
          <input
            onChange={(e) => setSubtaskTitle(e.target.value)}
            type="text"
            value={subtaskTitle}
          />
        )}
        {addingSubtask && (
          <button
            disabled={subtaskTitle.trim().length === 0}
            onClick={addSubtask}
          >
            Submit
          </button>
        )}
        {!fetchedSubtasks && (
          <button
            onClick={async () => {
              const fetchedSubtasks = await fetchSubtasks(task.id);
              setFetchedSubtasks(true);
              setSubtasks(fetchedSubtasks);
            }}
          >
            +
          </button>
        )}
      </div>
      {subtasks.length > 0 && (
        <div className={classes.subtasks}>
          <ul>
            {subtasks.map((subtask, i) => (
              <li key={i}>
                <i>{subtask.title}</i>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
