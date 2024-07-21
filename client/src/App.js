import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import YouTubeURL from "./components/home/YouTubeURL";
import Session from "./components/Session";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<YouTubeURL />} />
        <Route path="/session/:id" element={<Session />} />
      </Routes>
    </Router>
  );
}

export default App;
