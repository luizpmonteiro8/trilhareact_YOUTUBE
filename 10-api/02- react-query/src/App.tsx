import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import "./App.css";

interface Contact {
  id: number;
  name: string;
  phone: string;
}

const fetchContacts = async () => {
  const response = await axios.get("http://localhost:3000/contacts");
  return response.data;
};

const addContact = async (newContact: Contact) => {
  const response = await axios.post(
    "http://localhost:3000/contacts",
    newContact
  );
  return response.data;
};

const deleteContact = async (id: number) => {
  await axios.delete(`http://localhost:3000/contacts/${id}`);
};

function App() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
    refetchInterval: 2000,
  });

  const mutationAdd = useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const handleAddContact = () => {
    mutationAdd.mutate({ name, phone } as Contact);
    setName("");
    setPhone("");
  };

  const handleDeleteContact = (id: number) => {
    mutationDelete.mutate(id);
  };

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h1>Gerenciamento de Contatos</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleAddContact} disabled={mutationAdd.isPending}>
          {mutationAdd.isPending ? "Enviando..." : "Adicionar"}
        </button>
      </div>
      <div className="list">
        {contacts.map((contact) => (
          <div key={contact.id} className="list-item">
            <span>
              {contact.name} - {contact.phone}
            </span>
            <button
              onClick={() => handleDeleteContact(contact.id)}
              disabled={mutationDelete.isPending}
            >
              {mutationDelete.isPending ? "Removendo..." : "Remover"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
