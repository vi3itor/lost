import TYPES from '../types/index'
const INITIAL_STATE = {
    listOfPossibleFilters:[],
    listOfAnnos:[]
    
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TYPES.GET_SIAREVIEW_FILTEROPTIONS:
            return {
                ...state,
                listOfPossibleFilters: action.payload
            }
        case TYPES.GET_SIAREVIEW_ANNOS:
            return{
                ...state,
                listOfAnnos: action.payload
            }
            default:
            return state
    }
}