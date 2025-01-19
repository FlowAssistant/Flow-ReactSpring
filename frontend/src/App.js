import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MorningCheckIn from "./components/MorningCheckIn";
import MidDayBoost from './components/MidDayBoost';
import EveningReflection from "./components/EveningReflection";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/morning-checkin" element={<MorningCheckIn />} />
                <Route path="/evening-reflection" element={<EveningReflection />} />
                <Route path="/midday-boost" element={<MidDayBoost />} />
            </Routes>
        </Router>
    );
}

export default App;
