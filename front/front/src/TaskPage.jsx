import React, { useState, useEffect } from "react";
import "./TaskPage.css"; // Adicione o CSS para estilizar os componentes
import { fetchTasks, updateTaskStatus } from "./api"; // Funções para conexão com o backend

const TaskPage = () => {
  const [tasks, setTasks] = useState({ ToDo: [], Doing: [], Done: [] });

  // Função para carregar as tarefas do backend
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks({
          ToDo: data.filter((task) => task.status === "ToDo"),
          Doing: data.filter((task) => task.status === "Doing"),
          Done: data.filter((task) => task.status === "Done"),
        });
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };
    loadTasks();
  }, []);

  // Função para alterar o status de uma tarefa
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks((prev) => {
        const updatedTasks = { ...prev };
        Object.keys(updatedTasks).forEach((key) => {
          updatedTasks[key] = updatedTasks[key].filter((task) => task.id !== taskId);
        });
        const updatedTask = { ...prev.ToDo.find((t) => t.id === taskId), status: newStatus };
        updatedTasks[newStatus].push(updatedTask);
        return updatedTasks;
      });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <div className="task-page">
      <header className="task-page-header">
        <div className="menu-icon">☰</div>
        <h1>Taskly</h1>
      </header>
      <main className="task-columns">
        {["ToDo", "Doing", "Done"].map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks[status]}
            onStatusChange={handleStatusChange}
          />
        ))}
      </main>
      <button className="add-task-button">+</button>
    </div>
  );
};

// Componente para cada coluna
const TaskColumn = ({ status, tasks, onStatusChange }) => (
  <div className="task-column">
    <h2>{status}</h2>
    {tasks.map((task) => (
      <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
    ))}
  </div>
);

// Componente para cada cartão de tarefa
const TaskCard = ({ task, onStatusChange }) => (
  <div className="task-card">
    <p><strong>Descrição:</strong> {task.description}</p>
    <p><strong>Prioridade:</strong> {task.priority}</p>
    <p><strong>Vinculado a:</strong> {task.user}</p>
    <div className="task-actions">
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
      >
        <option value="ToDo">A fazer</option>
        <option value="Doing">Fazendo</option>
        <option value="Done">Feito</option>
      </select>
      <button>🖉</button>
      <button>🗑</button>
    </div>
  </div>
);

export default TaskPage;