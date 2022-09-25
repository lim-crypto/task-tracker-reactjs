import Task from './Task'
const Tasks = ({ tasks, onDelete, onToggle, onEdit }) => {

    return (
        <>
            {tasks.map((task, index) => (
                <Task
                    task={task}
                    key={index}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onEdit={onEdit}
                />
            ))}
        </>
    )
}

export default Tasks