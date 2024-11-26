import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddUserPage from "./AddUserPage";
import AddActivityPage from "./AddActivityPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/add-user">Adicionar Usuário</Link>
        <Link to="/add-activity">Adicionar Atividade</Link>
      </nav>
      <Routes>
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/add-activity" element={<AddActivityPage />} />
      </Routes>
    </Router>
  );
}

export default App;