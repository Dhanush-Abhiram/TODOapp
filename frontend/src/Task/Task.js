import React, { useContext, useState } from 'react';
import EditButton from './EditButton';
import Delete from './Delete';
import Form from '../Form';
import axios from 'axios';
import { backend } from '../Variables';
import { MyContext } from '../Context/MyContext';
import '../CSS/Task.css';

// Task component to display and manage individual tasks
export default function Task({ task }) {
  const { fetchTasks } = useContext(MyContext);
  const [editOn, setEditOn] = useState(false);

  // Handler to mark task as done
  const onClickDone = () => {
    const { id, ...formObject } = task;
    formObject.taskDone = true;
    updateTask(id, formObject, false);
  };

  // Handler to submit form for editing task
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    
    form.forEach((value, key) => {
      if (key === 'taskPriority') {
        task[key] = parseInt(value);
      } else if (key === 'scheaduledDate' || key === 'time') {
        const dateValue = form.get('scheaduledDate');
        const timeValue = form.get('time');
        task['scheaduleDateTime'] = `${dateValue}T${timeValue}`;
      } else {
        task[key] = value;
      }
      
    });
    const { id, ...formObject } = task;
    updateTask(id, formObject, true);
  };

  // Function to update task
  const updateTask = (id, formObject, done) => {
    axios
      .put(`${backend}update_task/${id}/`, formObject)
      .then(() => {
        if (done) {
          setEditOn((prev) => !prev);
        }
      })
      .then(() => fetchTasks())
      .catch((error) =>
        console.error(JSON.stringify(task), `${backend}update_task/${task.id}/`)
      );
  };

  // Function to get priority class name based on task priority
  const getPriorityClassName = () => {
    switch (task.taskPriority) {
      case 1:
        return 'task-priority-high';
      case 2:
        return 'task-priority-normal';
      case 3:
        return 'task-priority-low';
      default:
        return 'task-priority-low'; // Default class if priority is not specified
    }
  };

  return (
    <div className="tasks-container">
      <div>
        {editOn ? (
          <Form onSubmitHandler={onSubmitHandler} task={task} edit={editOn} setEditOn={setEditOn} />
        ) : (
          <div className={`task-container ${getPriorityClassName()}`}>
            <div className="task-details">
              <div className="task-content">
                <h3 className={`task-title ${getPriorityClassName()}`}>
                  {task.task.length > 35 ? task.task.substring(0, 32) + '...' : task.task}
                </h3>
                <p className={`task-description ${getPriorityClassName()}`}>
                  {task.taskDescription.length > 35 ? task.taskDescription.substring(0, 32) + '...' : task.taskDescription}
                </p>
              </div>
              <div className="task-buttons">
                <button onClick={onClickDone}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                  </svg>
                </button>
                <EditButton pk={task.id} setEditOn={setEditOn} />
                <Delete pk={task.id} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
