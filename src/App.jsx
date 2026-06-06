import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import PortfolioDetail from "./pages/portfolioDetail";

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
      </Routes>
    </div>
  );
}

export default App;
