import React, { useState, useEffect } from "react";
import "./TaskPage.css";
import Check from "./assets/Check.svg";
import Plus from "./assets/Plus.svg";
import TaskCard from "./TaskCard";

export default function TaskPage() {
  const [tasks, setTasks] = useState({ toDo: [], doing: [], done: [] });
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla o modal
  const [newTask, setNewTask] = useState({
    descricao: "",
    prioridade: "Média",
    status: "pendente",
  });

  // Funções para abrir/fechar o modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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

  // Adicionar nova tarefa
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/tarefas/api/tarefas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setRefresh((prev) => !prev);
        handleCloseModal(); // Fecha o modal após adicionar
      } else {
        console.error("Erro ao adicionar tarefa:", response.status);
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  return (
    <>
      <div className="header">
        <div className="title">
          <img src={Check} alt="Check" />
          <h1>TASKLY</h1>
        </div>
      </div>

      <div className="main">
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

      <button Link to={"/add-user"}>Adicionar Usuário</button>
      <button>Adicionar Tarefa</button>

    </>
  );
}