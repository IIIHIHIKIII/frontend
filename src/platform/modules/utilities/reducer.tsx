import * as types from '../../../app/constants'
import {ActionType} from "../../../util/util";
import * as actions from './actions';


export type Actions = ActionType<typeof actions>;

export type State = {
    notification: {message: string, type: string}|null,
    nightMode: boolean
}

const initialState = {
    notification: null,
    nightMode: false
};


export default function reducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case types.CHANGE_NOTIFICATION:
            return {...state, notification: action.notification};
        case types.TOGGLE_THEME:
            return {...state, nightMode: action.nightMode};
        default:
            return state;
    }
}
