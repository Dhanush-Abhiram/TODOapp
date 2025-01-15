/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './CSS/Form.css';

// Form component for adding and editing tasks
export default function Form({ onSubmitHandler, task, edit, setEditOn }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [formColor, setFormColor] = useState('#f0f4f8'); // Default color

  // Effect to set initial date, time, and form color
useEffect(() => {
  if (task) {
    // Set date and time if task is provided
    const currentDate = new Date();
    const date_ = currentDate.toLocaleDateString(); // Get date in local time zone
    const time_ = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get time in local time zone
    setDate(date_);
    setTime(time_);

    // Update form color based on task priority
    if (edit) {
      switch (task.taskPriority) {
        case 1:
          setFormColor('#ffcccc'); // High priority color
          break;
        case 2:
          setFormColor('#ffffcc'); // Normal priority color
          break;
        case 3:
          setFormColor('#ccffcc'); // Low priority color
          break;
        default:
          setFormColor('#f0f4f8'); // Default color
        
      }
      const now = new Date(task.scheaduleDateTime);
      const date_ = now.toISOString().split('T')[0]; // Get current date in 'yyyy-MM-dd' format
      const time_ = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get current time in local time zone
      setDate(date_);
      setTime(time_);
    }
  } else {
    // Set default date and time if no task is provided
    const now = new Date();
    const date_ = now.toISOString().split('T')[0]; // Get current date in 'yyyy-MM-dd' format
    const time_ = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get current time in local time zone
    setDate(date_);
    setTime(time_);
  }
}, [task, edit]);


// Function to format date in 'yyyy-MM-dd' format
const formatDate = (dateString) => {
  // Check if dateString is valid
  if (!dateString || typeof dateString !== 'string') {
    return '';
  }
  
  // Split dateString into year, month, and day
  const [year, month, day] = dateString.split('-');

  // Check if year, month, and day are valid
  if (!year || !month || !day) {
    return '';
  }

  // Ensure month and day have leading zeros if they are single digits
  const formattedMonth = month.padStart(2, '0');
  const formattedDay = day.padStart(2, '0');
  
  // Return formatted date string
  return `${year}-${formattedMonth}-${formattedDay}`;
};


  // Handler to switch off edit mode
  const onClickHandler = () => {
    setEditOn(false);
  };

  return (
    <div className="form-container" style={{ backgroundColor: formColor }}>
      <form onSubmit={onSubmitHandler}>
        <div className="actions-row">
          {edit && (
            <button onClick={onClickHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </button>
          )}
        </div>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor='input-task'>Task</label>
            <input type='text' id='input-task' name='task' defaultValue={edit ? task.task : ''} />
          </div>
          <div className="input-group">
            <label htmlFor='input-date'>Scheduled Date</label>
            <input type='date' id='input-date' name='scheaduledDate' defaultValue={formatDate(date)} />
          </div>
          <div className="input-group">
            <label htmlFor='input-time'>Time</label>
            <input type='time' id='input-time' name='time' defaultValue={time.slice(0, 5)} />
          </div>
          <div className="input-group">
            <label htmlFor='input-priority'>Priority</label>
            <select name='taskPriority' id='input-priority' defaultValue={edit ? `${task.taskPriority}` : '1'}>
              <option value='1'>High</option>
              <option value='2'>Normal</option>
              <option value='3'>Low</option>
            </select>
          </div>
          <button type="submit" name="action">
            {edit ? (
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
              </div>
            ) : (
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
              </div>
            )}
          </button>
        </div>
        <div className="textarea-row">
          <label htmlFor='input-description'>Description</label>
          <textarea id="input-description" name="taskDescription" defaultValue={edit ? task.taskDescription : ''}></textarea>
        </div>
      </form>
    </div>
  );
}
