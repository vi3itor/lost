import axios from 'axios'
import TYPES from '../../types/index'
import {API_URL} from '../../settings'
export const siaReviewUpdateAnnos = (data) => async dispatch => {
    try {
        const response = await axios.post(API_URL + '/siareview/update', data)
        console.log('REQUEST: siaUpdateAnnos: wrongLoad ', response)
    } catch (e) {console.error(e)}
}
                                  //(annoID,type='next')
export const getSiaReviewAnnos = (imageId) => async dispatch => {
    try {
      const response = await axios.get(API_URL + '/siareview/anno/' + imageId)
      dispatch({type: TYPES.GET_SIAREVIEW_ANNOS, payload: response.data})
      console.log('REQUEST: getSiaAnnos:  ', response.data)
    } catch (e) {console.error(e)}
}
export const getSiaReviewFilterOptions = (taskid) => async dispatch => {
    try {
        const response = await axios.get(API_URL + '/siareview/filteroptions/'+taskid)
        dispatch({type:TYPES.GET_SIAREVIEW_FILTEROPTIONS, payload:response.data})
    } catch (e) {console.error(e)}
}

export const siaReviewfilter = (data) => async dispatch => {
    try {
        const response = await axios.post(API_URL + '/siareview/filter', data)
        console.log('REQUEST: siaUpdateAnnos: wrongLoad ', response)
        // TODO: implement list of filtered annos logic
    } catch (e) {console.error(e)}
}