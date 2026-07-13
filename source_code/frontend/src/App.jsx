import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Loans from "./pages/Loans";
import Financial from "./pages/Financial";
import AIRecommendation from "./pages/AIRecommendation";
import NegotiationLetter from "./pages/NegotiationLetter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="/ai" element={<AIRecommendation />} />
        <Route path="/letter" element={<NegotiationLetter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;