import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBE4FOHTyCG_Po00hsFeLjlMC4V-jLE2-s",
    authDomain: "crwn-clothing-db-763e4.firebaseapp.com",
    projectId: "crwn-clothing-db-763e4",
    storageBucket: "crwn-clothing-db-763e4.appspot.com",
    messagingSenderId: "965431597322",
    appId: "1:965431597322:web:0a6a3e588e8568d42a82f3"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt })
        }
        catch (error) {
            console.log('Error in creating user ' + error.message)
        }
    }

    return userDocRef
}