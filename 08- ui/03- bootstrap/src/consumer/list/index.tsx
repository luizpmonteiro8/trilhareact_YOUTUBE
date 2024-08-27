import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useConsumerStore } from "../../context";

const ListConsumer: React.FC = () => {
  const consumers = useConsumerStore((state) => state.consumers);
  const removeConsumer = useConsumerStore((state) => state.removeConsumer);
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/cliente/${id}`);
  };

  const handleRemove = (id: number) => {
    if (window.confirm("Você tem certeza de quer remover esse cliente?")) {
      removeConsumer(id);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Clientes</h1>
      <Link to="/cliente/" className="btn btn-primary mb-3">
        Adicionar Novo Cliente
      </Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Sabe React</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consumers.map((consumer) => (
            <tr key={consumer.id}>
              <td>{consumer.id}</td>
              <td>{consumer.name}</td>
              <td>{consumer.email}</td>
              <td>{consumer.telephone}</td>
              <td>{consumer.knowReact ? "Sim" : "Não"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(consumer.id!)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(consumer.id!)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListConsumer;
