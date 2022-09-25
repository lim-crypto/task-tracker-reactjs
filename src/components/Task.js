import { FaTimes, FaPen } from 'react-icons/fa'

// import { Link } from 'react-router-dom';

const Task = ({ task, onDelete, onToggle, onEdit }) => {
    return (
        <div className={`task ${task.completed ? 'reminder' : ''}`}
            onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text}
                <div>
                    {/* <Link to={`/edit/${task.id}`} ><FaPen /></Link> */}
                    <FaPen onClick={() => onEdit(task.id)} />
                    &nbsp;
                    <FaTimes
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => onDelete(task.id)}
                    />

                </div>
            </h3>
            {/* <p><Link to={`/TaskDetails/${task.id}`} >View Details</Link></p> */}

        </div>
    )
}
export default Task
