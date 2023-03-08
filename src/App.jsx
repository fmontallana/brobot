
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase.config";
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Chat from "./pages/Chat/Chat";
import Chatbox from "./pages/Chatbox/Chatbox";
import { ROUTES } from "./data/constant";

function App() {
  const [user, loading, error] = useAuthState(auth);

  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: user ? <Chat /> : <Home />,
    },
    {
      path: ROUTES.LOGIN,
      element: <Login />,
    },
    {
      path: ROUTES.CHAT,
      element: loading ? <h1>Loading..</h1> : <Chatbox user={user} />,
    },
    {
      path: ROUTES.NOT_FOUND,
      element: <h1>Page Not Found</h1>,
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
