import React, { useState } from 'react';

function TaskPage() {
  const [tasks, setTasks] = useState([]); 

  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Add new task
  const handleAddTask = () => {
    if (taskName.trim() && dueDate) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        dueDate: dueDate,
        priority: priority,
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setDueDate('');
      setPriority('Medium');
    }
  };

  // Handlers for task actions
  const handleComplete = (id) => {
    alert('Task completed: ' + tasks.find(t => t.id === id)?.name);
  };
  const handleEdit = (task) => {
    alert('Edit task: ' + task.name);
  };
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="page-box">
      <h1 className="page-title">Task List</h1>

      {/* Add Task Form */}
      <div className="section-box">
        <h3>Add New Task</h3>
        <label>Task Name</label>
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button style={{ marginTop: '10px' }} className="primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div style={{ marginTop: '20px' }}>
        <h3>My Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item-box" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <div>
                <strong>{task.name}</strong>
                <div>Due: {task.dueDate}</div>
                <div>Priority: {task.priority}</div>
              </div>
              <div className="task-buttons" style={{ display: 'flex', gap: '10px' }}>
                <button className="secondary" onClick={() => handleComplete(task.id)}>Complete</button>
                <button className="secondary" onClick={() => handleEdit(task)}>Edit</button>
                <button className="secondary" onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskPage;