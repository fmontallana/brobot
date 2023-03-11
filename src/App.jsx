
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Chatbox from "./pages/Chatbox/Chatbox";
import { ROUTES } from "./data/constant";
import useLocalStorage from "./hooks/useLocalStorage";
import { auth } from "./firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useUserStore } from "./stores/user.store";

function App() {

  const [user, loading, error] = useAuthState(auth)
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("auth", false)
  const setUser = useUserStore(state => state.setUser)

  useEffect(() => {
    if (!user) return
    setIsLoggedIn(true)
    setUser(user)
  }, [user])

  console.log("Environment: ", process.env.NODE_ENV)

  return (
    <div className="h-[100dvh] max-w-sm mx-auto">
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={!isLoggedIn ? <Login /> : <Navigate to={ROUTES.CHAT} />} />
          <Route path={ROUTES.CHAT} element={isLoggedIn ? <Chatbox /> : <Navigate to={ROUTES.LOGIN} />} />
          <Route path={ROUTES.NOT_FOUND} element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
