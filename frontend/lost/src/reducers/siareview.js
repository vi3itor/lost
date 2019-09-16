import TYPES from '../types/index'
const INITIAL_STATE = {
    listOfPossibleFilters:[]
    
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TYPES.GET_SIAREVIEW_FILTEROPTIONS:
            return {
                ...state,
                listOfPossibleFilters: action.payload
            }
            default:
            return state
    }
}