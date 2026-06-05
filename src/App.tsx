import { Desktop } from './components/Desktop';
import { TaskBar } from './components/TaskBar';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden select-none">
      <Desktop />
      <TaskBar />
    </div>
  );
}

export default App;
