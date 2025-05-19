import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Publication from "./pages/Publication";
import Actualite from "./pages/Actualite";
import Chat from "./pages/Chat";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/publication" replace />} />
        <Route path="/publication" element={<Publication />} />
        <Route path="/actualite" element={<Actualite />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
