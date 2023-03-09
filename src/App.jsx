
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Chatbox from "./pages/Chatbox/Chatbox";
import { ROUTES } from "./data/constant";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {

  const [user] = useLocalStorage("user")

  return (
    <div className="h-[100dvh] max-w-sm mx-auto">
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={!user ? <Login /> : <Navigate to={ROUTES.CHAT} />} />
          <Route path={ROUTES.CHAT} element={user ? <Chatbox /> : <Navigate to={ROUTES.LOGIN} />} />
          <Route path={ROUTES.NOT_FOUND} element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
