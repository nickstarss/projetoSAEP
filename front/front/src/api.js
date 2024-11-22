const API_URL = "http://localhost:8000"; // Ajuste para o endereço do backend

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks/`);
  if (!response.ok) {
    throw new Error("Erro ao buscar tarefas");
  }
  return response.json();
};

export const updateTaskStatus = async (taskId, newStatus) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar tarefa");
  }
};