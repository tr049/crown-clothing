import {useState} from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUp = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

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
        else if (password !== confirmPassword) {
            alert("Passwords doesn't match");
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});

            // Resetting form
            resetFormFields();
        }
        catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Can't create user, email already registered");
            }
            console.error('Failed to create user', error);
        }

    }

    return (
        <div className='sign-up-container'>
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

                <Button type="Submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUp;
