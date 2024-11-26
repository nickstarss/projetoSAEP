import React, { useState, useEffect } from "react";
import "./AddActivityPage.css"; // Estilizações da página
import Check from "./assets/Check.svg";
import { Link } from "react-router-dom";

export default function AddTaskPage() {
  const [task, setTask] = useState({
    descricao: "",
    prioridade: "medio", // Valor padrão inicial
    status: "pendente", // Valor padrão inicial
    nome_setor: "",
    id_user: "", // Inicialmente vazio
  });

  const [usuarios, setUsuarios] = useState([]); // Lista de usuários

  // Carrega os usuários quando o componente for montado
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/tarefas/api/usuarios/");
        const data = await response.json();
        setUsuarios(data); // Atualiza a lista de usuários
      } catch (error) {
        console.error("Erro ao carregar os usuários:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/tarefas/api/tarefas/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        alert("Tarefa adicionada com sucesso!");
        setTask({
          descricao: "",
          prioridade: "medio",
          status: "pendente",
          nome_setor: "",
          id_user: "",
        }); // Limpa o formulário
      } else {
        const errorData = await response.json();
        console.error("Erro ao adicionar tarefa:", errorData);
        alert("Erro ao adicionar tarefa.");
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      alert("Erro ao adicionar tarefa.");
    }
  };

  return (
    <div className="add-task-page">
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
      <h1>Adicionar Tarefa</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <label>
          Usuário:
          <select
            name="id_user"
            value={task.id_user}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id_user} value={usuario.nome}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </label>
        <label>
          Descrição:
          <textarea
            name="descricao"
            value={task.descricao}
            onChange={handleChange}
            placeholder="Descrição da tarefa"
            required
          ></textarea>
        </label>
        <label>
          Prioridade:
          <select
            name="prioridade"
            value={task.prioridade}
            onChange={handleChange}
            required
          >
            <option value="baixo">Baixa</option>
            <option value="medio">Média</option>
            <option value="alto">Alta</option>
          </select>
        </label>
        <label>
          Status:
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="pendente">Pendente</option>
            <option value="em_progresso">Em Progresso</option>
            <option value="concluida">Concluída</option>
          </select>
        </label>
        <label>
          Nome do Setor:
          <input
            type="text"
            name="nome_setor"
            value={task.nome_setor}
            onChange={handleChange}
            placeholder="Nome do setor"
            required
          />
        </label>
        <button type="submit">Adicionar Tarefa</button>
      </form>
    </div>
  );
}