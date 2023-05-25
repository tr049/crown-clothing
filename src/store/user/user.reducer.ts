import {USER_ACTION_TYPES} from "./user.types";
import {AnyAction} from "redux";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed} from "./user.action";
import {CartItem} from "../cart/cart.types";
import {UserData} from "../../utils/firebase.utils";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error;
}

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {

    if (signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload
        }
    }
    else if (signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null
        }
    }
    else if (signOutFailed.match(action) ||
        signUpFailed.match(action) ||
        signInFailed.match(action)) {
        return {
            ...state,
            currentUser: action.payload
        }
    }

    return state;
}
