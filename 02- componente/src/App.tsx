import "./App.css";
import Table from "./table/table";

function App() {
  const items = [
    {
      name: "Produto 1",
      description: "Descrição do Produto 1",
      price: 100,
      quantity: 20,
    },
    {
      name: "Produto 2",
      description: "Descrição do Produto 2",
      price: 150,
      quantity: 15,
    },
    {
      name: "Produto 3",
      description: "Descrição do Produto 3",
      price: 200,
      quantity: 10,
    },
    {
      name: "Produto 4",
      description: "Descrição do Produto 4",
      price: 250,
      quantity: 5,
    },
  ];

  return (
    <>
      <Table items={items} />
    </>
  );
}

export default App;
