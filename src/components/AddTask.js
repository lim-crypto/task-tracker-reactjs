import { useState } from 'react'

const AddTask = ({onAdd}) => {

    const [text, setText] = useState('');
    const [completed, setCompleted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            alert('Please add a task');
            return;
        }
        onAdd({ text, completed });
        setText('');
        setCompleted(false);
    }

    return (
        <form className="add-form" onSubmit={onSubmit} >
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check ">
                <label>Task</label>
                <input type="checkbox"
                    checked={completed}
                    value={completed}
                    onChange={(e) => setCompleted(e.currentTarget.checked)}
                />
            </div>
            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    )
}

export default AddTask;
