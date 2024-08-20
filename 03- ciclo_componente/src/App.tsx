import { useEffect, useState } from "react";
import "./App.css";

function DivShow() {
  useEffect(() => {
    return () => console.log("Desmontou");
  });

  return (
    <div>
      <h1>Trilha React</h1>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    console.log("iniciou");
  }, []);

  useEffect(() => {
    console.log("alterou" + count);
  }, [count]);

  return (
    <>
      {count}
      <button onClick={() => setCount(count + 1)}>Incremento</button>

      {isShow && <DivShow />}
      <button onClick={() => setIsShow(!isShow)}>Mostrar</button>
    </>
  );
}

export default App;
