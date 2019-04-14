import { MAP_DETAIL } from "../actions/types";

export default function(state = {}, action) {
    console.log(action.type);
    switch (action.type) {
        case MAP_DETAIL:
            return action.payload
        default:
            return state;
    }
}
