import {ChangeEvent, FormEvent, useState} from 'react';
import FormInput from "../form-input/form-input.component";
import './sign-up.styles';
import Button from "../button/button.component";
import {useDispatch} from "react-redux";
import {signUpStart} from "../../store/user/user.action";
import {SignUpContainer} from "./sign-up.styles";
import {AuthError, AuthErrorCodes} from 'firebase/auth';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUp = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

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
        else if (password !== confirmPassword) {
            alert("Passwords doesn't match");
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));

            // Resetting form
            resetFormFields();
        }
        catch(error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert("Can't create user, email already registered");
            }
            console.error('Failed to create user', error);
        }

    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                    type="text"
                    required/>

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

                <FormInput
                    label="Confirm Password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    type="password"
                    required/>

                <Button type="submit">Sign up</Button>
            </form>
        </SignUpContainer >
    )
}

export default SignUp;
