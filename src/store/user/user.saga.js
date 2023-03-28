import {all, takeLatest, call, put} from 'redux-saga/effects';
import {USER_ACTION_TYPES} from "./user.types";
import {
    createAuthUserWithEmailAndPassword,
    getCurrentUser,
    signInUsingEmailAndPassword,
    signInWithGooglePopup, signOutUser
} from "../../utils/firebase.utils";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess} from "./user.action";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
       const userSnapshot = yield call(getCurrentUser, userAuth, additionalDetails);

        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    }
    catch (exception) {
        yield put(signInFailed(exception));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;

        yield call(getSnapshotFromUserAuth, userAuth);
    }
    catch (exception) {
        yield put(signInFailed(exception));
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    }
    catch (exception) {
        yield put(signInFailed(exception));
    }
}

export function* emailAndPasswordSignGoogle({email, password}) {
    try {
        const {user} = yield call(signInUsingEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);
    }
    catch (exception) {
        yield put(signInFailed(exception));
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield call(createAuthUserWithEmailAndPassword(email, password));
        yield put(signUpSuccess(user, {displayName}));
    }
    catch (exception) {
        yield put(signUpFailed(exception));
    }
}
export function* signInAfterSignUp({payload: {user, additionalDetails}}) {
    try {
        const {user} = yield call(getSnapshotFromUserAuth, user, additionalDetails);
    }
    catch (exception) {
        yield put(signInFailed(exception));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    }
    catch (exception) {
        yield put(signOutFailed(exception));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailAndPasswordSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, emailAndPasswordSignGoogle)
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailAndPasswordSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}
