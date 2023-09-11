import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";
import Registration from "./pages/Registration"
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from "./pages/Message";
import RootLayout from "./components/RootLayout";
import Switch from '@mui/material/Switch';
import { useState } from "react";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route path="/alap" element={<RootLayout />}>
                <Route path="home" element={<Home />}></Route>
                <Route path="message" element={<Message />}></Route>
            </Route>
        </Route>
    )
);




function App() {
    let [dark, setDark] = useState(false)
    let handleChnage = () => {
        if (!dark) {
            console.log("dark");
            setDark(true)
        } else {
            console.log("light");
            setDark(false)
        }
    }

    return (
        <>

            <ToastContainer />
            <div className={dark && "dark"}>
                <Switch onChange={handleChnage} />
                {dark ? <span className="darktext">Dark</span> : <>Light</>}
                <RouterProvider router={router} />
            </div>

        </>
    )
}

export default App
