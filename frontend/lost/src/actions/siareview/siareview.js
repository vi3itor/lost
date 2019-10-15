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
export const getSiaReviewAnnos = () => async dispatch => {
    try {
       // const response = await axios.get(API_URL + '/siareview/' + type + '/' + imageId)
      let data=
         [
        {
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
         },
        {
            image: {
                id: 105,
                url: '/data/media/10_voc2012/2011_002555.jpg',
                number: 10,
                amount: 10,
                isFirst: false,
                isLast: true,
                labelIds: []
              },
              annotations: {
                bBoxes: [
                  {
                    id: 324,
                    labelIds: [
                      14
                    ],
                    data: {
                      x: 0.516,
                      y: 0.5,
                      w: 0.306,
                      h: 0.8659217877094972
                    }
                  },
                  {
                    id: 325,
                    labelIds: [
                      14
                    ],
                    data: {
                      x: 0.422,
                      y: 0.5083798882681564,
                      w: 0.652,
                      h: 0.9804469273743017
                    }
                  },
                  {
                    id: 326,
                    labelIds: [
                      16
                    ],
                    data: {
                      x: 0.516,
                      y: 0.5,
                      w: 0.306,
                      h: 0.8659217877094972
                    }
                  }
                ],
                points: [],
                lines: [],
                polygons: []
              }
            }
         ]
    
         
        dispatch({type: TYPES.GET_SIAREVIEW_ANNOS, payload: data})
        console.log('REQUEST: getSiaAnnos: wrongLoad ', data)
    } catch (e) {console.error(e)}
}
export const getSiaReviewFilterOptions = () => async dispatch => {
    try {
        //const response = await axios.post(API_URL + '/siareview/filteroptions/'+taskid, data)
       let listOfPossibleFilters={
            listOfPossibleLabels: [
                {
                  id: 2,
                  label: 'Aeroplane',
                  nameAndClass: 'Aeroplane (VOC2012)',
                  description: 'Includes gliders but not hang gliders or helicopters'
                },
                {
                  id: 3,
                  label: 'Bicycle',
                  nameAndClass: 'Bicycle (VOC2012)',
                  description: 'Includes tricycles, unicycles'
                },
                {
                  id: 4,
                  label: 'Bird',
                  nameAndClass: 'Bird (VOC2012)',
                  description: 'All birds'
                },
                {
                  id: 5,
                  label: 'Boat',
                  nameAndClass: 'Boat (VOC2012)',
                  description: 'Ships, rowing boats, pedaloes but not jet skis'
                },
                {
                  id: 6,
                  label: 'Bottle',
                  nameAndClass: 'Bottle (VOC2012)',
                  description: 'Plastic, glass or feeding bottles'
                },
                {
                  id: 7,
                  label: 'Bus',
                  nameAndClass: 'Bus (VOC2012)',
                  description: 'Includes minibus but not trams'
                },
                {
                  id: 8,
                  label: 'Car',
                  nameAndClass: 'Car (VOC2012)',
                  description: 'Includes cars, vans, large family cars for 6-8 people etc.\nExcludes go-carts, tractors, emergency vehicles, lorries/trucks etc.\nDo not label where only the vehicle interior is shown.\nInclude toys that look just like real cars, but not \'cartoony\' toys.'
                },
                {
                  id: 9,
                  label: 'Cat',
                  nameAndClass: 'Cat (VOC2012)',
                  description: 'Domestic cats (not lions etc.)'
                },
                {
                  id: 10,
                  label: 'Chair',
                  nameAndClass: 'Chair (VOC2012)',
                  description: 'Includes armchairs, deckchairs but not stools or benches.\nExcludes seats in buses, cars etc.\nExcludes wheelchairs.'
                },
                {
                  id: 11,
                  label: 'Cow',
                  nameAndClass: 'Cow (VOC2012)',
                  description: 'All cows'
                },
                {
                  id: 12,
                  label: 'Dining table',
                  nameAndClass: 'Dining table (VOC2012)',
                  description: 'Only tables for eating at.\nNot coffee tables, desks, side tables or picnic benches'
                },
                {
                  id: 13,
                  label: 'Dog',
                  nameAndClass: 'Dog (VOC2012)',
                  description: 'Domestic dogs (not wolves etc.)'
                },
                {
                  id: 14,
                  label: 'Horse',
                  nameAndClass: 'Horse (VOC2012)',
                  description: 'Includes ponies, donkeys, mules etc.'
                },
                {
                  id: 15,
                  label: 'Motorbike',
                  nameAndClass: 'Motorbike (VOC2012)',
                  description: 'Includes mopeds, scooters, sidecars'
                },
                {
                  id: 16,
                  label: 'Person',
                  nameAndClass: 'Person (VOC2012)',
                  description: 'Includes babies, faces (i.e. truncated people)'
                },
                {
                  id: 17,
                  label: 'Potted plant',
                  nameAndClass: 'Potted plant (VOC2012)',
                  description: 'Indoor plants excluding flowers in vases, or outdoor plants clearly in a pot. '
                },
                {
                  id: 18,
                  label: 'Sheep',
                  nameAndClass: 'Sheep (VOC2012)',
                  description: 'Sheep, not goats'
                },
                {
                  id: 19,
                  label: 'Sofa',
                  nameAndClass: 'Sofa (VOC2012)',
                  description: 'Excludes sofas made up as sofa-beds'
                },
                {
                  id: 20,
                  label: 'Train',
                  nameAndClass: 'Train (VOC2012)',
                  description: 'Includes train carriages, excludes trams'
                },
                {
                  id: 21,
                  label: 'TV/monitor',
                  nameAndClass: 'TV/monitor (VOC2012)',
                  description: 'Standalone screens (not laptops), not advertising displays'
                }
              ],
            listOfALLUserInTask:[{label:'admin',id:1}]
        }
        dispatch({type:TYPES.GET_SIAREVIEW_FILTEROPTIONS,payload:listOfPossibleFilters})
        console.log('REQUEST: siaUpdateAnnos: wrongLoad ', listOfPossibleFilters)
    } catch (e) {console.error(e)}
}
export const siaReviewfilter = (data) => async dispatch => {
    try {
        const response = await axios.post(API_URL + '/siareview/filter', data)
        console.log('REQUEST: siaUpdateAnnos: wrongLoad ', response)
    } catch (e) {console.error(e)}
}