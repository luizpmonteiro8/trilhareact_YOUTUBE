import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
    <div style={{ padding: "20px" }}>
      <Typography variant="h1" gutterBottom>
        Lista de Clientes
      </Typography>
      <Button
        component={Link}
        to="/cliente/"
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Adicionar Novo Cliente
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Sabe React</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consumers.map((consumer) => (
              <TableRow key={consumer.id}>
                <TableCell>{consumer.id}</TableCell>
                <TableCell>{consumer.name}</TableCell>
                <TableCell>{consumer.email}</TableCell>
                <TableCell>{consumer.telephone}</TableCell>
                <TableCell>{consumer.knowReact ? "Sim" : "Não"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(consumer.id!)}
                    style={{ margin: "10px" }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemove(consumer.id!)}
                  >
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListConsumer;
