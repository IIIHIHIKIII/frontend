import {Dispatch, GetState} from "../../../util/util";
import axios from "axios";
import {catchError} from "../utilities/asyncActions";
import {addMessage, changeMessages} from "./actions";
import {Message} from "./types";
import {showSuccessMessage} from "../utilities/actions";


export function loadMessages() {
    return function (dispatch: Dispatch) {
        axios.get('messages').then(response => {
            const messages = response.data;
            dispatch(changeMessages(messages));
        }).catch(error => catchError(error, dispatch));
    }
}

export function sendMessage(message: string) {
    return function (dispatch: Dispatch) {
        axios.post('sendMessage', {
            message
        }).catch(error => catchError(error, dispatch));
    }
}

export function mute(address: string) {
    return function (dispatch: Dispatch) {
        axios.post('muteUser', {
            address
        }).then(() => {
            dispatch(showSuccessMessage("Muted player!"));
        }).catch(error => catchError(error, dispatch));
    }
}

export function deleteMessage(messageId: number) {
      return function (dispatch: Dispatch) {
        axios.post('deleteMessage', {
            messageId
        }).catch(error => catchError(error, dispatch));
    }
}

export function addNewMessage(message: Message) {
    return function (dispatch: Dispatch, getState: GetState) {
        const messages = getState().chat.messages;
        if (messages.length > 0 && messages[messages.length - 1].id + 1 !== message.id) {
            dispatch(loadMessages());
        } else {
            // TODO: add notification!
            dispatch(addMessage(message));
        }
    }
}
