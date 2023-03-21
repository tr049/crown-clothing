import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {useState} from "react";
import {
    createUserDocumentFromAuth,
    signInUsingEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase.utils";


const defaultFormFields = {
    email: '',
    password: ''
}
const SignIn = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Some fields are empty");
            return;
        }

        try {
            const signInResult = await signInUsingEmailAndPassword(email, password);
            console.log(signInResult);

            // Resetting form
            resetFormFields();
        }
        catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("Invalid password");
                    break;
                case 'auth/user-not-found':
                    alert("Invalid username");
                    break;
                default:
                    console.error('Failed to signed-in user', error);
                    break;
            }
        }

    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();

        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    type="email"
                    required/>

                <FormInput
                    label="Password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    type="password"
                    required/>
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
