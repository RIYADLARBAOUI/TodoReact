import React, { Component } from "react";
import Task from "./TaskDirectory/Task";

import "./App.css";

const Tasks = [
  { title: "myFirstTask", isChecked: false, isDeleted: false },
  { title: "mySecondTask", isChecked: false, isDeleted: false },
  { title: "myThirdTask", isChecked: false, isDeleted: false },
];

interface TaskInterface {
  title: string;
  isChecked: boolean;
  isDeleted: boolean;
}

interface State {
  counter: number;
  tasks: { title: string; isChecked: boolean; isDeleted: boolean }[];
  input: string;
  filteredTasks: { title: string; isChecked: boolean; isDeleted: boolean }[];
  search:string
}

interface Props {}


class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.state = {
      counter: 0,
      tasks: savedTasks.length ? savedTasks : Tasks,
      input: "",
      search: "",
    };
    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  
  }

  handleCountChange(counter: number) {
    const storeCounter = this.state.counter;
    this.setState({
      counter: counter + storeCounter,
    });
  }

  handleDeleteTask = (index: number) => {
    const newTasks = [...this.state.tasks];
    newTasks.splice(index, 1);
    this.setState({ tasks: newTasks });
  };

  handleAddTask(title: string) {
    const newTask: TaskInterface = {
      title,
      isChecked: false,
      isDeleted: false
    }
    const updatedTasks = [...this.state.tasks, newTask];
    this.setState({
      tasks: updatedTasks
    });
  }

  

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };


  handleMoveTaskUp = (index: number) => {
    if (index === 0) return;
    const newTasks = [...this.state.tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    this.setState({ tasks: newTasks });
  };

  handleMoveTaskDown = (index: number) => {
    if (index === this.state.tasks.length - 1) return;
    const newTasks = [...this.state.tasks];
    [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
    this.setState({ tasks: newTasks });
  };

  render() {
    const taskList = this.state.tasks
        .filter(
            (task) =>
                !task.isDeleted &&
                task.title.toLowerCase().includes(this.state.search.toLowerCase())
        )
        .map((task, index) => (
            <Task
                key={index}
                title={task.title}
                isChecked={task.isChecked}
                onCountChange={this.handleCountChange}
                counter={this.state.counter}
                onDeleteTask={() => this.handleDeleteTask(index)}
                onMoveUp={() => this.handleMoveTaskUp(index)}
                onMoveDown={() => this.handleMoveTaskDown(index)}
            />
        ));

    return (
        <div className="App">
          <header>
            <h1>Welcome to My TodoList</h1>
            <p>Progression={this.state.counter}/5</p>
          </header>
          <main>
            <div className="search">
              <input
                  type="text"
                  placeholder="Search task"
                  value={this.state.search}
                  onChange={this.handleSearch}
              />
            </div>
            <div className="wrapper_task">{taskList}</div>
          </main>
          <footer>
            <form className="addItem">

              <input required
                  placeholder="entrez une tache"
                  onChange={(e) => {
                    this.setState({ input: e.target.value });
                  }}
              />
              
              <button 
                  onClick={() => {
                    this.handleAddTask(this.state.input);
                  }}
              >
                +
              </button>
          
            </form>

            <h1>Bye</h1>
          </footer>
        </div>
    );
  }
}

export default App;
