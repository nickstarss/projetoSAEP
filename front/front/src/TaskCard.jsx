import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./TaskCard.css"; // Arquivo de estilos
import Edit from "./assets/Edit.svg";
import Trash from "./assets/Trash.svg";
import Certo from "./assets/Certo.svg";

export default function TaskCard({
  id,
  descricao,
  prioridade,
  setor,
  vinculadoA,
  status: initialStatus,
  onTaskDeleted,
  onStatusChange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(initialStatus); // Gerencia o estado local do status
  const navigate = useNavigate(); // Hook para navegação

  // Abrir o modal
  const handleTrashClick = () => {
    setIsModalOpen(true);
  };

  // Fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Confirmar exclusão
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/tarefas/delete-task/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Tarefa deletada com sucesso!");
        onTaskDeleted(id); // Notifica o componente pai para remover a tarefa da lista
      } else {
        alert("Erro ao deletar a tarefa!");
      }
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    } finally {
      setIsModalOpen(false); // Fecha o modal
    }
  };

  // Atualizar o status da tarefa
  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/tarefas/api/tarefas/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        alert("Status atualizado com sucesso!");
        onStatusChange(id, status);
      } else {
        alert("Erro ao atualizar status!");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  // Navegar para a página de edição
  const handleEditClick = () => {
    navigate(`/edit-task/${id}`); // Redireciona para a página de edição com o ID da tarefa
  };

  return (
    <>
      <div className="task-card">
        <div>
          <div className="task-content">
            <p>
              <strong>Descrição:</strong> {descricao}
            </p>
            <p>
              <strong>Prioridade:</strong> {prioridade}
            </p>
            <p>
              <strong>Setor:</strong> {setor}
            </p>
            <p>
              <strong>Vinculado a:</strong> {vinculadoA}
            </p>
          </div>
          <div className="task-status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Atualiza o estado local
            >
              <option value="pendente">A fazer</option>
              <option value="em_progresso">Em andamento</option>
              <option value="concluida">Concluído</option>
            </select>
            <button
              className="confirm-button"
              onClick={handleStatusUpdate} // Chama a função para atualizar o status
            >
              <img src={Certo} alt="Confirmar" />
            </button>
          </div>
        </div>
        <div className="task-actions">
          <button className="icon-button" onClick={handleTrashClick}>
            <img src={Trash} alt="Excluir" />
          </button>
          <button className="icon-button2" onClick={handleEditClick}>
            <img src={Edit} alt="Editar" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Deseja excluir essa tarefa?</p>
            <div className="modal-actions">
              <button
                onClick={handleConfirmDelete}
                className="modal-confirm-button"
              >
                Sim
              </button>
              <button
                onClick={handleCloseModal}
                className="modal-cancel-button"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}