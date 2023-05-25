import {all, takeLatest, call, put} from 'typed-redux-saga/macro';
import {USER_ACTION_TYPES} from "./user.types";
import {
    AdditionalInformation,
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInUsingEmailAndPassword,
    signInWithGooglePopup, signOutUser
} from "../../utils/firebase.utils";
import {
    EmailSignInStart,
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed, SignUpStart, SignUpSuccess,
    signUpSuccess
} from "./user.action";
import {User} from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
       const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);

       if (userSnapshot) {
           yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
       }
    }
    catch (exception) {
        yield* put(signInFailed(exception as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;

        yield* call(getSnapshotFromUserAuth, userAuth);
    }
    catch (exception) {
        yield* put(signInFailed(exception as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    }
    catch (exception) {
        yield* put(signInFailed(exception as Error));
    }
}

export function* emailAndPasswordSignIn({payload: {email, password}}: EmailSignInStart) {
    try {
        const userCredentials = yield* call(signInUsingEmailAndPassword, email, password);

        if (userCredentials) {
            const {user} = userCredentials;
            yield* call(getSnapshotFromUserAuth, user);
        }

    }
    catch (exception) {
        yield* put(signInFailed(exception as Error));
    }
}

export function* signUp({payload: {email, password, displayName}}: SignUpStart) {
    try {
        const userCredentials = yield* call(createAuthUserWithEmailAndPassword,email, password);

        if (userCredentials) {
            const {user} = userCredentials;
            yield* put(signUpSuccess(user, {displayName}));
        }

    }
    catch (exception) {
        yield* put(signUpFailed(exception as Error));
    }
}
export function* signInAfterSignUp({payload: {user, additionalDetails}}: SignUpSuccess) {
    try {
        const userCredentials = yield* call(getSnapshotFromUserAuth, user, additionalDetails);
    }
    catch (exception) {
        yield* put(signInFailed(exception as Error));
    }
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    }
    catch (exception) {
        yield* put(signOutFailed(exception as Error));
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailAndPasswordSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailAndPasswordSignIn)
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailAndPasswordSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}
