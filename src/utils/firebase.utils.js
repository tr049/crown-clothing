import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAhJ3HnbsOW7cP2pJYOnvxrLhP1tzxgDCQ",
    authDomain: "crown-clothing-prac.firebaseapp.com",
    projectId: "crown-clothing-prac",
    storageBucket: "crown-clothing-prac.appspot.com",
    messagingSenderId: "927389956306",
    appId: "1:927389956306:web:c89c96415aa047b264d50b",
    measurementId: "G-75KB1HGDTH"
};


// Initializing the firebase app
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const signInUsingEmailAndPassword = async (email, password) =>  {
    if (!email || !password) {
        return;
    }

    return await signInWithEmailAndPassword(auth, email, password);
}

// Related to firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) {
        return ;
    }
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch (error) {
            console.log('Error while creating user ' + error);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
};
