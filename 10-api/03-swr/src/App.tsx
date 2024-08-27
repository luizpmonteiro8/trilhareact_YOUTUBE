import axios from "axios";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import "./App.css";

interface Contact {
  id: number;
  name: string;
  phone: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const {
    data: contacts = [],
    error,
    //mutate,
    isLoading,
  } = useSWR<Contact[]>("http://localhost:3000/contacts", fetcher, {
    refreshInterval: 2000,
  });

  const handleAddContact = async () => {
    await axios.post("http://localhost:3000/contacts", { name, phone });
    mutate("http://localhost:3000/contacts");
    setName("");
    setPhone("");
  };

  const handleDeleteContact = async (id: number) => {
    await axios.delete(`http://localhost:3000/contacts/${id}`);
    mutate("http://localhost:3000/contacts");
  };

  if (error) return <p>Erro ao carregar os contatos.</p>;
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
        <button onClick={handleAddContact}>Adicionar</button>
      </div>
      <div className="list">
        {contacts.map((contact) => (
          <div key={contact.id} className="list-item">
            <span>
              {contact.name} - {contact.phone}
            </span>
            <button onClick={() => handleDeleteContact(contact.id)}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
