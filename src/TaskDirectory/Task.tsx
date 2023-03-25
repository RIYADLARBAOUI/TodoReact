import { useState, Component } from 'react';
import './Task.css';

interface Props {
    title: string;
    isChecked: boolean;
    onCountChange: (value: number) => void;
    onDeleteTask: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
}

interface State {
    isChecked: boolean;
    isDeleted: boolean;
}

class Task extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked,
            isDeleted: false,
        };
        this.Checked = this.Checked.bind(this);
        this.handleSaveTask = this.handleSaveTask.bind(this);
    }

    Checked() {
        const isChecked = !this.state.isChecked;
        const value = isChecked ? 1 : -1;
        this.props.onCountChange(value);
        this.setState({ isChecked });
    }

    handleSaveTask() {
        const task = { title: this.props.title, isChecked: this.state.isChecked };
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = [...savedTasks, task];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    render() {
        return (
            <div className="item">
                <p>{this.props.title}</p>
                <div>
                    <input type="checkbox" checked={this.state.isChecked} onChange={this.Checked} />
                    <button onClick={this.props.onDeleteTask}>X</button>
                    <button onClick={this.handleSaveTask}>Save</button>
                    <button onClick={this.props.onMoveUp} className='action'> 
                    <img src="/up-arrow-regular-24.png" alt="up" ></img>
                    </button>
                    <button onClick={this.props.onMoveDown} className='action'>
                        <img src="/down-arrow-regular-24.png" alt="down" ></img>
                    </button>
                </div>
            </div>
        );
    }
}

export default Task;
