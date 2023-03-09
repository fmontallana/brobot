import { useAuthState, useSignOut } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../data/constant";
import { auth } from "../../firebase.config";
import useLocalStorage from "../../hooks/useLocalStorage";

function Welcome() {

    const [signOut, loading, error] = useSignOut(auth);
    const [user, setUser] = useLocalStorage("user")
    const nav = useNavigate()

    const handlerLogout = () => {
        signOut()
        window.localStorage.removeItem("user")
        nav(ROUTES.LOGIN)
    }

    return (
        <div>
            <p>Chat Page</p>
            <p>Welcome {user.displayName}.</p>
            <p>You are logged in!</p>
            <button onClick={handlerLogout}>Sign out</button>
            <button onClick={() => nav(ROUTES.CHAT)}>Chat Brobot</button>
        </div>
    )
}

export default Welcome