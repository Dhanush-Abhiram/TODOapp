import { useState } from "react";
import axios from 'axios';
import {backend} from '../Variables'; // Importing backend URL from Variables file
import { MyContext } from "./MyContext";

// This component defines a context provider to manage tasks state and fetch tasks data.
export const MyProvider = ({children}) =>{

    // State to store tasks data
    const [tasks,setTasks] = useState({});

    // Function to fetch tasks data from the backend
    const fetchTasks = ()=>{
        axios.get(backend+'task_today/') // Fetching tasks from backend using the provided URL
        .then(response => setTasks(response.data)) // Setting tasks data to state upon successful fetch
        .catch(error => console.error(error)); // Handling error if fetch fails
    }

    // Rendering the context provider with the tasks state and fetchTasks function as value
    return(
        <MyContext.Provider value={{tasks,setTasks,fetchTasks}}>
            {children}
        </MyContext.Provider>
    );
}
