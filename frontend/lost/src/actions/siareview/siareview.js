import axios from 'axios'
import TYPES from '../../types/index'
import {API_URL} from '../../settings'
export const siaReviewUpdateAnnos = (data) => async dispatch => {
    try {
        const response = await axios.post(API_URL + '/siareview/update', data)
        console.log('REQUEST: siaUpdateAnnos: wrongLoad ', response)
    } catch (e) {console.error(e)}
}
export const getSiaReviewAnnos = (annoID, type='next') => async dispatch => {
    try {
       // const response = await axios.get(API_URL + '/siareview/' + type + '/' + imageId)
      let data={
        "image": {
            "id": 103,
            "url": "/data/media/10_voc2012/2012_000358.jpg",
            "number": 8,
            "amount": 10,
            "isFirst": false,
            "isLast": false,
            "labelIds": []
        },
        "annotations": {
            "bBoxes": [
                {
                    "id": 319,
                    "labelIds": [],
                    "data": {
                        "x": 0.832,
                        "y": 0.944,
                        "w": 0.108,
                        "h": 0.06933333333333333
                    }
                },
                {
                    "id": 320,
                    "labelIds": [],
                    "data": {
                        "x": 0.094,
                        "y": 0.18133333333333335,
                        "w": 0.142,
                        "h": 0.12266666666666666
                    }
                },
                {
                    "id": 321,
                    "labelIds": [],
                    "data": {
                        "x": 0.788,
                        "y": 0.6826666666666666,
                        "w": 0.38,
                        "h": 0.43466666666666665
                    }
                },
                {
                    "id": 322,
                    "labelIds": [
                        16
                    ],
                    "data": {
                        "x": 0.57,
                        "y": 0.616,
                        "w": 0.672,
                        "h": 0.768
                    }
                }
            ],
            "points": [],
            "lines": [],
            "polygons": []
        }
       }
        dispatch({type: TYPES.GET_SIA_ANNOS, payload: data})
        console.log('REQUEST: getSiaAnnos: wrongLoad ', data)
    } catch (e) {console.error(e)}
}
export const getSiaReviewFilterOptions = () => async dispatch => {
    try {
        //const response = await axios.post(API_URL + '/siareview/filteroptions/'+taskid, data)
       let listOfPossibleFilters={
            listOfPossibleLabels: [{label:'dog',id:1},{label:'cat',id:2},{label:'bird',id:3},{label:'airplane',id:5}],
            listOfALLUserInTask:[{label:'admin',id:1}]
        }
        dispatch({type:TYPES.GET_SIAREVIEW_FILTEROPTIONS,payload:listOfPossibleFilters})
        console.log('REQUEST: siaUpdateAnnos: wrongLoad ', listOfPossibleFilters)
    } catch (e) {console.error(e)}
}