import './sign-in.styles';
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {ChangeEvent, FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";
import {ButtonsContainer, SignInContainer} from "./sign-in.styles";


const defaultFormFields = {
    email: '',
    password: ''
}
const SignIn = () => {

    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Some fields are empty");
            return;
        }

        try {
            dispatch(emailSignInStart(email, password));

            // Resetting form
            resetFormFields();
        }
        catch(error) {
            switch ((error as any).code) {
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
        dispatch(googleSignInStart());
    };

    return (
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignIn;
