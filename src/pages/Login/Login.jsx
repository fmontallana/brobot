import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { auth } from "../../firebase.config"
import useLocalStorage from "../../hooks/useLocalStorage"
import { postRequest } from "../../api/request"
import BrobotAvatar from "../../components/BrobotAvatar"

function Login() {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage("auth")

    const handleGoogleSignIn = async () => {

        const data = await signInWithGoogle()
        if (data === undefined || null) {
            alert("Something went wrong. Please try again later.")
            return
        }

        const userData = { ...data.user.providerData[0], uid: data.user.uid }

        setIsLoggedIn(true)
        postRequest('api/users', userData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
            .finally(() => window.location.reload())
    }

    return (
        <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
            <BrobotAvatar />
            {/* <h1>Login</h1> */}
            <button className="btn glass" onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
    )
}

export default Login