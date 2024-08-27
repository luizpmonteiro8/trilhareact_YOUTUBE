import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState<
    {
      id: number;
      name: string;
      phone: string;
    }[]
  >([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axios.get("http://localhost:3000/contacts");
    setContacts(response.data);
  };

  const addContact = async () => {
    const response = await axios.post("http://localhost:3000/contacts", {
      name,
      phone,
    });
    setName("");
    setPhone("");
  };

  const deleteContact = async (id: number) => {
    await axios.delete(`http://localhost:3000/contacts/${id}`);
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="container">
      <h1>Gerenciamento de contatos</h1>
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
        <button onClick={addContact}>Adicionar</button>
      </div>
      <div className="list">
        {contacts.map((contact) => (
          <div key={contact.id} className="list-item">
            <span>
              {contact.name} - {contact.phone}
            </span>
            <button onClick={() => deleteContact(contact.id)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
