import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DecisionPage from "./pages/DecisionPage";
import GameBoardPage from "./pages/GameBoardPage";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/decision" element={<DecisionPage />} />
        <Route path="/board" element={<GameBoardPage />} /> {/* Ensure this path matches */}
      </Routes>
    </Router>
  );
}