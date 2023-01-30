import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
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


// Related to firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch (error) {
            console.log('Error while creating user ' + error);
        }
    }

    return userDocRef;
};
