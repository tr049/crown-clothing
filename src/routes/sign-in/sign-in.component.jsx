import {createUserDocumentFromAuth, signInWithGooglePopup,} from "../../utils/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
      const {user} = await signInWithGooglePopup();
      debugger
      const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    );
};

export default SignIn;