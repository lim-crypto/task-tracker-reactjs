import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import Footer from "./components/Footer";
import About from './components/About';
import EditTask from './components/EditTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    // console.log(data);
    return data;
  }

  const newTask = () => {
    setShowAddTask(!showAddTask)
    setShowEditTask(false)
  }

  // Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const id = tasks.length + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  }
  //editTask
  const editTask = async (id) => {
    setShowAddTask(false);
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    console.log(data);
    setTask(data);
    setShowEditTask(true);

  }
  // Update Task
  const updateTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setTasks(tasks.map((task) => task.id === data.id ? { ...task, text: data.text, completed: data.completed } : task));
    setShowEditTask(false);
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id))
  }
  // toggle
  const toggle = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    const updTask = { ...data, completed: !data.completed };
    const res2 = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });

    const data2 = await res2.json();
    setTasks(tasks.map((task) => task.id === id ? { ...task, completed: data2.completed } : task));

    // setTasks(tasks.map((task) => task.id === id ?
    //   { ...task, completed: !task.completed } : task))
  }
  return (
    <Router>
      <div className="container">
        <Header text="Task Tracker"
          newTask={newTask}
          showAdd={showAddTask}
        />


        <Routes>
          <Route
            path='/'
            element={<>
              {showAddTask && <AddTask onAdd={addTask} />}
              {showEditTask && <EditTask task={task} onUpdate={updateTask} />}

              {tasks.length > 0 ?
                <Tasks tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggle}
                  onEdit={editTask} />
                : 'No tasks to show'}

            </>
            }
          />

          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
