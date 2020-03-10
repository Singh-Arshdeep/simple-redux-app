const redux = require('redux');
const reduxLogger = require('redux-logger');




const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE'; //type of action
const BUY_ICECREAM = 'BUY_ICECREAM'; 

// Maintain application state in a single object, managed by redux store
const cakeState = {
    numOfCakes:10,
}

const icecreamState = {
    numOfIcecreams:10
}

// action - has a type property
// {
//     type: BUY_CAKE,
//     info: 'First redux action'
// }

//action creator - returns actions
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'Buy one cake'
    }
}

function buyIcecream() {
    return {
        type: BUY_ICECREAM,
        info: 'Buy one icecream'
    }
}

//reducer - how the state changes
//returns the next state -  accept state and action
// (initialState, action) => newState 
// We have multiple reducers for scalability 

const cakeReducer = (state=cakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes-1
        }

        default: return state
    }
}

const icecreamReducer = (state=icecreamState, action) => {
    switch(action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIcecreams: state.numOfIcecreams-1
        }

        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer, 
});

//redux store 
// const store = createStore(rootReducer, applyMiddleware(logger));
const store = createStore(rootReducer);
//console.log(store.getState());

//subscribe to changes - Print in the case of a change in state
const unsubscribe = store.subscribe(()=>{
    console.log('updated state');
});

//dispatch - actually calling the action
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());

console.log(store.getState())

//unsubscribe
unsubscribe();

//Middleware 
