import { FETCH_API_START, FETCH_API_SUCCESS, FETCH_API_FAILURE } from "./action_types";
const api_url = 'https://data.edmonton.ca/resource/k4tx-5k8p.json';

export function createFeatureCollection(data){
    let feature = [];
    data.forEach( (mark) => 
        feature.push(
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        parseFloat(mark.point.coordinates[0]),
                        parseFloat(mark.point.coordinates[1])   
                    ] 
                },
                "properties": {
                    "description": mark.description, 
                    "duration": mark.duration,
                    "impact": mark.impact,
                    "details": mark.details
                }
            }
        )
    )

    return {
        "type": "FeatureCollection",
        "features": feature
    };

}

export function fetchApiStart() {
    return {
        type: FETCH_API_START
    }
}

export function fetchApiSuccess(data) {
    return {
        type: FETCH_API_SUCCESS,
        payload: data
    }
}

export function fetchApiFailure() {
    return {
        type: FETCH_API_FAILURE
    }
}

export function fetchFromApi() {
    return dispatch => {
        
        dispatch(fetchApiStart())  // starting fetch

        fetch(api_url, { method: 'GET' })
        .then( response => response.json())
        .then( response => createFeatureCollection(response))

        .then( response => dispatch(fetchApiSuccess(response))) // fetch success

        .catch( e => dispatch(fetchApiFailure())) // fetch failure

    }
}
