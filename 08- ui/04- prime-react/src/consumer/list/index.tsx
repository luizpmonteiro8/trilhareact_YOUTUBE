import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
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

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => handleEdit(rowData.id)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => handleRemove(rowData.id)}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <Link to="/cliente/" className="p-button p-component p-button-outlined">
        Clique aqui para adicionar um novo cliente
      </Link>

      <DataTable value={consumers} className="p-mt-4">
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Nome"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="telephone" header="Telefone"></Column>
        <Column
          field="knowReact"
          header="Sabe React"
          body={(rowData) => (rowData.knowReact ? "Sim" : "Não")}
        ></Column>
        <Column body={actionBodyTemplate} header="Ações"></Column>
      </DataTable>
    </div>
  );
};

export default ListConsumer;
