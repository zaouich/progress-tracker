import { createStore } from "redux"

const reducerFn = function(state = {user : null ,errMessage:null} , action){
    if(action.type === "user"){
        return {user : action.userData }
    }
    
    return state
}
const store = createStore(reducerFn)
export default store