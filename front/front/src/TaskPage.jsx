import React, { useState, useEffect } from "react";
import "./TaskPage.css";
import Check from "./assets/Check.svg";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";

export default function TaskPage() {
  const [tasks, setTasks] = useState({ toDo: [], doing: [], done: [] });
  const [refresh, setRefresh] = useState(false);

  // Atualizar tarefas após deletar
  const handleTaskDeleted = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tarefas/api/tarefas/${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRefresh((prev) => !prev);
      } else {
        console.error("Erro ao deletar a tarefa:", response.status);
      }
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };

  // Buscar tarefas
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/tarefas/api/tarefas/");
        const data = await response.json();
        setTasks({
          toDo: data.filter((task) => task.status === "pendente"),
          doing: data.filter((task) => task.status === "em_progresso"),
          done: data.filter((task) => task.status === "concluida"),
        });
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, [refresh]);

  return (
    <>
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

      <div className="main">
        {/* ToDo Tasks */}
        <div className="toDo">
          <h1>ToDo</h1>
          {tasks.toDo.length === 0 ? (
            <p>Nenhuma tarefa pendente.</p>
          ) : (
            tasks.toDo.map((task) => (
              <TaskCard
                key={task.id_tarefa}
                id={task.id_tarefa}
                descricao={task.descricao}
                prioridade={task.prioridade}
                setor={task.nome_setor}
                vinculadoA={task.id_user}
                status={task.status}
                onTaskDeleted={handleTaskDeleted}
              />
            ))
          )}
        </div>

        {/* Doing Tasks */}
        <div className="Doing">
          <h1>Doing</h1>
          {tasks.doing.length === 0 ? (
            <p>Nenhuma tarefa em andamento.</p>
          ) : (
            tasks.doing.map((task) => (
              <TaskCard
                key={task.id_tarefa}
                id={task.id_tarefa}
                descricao={task.descricao}
                prioridade={task.prioridade}
                setor={task.nome_setor}
                vinculadoA={task.id_user}
                status={task.status}
                onTaskDeleted={handleTaskDeleted}
              />
            ))
          )}
        </div>

        {/* Done Tasks */}
        <div className="Done">
          <h1>Done</h1>
          {tasks.done.length === 0 ? (
            <p>Nenhuma tarefa concluída.</p>
          ) : (
            tasks.done.map((task) => (
              <TaskCard
                key={task.id_tarefa}
                id={task.id_tarefa}
                descricao={task.descricao}
                prioridade={task.prioridade}
                setor={task.nome_setor}
                vinculadoA={task.id_user}
                status={task.status}
                onTaskDeleted={handleTaskDeleted}
              />
            ))
          )}
        </div>
      </div>

      <div className="buttons-add">
        <Link to="/adicionarUser">Adicionar usuário</Link>
        <Link to="/adicionarTarefa">Adicionar tarefa</Link>
      </div>
    </>
  );
}