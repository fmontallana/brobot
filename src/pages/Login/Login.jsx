import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { auth } from "../../firebase.config"
import { useNavigate } from "react-router-dom"
import useLocalStorage from "../../hooks/useLocalStorage"
import { ROUTES } from "../../data/constant"
import { postRequest } from "../../api/request"

function Login() {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
    const [userData, setUserData] = useLocalStorage("user", user)
    const nav = useNavigate()
    const handleGoogleSignIn = async () => {
        const data = await signInWithGoogle()
        // console.log(data.user.providerData[0])
        const userData = { ...data.user.providerData[0], uid: data.user.uid }
        setUserData(userData)
        postRequest('http://localhost:5001/api/users', userData)
            .then(res => console.log(res.data))
        nav(ROUTES.HOME)
    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
    )
}

export default Login