import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MorningCheckIn from "./components/MorningCheckIn";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/morning-checkin" element={<MorningCheckIn />} />
            </Routes>
        </Router>
    );
}

export default App;
