import { useState, useContext } from "react"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import { UserContext } from "../../contexts/user.context"

import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const { setCurrentUser } = useContext(UserContext)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            alert("Signed in successfully")
            setCurrentUser(user)
            setFormFields(defaultFormFields)
        }
        catch (error) {
            if (error.code == 'auth/invalid-credential') {
                alert("Incorrect credentials, please try again")
            }
        }
    }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password} />

                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm