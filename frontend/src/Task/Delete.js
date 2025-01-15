import React, { useContext } from 'react';
import axios from 'axios';
import { backend } from '../Variables';
import { MyContext } from '../Context/MyContext';

// Delete component to render a delete button for tasks
export default function Delete({ pk }) {
  const { fetchTasks } = useContext(MyContext);

  // Function to handle delete button click
  const onClickHandler = () => {
    // Send DELETE request to delete the task
    axios.delete(`${backend}update_task/${pk}/`)
      .then(() => fetchTasks()) // Fetch updated tasks after deletion
      .catch(error => console.error(error)); // Log any errors
  };

  return (
    <div>
      {/* Render delete button */}
      <button onClick={onClickHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
      </button>
    </div>
  );
}
