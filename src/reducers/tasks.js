import * as types from './../contants/actionTypes';

const tasks = JSON.parse(localStorage.getItem('todos'));

var initialState = {
    todos: tasks ? tasks : []
};

var myReducer = (state = initialState, action) => {
    switch (action) {
        case types.LIST_ALL:
            return state;
        default:
    }
    return state;
}

export default myReducer