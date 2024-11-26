import React, { useState } from "react";
import "./AddUserPage.css"; // Crie um arquivo CSS para estilizar a página
import Check from "./assets/Check.svg";
import { Link } from "react-router-dom";

export default function AddUserPage() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/tarefas/api/usuarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Usuário adicionado com sucesso!");
        setUser({ nome: "", email: ""}); // Limpa o formulário
      } else {
        console.error("Erro ao adicionar usuário:", response.status);
      }
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  return (
    <div className="add-user-page">
      <div className="header">
        <div className="title">
          <img src={Check} alt="Check" />
          <h1>TASKLY</h1>
        </div>

        <div className="links-header">
          <Link to="/adicionarUser">Adicionar usuário</Link>
          <Link to="/">Gerenciamento de Tarefas</Link>
          <Link to="/adicionarTarefa">Cadastro de Tarefas</Link>
        </div>
      </div>

      <h1>Adicionar Usuário</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={user.nome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          E-mail:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}