import React, { useState } from 'react';

function App() {
  const [lists, setLists] = useState([]); // ניהול רשימה של רשימות
  const [listName, setListName] = useState(''); // שם הרשימה החדשה
  const [taskInputs, setTaskInputs] = useState({}); // שדות קלט למשימות

  // הוספת רשימה חדשה (מוסיפה לראש הרשימה)
  const addList = () => {
    if (listName.trim() !== '') {
      setLists([{ name: listName, tasks: [] }, ...lists]); // הוספת הרשימה לראש המערך
      setListName(''); // ניקוי השדה
    }
  };

  // מחיקת רשימה
  const deleteList = (listIndex) => {
    const updatedLists = lists.filter((_, index) => index !== listIndex); // מסנן את הרשימה הרצויה
    setLists(updatedLists);
  };

  // עדכון שדה קלט של משימה עבור רשימה מסוימת
  const handleTaskInputChange = (listIndex, value) => {
    setTaskInputs({ ...taskInputs, [listIndex]: value }); // מעדכן את הקלט עבור הרשימה הספציפית
  };

  // הוספת משימה לרשימה מסוימת (מוסיפה לראש הרשימה)
  const addTask = (listIndex) => {
    const task = taskInputs[listIndex]; // לוקח את הטקסט מהקלט של הרשימה
    if (task && task.trim() !== '') {
      const updatedLists = [...lists];
      updatedLists[listIndex].tasks.unshift({ text: task, completed: false }); // הוספת המשימה לראש המערך
      setLists(updatedLists);
      setTaskInputs({ ...taskInputs, [listIndex]: '' }); // מנקה את הקלט של המשימה
    }
  };

  // מחיקת משימה מרשימה מסוימת
  const deleteTask = (listIndex, taskIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].tasks = updatedLists[listIndex].tasks.filter((_, index) => index !== taskIndex); // מסנן את המשימה הרצויה
    setLists(updatedLists);
  };

  // שינוי סטטוס המשימה (בוצעה/לא בוצעה)
  const toggleTaskStatus = (listIndex, taskIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].tasks[taskIndex].completed = !updatedLists[listIndex].tasks[taskIndex].completed; // החלפת הסטטוס
    setLists(updatedLists);
  };

  return (
    <div className="App">
      <h1>To-Do Lists</h1>

      {/* הוספת רשימה חדשה */}
      <div>
        <input
          type="text"
          placeholder="Add new list..."
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button onClick={addList}>Add List</button>
      </div>

      {/* הצגת רשימות ומשימות */}
      <div>
        {lists.map((list, listIndex) => (
          <div key={listIndex} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>{list.name}</h2>
              <button onClick={() => deleteList(listIndex)} style={{ color: 'red' }}>
                Delete List
              </button>
            </div>

            {/* הוספת משימה */}
            <div>
              <input
                type="text"
                placeholder="Add a task..."
                value={taskInputs[listIndex] || ''} // אם אין ערך, ברירת מחדל היא מחרוזת ריקה
                onChange={(e) => handleTaskInputChange(listIndex, e.target.value)}
              />
              <button onClick={() => addTask(listIndex)}>Add Task</button>
            </div>

            {/* הצגת משימות */}
            <ul>
              {list.tasks.map((task, taskIndex) => (
                <li
                  key={taskIndex}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textDecoration: task.completed ? 'line-through' : 'none', // עיצוב לפי סטטוס המשימה
                  }}
                >
                  {task.text}
                  <div>
                    <button onClick={() => toggleTaskStatus(listIndex, taskIndex)}>
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button onClick={() => deleteTask(listIndex, taskIndex)} style={{ color: 'red' }}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
