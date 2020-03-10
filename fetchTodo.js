const redux = require('redux');
const thunk_middleware = require('redux-thunk').default;
const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading:false,
    todo:[],
    error:''
}

//action names
const Fetch_TODO_REQUEST = 'Fetch_TODO_REQUEST';
const Fetch_TODO_SUCCESS = 'Fetch_TODO_SUCCESS';
const Fetch_TODO_FAILURE = 'Fetch_TODO_FAILURE';

//action creators
const fetchTodoRequest = () => {
    return {
        type: Fetch_TODO_REQUEST

    }
}

const fetchTodoSuccess = (todos) => {
    return {
        type: Fetch_TODO_SUCCESS,
        payload: todos
    }
}

const fetchTodoFailure = (error) => {
    return {
        type: Fetch_TODO_FAILURE,
        payload: error
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case Fetch_TODO_REQUEST : return {
            ...state,
            loading:true
        }
        case Fetch_TODO_SUCCESS : return {
            loading:false,
            todo: action.payload,
            error: ''
        }
        case Fetch_TODO_FAILURE : return {
            loading:false,
            todo: [],
            error: action.payload
        }

        default: return state
    }
}

const fetchtodo = () => {
    return function(dispatch) {
        dispatch(fetchTodoRequest);
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
            let data = response.data.map(todo=>todo.title)
            dispatch(fetchTodoSuccess(data))
        })
        .catch(error => {
            dispatch(fetchTodoFailure(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunk_middleware));
store.dispatch(fetchtodo());
store.subscribe(()=> {
    console.log(store.getState());
});
