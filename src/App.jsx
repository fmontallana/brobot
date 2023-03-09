
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase.config";
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Chatbox from "./pages/Chatbox/Chatbox";
import { ROUTES } from "./data/constant";
import Welcome from "./pages/Welcome/Welcome";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {

  const [user] = useLocalStorage("user")

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={user ? <Welcome /> : <Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.CHAT} element={user ? <Chatbox /> : <Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.NOT_FOUND} element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App
