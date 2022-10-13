import {createStore} from 'redux';


const initialState = {
    data:{}
}

function reducer( state = initialState , action){
    switch(action.type){
        case 'SET_DATA':
            return{
                ...state,
                data:action.payload
            }
        case 'GET_DATA':
            return{
                ...state,
                data:action.payload
            }
        default:
            return state;
    }
}


//action
export const setData = (data) => {
    return{
        type:'SET_DATA',
        payload:data
    }
}

export const getData = (data) => {
    return{
        type:'GET_DATA',
        payload:data
    }
}




const store = createStore(reducer);

export default store;
