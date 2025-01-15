import './App.css';
import Home from './Home';
import TodayTasks from './TodayTasks';
import { MyProvider } from './Context/MyProvider'; // Importing the MyProvider context provider

// Main component rendering the application
function App() {
  return (
    <MyProvider> {/* Wrapping the components with MyProvider context provider */}
      <div>
        <Home />
        <TodayTasks />
      </div>
    </MyProvider>
  );
}

export default App;
