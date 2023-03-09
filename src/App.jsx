
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase.config";
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Chatbox from "./pages/Chatbox/Chatbox";
import { ROUTES } from "./data/constant";
import Welcome from "./pages/Welcome/Welcome";

function App() {
  const [user, loading, error] = useAuthState(auth);


  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={user ? <Welcome /> : <Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.CHAT} element={loading ? <h1>Loading..</h1> : user ? <Chatbox user={user} /> : <Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.NOT_FOUND} element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App
