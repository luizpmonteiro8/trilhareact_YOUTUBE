import { useRef } from "react";

function FocusInput() {
  // Cria uma referência para o campo de entrada
  const inputRef1 = useRef<HTMLInputElement>(null);

  // Função para dar foco ao campo de entrada
  const handleFocus1 = () => {
    if (inputRef1.current) {
      inputRef1.current.focus();
    }
  };

  return (
    <div>
      <input
        ref={inputRef1} // Associa a referência ao campo de entrada
        type="text"
        placeholder="Clique no botão para focar aqui"
      />
      <button onClick={handleFocus1}>Focar no Input</button>
    </div>
  );
}

export default FocusInput;
