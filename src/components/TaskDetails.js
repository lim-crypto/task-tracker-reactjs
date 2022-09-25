import { useState, useEffect } from "react"
// import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
const TaskDetails = () => {

    const [task, setTask] = useState({});
    const [error, setError] = useState(null);

    const params = useParams();
    const navigate = useNavigate();
    // Fetch Task
    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch(`http://localhost:5000/tasks/${params.id}`);
            const data = await res.json();

            if (res.status == 404) {
                // setError("Task not found");
                // navigate('/404');
                navigate('/');
            }

            setTask(data);

        }
        fetchTasks();
    }, [params.id])

    // if(error) {
    //     // <Redirect to="/not-found" />
    //     return <Navigate to="/" />
    // }

    return (
        <div className={`task ${task.completed ? 'reminder' : ''}`}
        >
            <h3>{task.text} </h3>
        </div>
    )
}


export default TaskDetails