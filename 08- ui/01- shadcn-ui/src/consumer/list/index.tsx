import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Clientes</h1>
        <Link to="/cliente/">
          <Button className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Cliente
          </Button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-center">Sabe React</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consumers.map((consumer) => (
              <TableRow key={consumer.id}>
                <TableCell className="font-medium">{consumer.id}</TableCell>
                <TableCell>{consumer.name}</TableCell>
                <TableCell>{consumer.email}</TableCell>
                <TableCell>{consumer.telephone}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      consumer.knowReact
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {consumer.knowReact ? "Sim" : "Não"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(consumer.id!)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(consumer.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListConsumer;
