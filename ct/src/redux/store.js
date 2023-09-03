import { createStore } from "redux"

const reducerFn =(state = {user:null}, action)=>{
    if(action.type == "user"){
       return state.user = action.user
    }
    return state

}
const store = createStore(reducerFn)
export default store