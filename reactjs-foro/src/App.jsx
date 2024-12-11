import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Principal from "./PrincipalButtons.jsx";
import SignUp from './SignUp.jsx';
import Profile from "./Profile.jsx";

function App() {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route path="/" element={<Login navigateToWelcome={() => navigate("/welcome")} />} />
            <Route path="/principal" element={<Principal />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default App;
