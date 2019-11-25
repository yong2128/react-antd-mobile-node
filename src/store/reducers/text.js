import initState from "../state"

export default (state=initState,action) => {
    switch(action.type){
        case "SAVE_INDEX" : 
            state.currentIndex = action.payLoad.currentIndex;
            break;
        default:
            break;
    }
    return {...state};
}