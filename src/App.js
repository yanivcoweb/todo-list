import React, { useState } from 'react';

function App() {
  const [task, setTask] = useState('');// כאן ננהל את המצב של המשימה החדשה
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    console.log('Task added:', task); // בשלב זה פשוט נכתוב את המשימה בקונסול
    if(task){
      setTasks([...tasks,task]); // הוספת המשימה לרשימה
      setTask(''); // ננקה את השדה לאחר ההוספה
    }
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={task}
        onChange={(e)=>setTask(e.target.value)}  // שינוי ערך הקלט
        placeholder="Add a task..." 
      />
      <button onClick={addTask}>Add task</button>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>{t}</li> // הצגת המשימות ברשימה
        ))}
      </ul>
    </div>
  );
}

export default App;
