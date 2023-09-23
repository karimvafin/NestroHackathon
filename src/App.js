import './App.css';
import { Home } from './home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Results } from './blocks/results/Results';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
