import React, { useState, useEffect } from "react";
import "./TaskPage.css";
import Menu from "./assets/Menu.svg";
import Check from "./assets/Check.svg";
import Plus from "./assets/Plus.svg";
import x from "./assets/X.svg";
import TaskCard from "./TaskCard";

export default function TaskPage() {
  const [tasks, setTasks] = useState({ toDo: [], doing: [], done: [] });


  // Função para buscar os dados do backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/tarefas/api/tarefas/");
      const data = await response.json();
        setTasks({
          toDo: data.filter((task) => task.status === "pendente"),
          doing: data.filter((task) => task.status === "em_progresso"),
          done: data.filter((task) => task.status === "concluida")
        });
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  console.log(tasks)



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
                key={task.id}
                descricao={task.descricao}
                prioridade={task.prioridade}
                setor={task.nome_setor}
                vinculadoA={task.vinculadoA}
                status={task.status}
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
                key={task.id}
                descricao={task.descricao}
                prioridade={task.prioridade}
                setor={task.nome_setor}
                vinculadoA={task.vinculadoA}
                status={task.status}
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
                key={task.id}
                descricao={task.descricao}
                prioridade={task.prioridade}
                setor={task.nome_setor}
                vinculadoA={task.id_user}
                status={task.status}
              />
            ))
          )}
        </div>
      </div>

      <img src={Plus} alt="Add Task" className="adicionar" />
    </>
  );
}