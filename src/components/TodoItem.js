import React, { Component } from 'react';
var classNames = require('classnames');

class TodoItem extends Component {
    render() {
        const { todo,onClick,onClickRemove } = this.props;
        return (
            <div className={classNames('item', {
                checked: todo.isComplete
            })}>
                <span className="logo-complete" onClick={onClick}>
                    <i className="fa fa-check-square-o" aria-hidden="true"></i>
                </span>
                <a className="title">{todo.title}</a>
                <span className="remove-todo" onClick={onClickRemove}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </span>
            </div>
        );
    };
}

export default TodoItem