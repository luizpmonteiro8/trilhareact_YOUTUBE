import { ChangeEvent, useState } from "react";
import "./App.css";
import { CustomInput } from "./components/customInput";
import CustomPagination from "./components/customPagination";

function App() {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };

  const onSubmit = () => {
    console.log(name, date);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <CustomInput
          name="name"
          label="Nome"
          value={name}
          error={name.length < 7 ? "Nome deve ser maior que 7 caracteres" : ""}
          placeholder="Digite o nome"
          onChange={onChangeNameInput}
        />

        <CustomInput
          name="date"
          label="Data de nascimento"
          type="date"
          placeholder="Digite a data de nascimento"
          value={date?.toISOString().split("T")[0] ?? ""}
          onChange={onChangeDateInput}
        />

        <button type="submit">Enviar</button>
      </form>

      <CustomPagination
        currentPage={1}
        totalPages={10}
        onPageChange={() => {}}
      />
    </>
  );
}

export default App;
