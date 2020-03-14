import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

var classNames = require('classnames');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, perferendis!',
                    isComplete: true
                },
                {
                    title: 'Labore, perferendis! consectetur adipisicing elit',
                    isComplete: false
                },
            ],
            todo: {
                title: '',
                isComplete: false
            },
            activeAcion: 'all'
        }
    }

    componentWillMount() {
        if(localStorage && localStorage.getItem('todos')) {
            this.setState({
                todos: JSON.parse(localStorage.getItem('todos'))
            });
        }
    }

    handleChange() {
        return (event) => {
            this.setState({
                todo: {
                    title: event.target.value,
                    isComplete: false
                }
            });
        };
    }

    enterSubmit() {
        return (event) => {
            if(event.key === 'Enter') {
                if(this.state.todo.title.length > 0){
                    const result = [this.state.todo,...JSON.parse(localStorage.getItem('todos'))];
                    this.setState({
                        todos: result,
                        todo: {
                            title: '',
                            isComplete: false
                        },
                        activeAcion: 'all'
                    });
                    this.setLocalStorage(result);
                }
            }
        };
    }

    onClickComplete(index) {
        const item = this.state.todos[index];
        return (event) => {
            const result = [...this.state.todos.slice(0,index),{
                title: item.title,
                isComplete: item.isComplete = !item.isComplete
            },...this.state.todos.slice(index + 1)];
            this.setState({ todos: result });
            this.setLocalStorage(result);
        }
    }

    onClickCompleteAll() {
        const result = [...this.state.todos.map(todo => {
            return {
                title: todo.title,
                isComplete: true
            }
        })];
        this.setState({
            todos: result
        });
        this.setLocalStorage(result);
    }

    filterTodos(type) {
        switch (type) {
            case 'done':
                this.setState({
                    activeAcion: 'done',
                    todos: [...JSON.parse(localStorage.getItem('todos')).filter(todo => todo.isComplete)]
                });
                break;
            case 'not_done':
                this.setState({
                    activeAcion: 'not_done',
                    todos: [...JSON.parse(localStorage.getItem('todos')).filter(todo => !todo.isComplete)]
                });
                break;
            case 'all':
                this.setState({
                    activeAcion: 'all',
                    todos: JSON.parse(localStorage.getItem('todos'))
                });
                break;
            default:
        }
    }

    onClickRemoveTodo(index) {
        return (event) => {
            const result = [...this.state.todos.slice(0,index),...this.state.todos.slice(index + 1)];
            this.setState({
                todos: result
            });
            this.setLocalStorage(result);
        };
    }

    setLocalStorage(result) {
        localStorage.setItem('todos', JSON.stringify(result));
    }

    render() {
        const { todo } = this.state;
        return (
            <div className="container">
                <h1>Totos app</h1>
                <input type="text" className="add-item" value={todo.title} name="title" onKeyPress={this.enterSubmit()} onChange={this.handleChange()}  placeholder="Enter todo item" />
                {
                    this.state.todos.length > 0 ?
                        this.state.todos.map((todo,i) => 
                            <TodoItem todo={todo} key={i} onClick={this.onClickComplete(i)} onCickRemove={this.onClickRemoveTodo(i)} />
                        ) :
                        <div className="not-item">Not todos item</div>
                }
                <div className="action">
                    {
                        this.state.activeAcion === 'all' ? 
                            <a className="complete-all" onClick={()=> this.onClickCompleteAll()}>Complete all</a> :
                            <span></span>
                    }
                    <div className="fiter">
                        <a className={classNames({
                            active: this.state.activeAcion === 'all'
                        })} onClick={() => this.filterTodos('all')}>All</a>
                        <a className={classNames({
                            active: this.state.activeAcion === 'done'
                        })} onClick={() => this.filterTodos('done')}>Done</a>
                        <a className={classNames({
                            active: this.state.activeAcion === 'not_done'
                        })} onClick={() => this.filterTodos('not_done')}>Not done</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
