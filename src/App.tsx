import { Desktop } from './components/Desktop';
import { TaskBar } from './components/TaskBar';

function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden select-none">
      <Desktop />
      <TaskBar />
    </div>
  );
}

export default App;
