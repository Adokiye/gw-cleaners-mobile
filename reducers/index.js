import {setToken, setId, } from "../constants/action-types";
const initialState = {
    token: '',
    id: '',
};
const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case setId:
            return{
                ...state,
            id: action.payload
            };    
        case setToken:
            return{
                ...state,
             token: action.payload
            };                              
        default:
            return state
    }
}
export default rootReducer;
