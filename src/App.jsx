import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import PortfolioDetail from "./pages/portfolioDetail";
import Admin from "./pages/admin";

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
