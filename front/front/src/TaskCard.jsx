import React, { useState } from "react";
import "./TaskCard.css"; // Arquivo de estilos
import Edit from "./assets/Edit.svg";
import Trash from "./assets/Trash.svg";
import Certo from "./assets/Certo.svg";

export default function TaskCard({ descricao, prioridade, setor, vinculadoA, status }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTrashClick = () => {
    setIsModalOpen(true); // Abre o modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  const handleConfirmDelete = () => {
    console.log("Tarefa excluída!"); // Substitua com a lógica de exclusão
    setIsModalOpen(false); // Fecha o modal após confirmar
  };

  return (
    <>
      <div className="task-card">
        <div>
          <div className="task-content">
            <p>
              <strong>Descrição:</strong>
              {descricao}
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
            <select defaultValue={status}>
              <option value="A fazer">A fazer</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
            <button className="confirm-button">
              <img src={Certo} alt="Confirmar" />
            </button>
          </div>
        </div>
        <div className="task-actions">
          <button className="icon-button" onClick={handleTrashClick}>
            <img src={Trash} alt="Excluir" />
          </button>
          <button className="icon-button2">
            <img src={Edit} alt="Editar" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Deseja deletar essa tarefa?</p>
            <div className="modal-actions">
              <button onClick={handleConfirmDelete} className="modal-confirm-button">
                Sim
              </button>
              <button onClick={handleCloseModal} className="modal-cancel-button">
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}