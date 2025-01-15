import React, { useContext } from 'react';
import axios from 'axios';
import { backend } from './Variables';
import { MyContext } from './Context/MyContext';
import Form from './Form';

// Home component for adding new tasks
export default function Home() {
  const { fetchTasks } = useContext(MyContext);

  // Function to handle form submission
  const onSubmitHandling = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formObject = {};

    // Iterating through form data to build form object
    data.forEach((value, key) => {
      if (key === 'taskPriority') {
        formObject[key] = parseInt(value);
      } else if (key === 'scheaduledDate' || key === 'time') {
        const dateValue = data.get('scheaduledDate');
        const timeValue = data.get('time');
        formObject['scheaduleDateTime'] = `${dateValue}T${timeValue}`;
      } else {
        formObject[key] = value;
      }
    });

    formObject.taskDone = false;

    // Sending post request to add task
    axios.post(backend + 'add_task/', formObject)
      .then(() => fetchTasks())
      .catch(error => console.log(error, JSON.stringify(formObject)));
  };

  return (
    <div>
      {/* Rendering the Form component and passing the onSubmitHandling function */}
      <Form onSubmitHandler={onSubmitHandling} editOn={false} />
    </div>
  );
}
