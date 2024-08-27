import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useConsumer } from "../../context";

const ListConsumer: React.FC = () => {
  const { consumers, removeConsumer } = useConsumer();
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
    <div>
      <h1>Lista de Clientes</h1>
      <Link to="/cliente/">Clique aqui para adicionar um novo cliente</Link>

      <table>
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
                <button onClick={() => handleEdit(consumer.id!)}>Editar</button>
                <button onClick={() => handleRemove(consumer.id!)}>
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
