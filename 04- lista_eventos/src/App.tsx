import "./App.css";

function App() {
  const nameList = ["John", "Jane", "Joe"];

  return (
    <>
      <div onMouseLeave={() => alert("mouse saiu da lista")}>
        {nameList.map((name) => (
          <div key={name}>
            <h1 onClick={() => alert(name)}>{name}</h1>
          </div>
        ))}
      </div>

      {/*  {nameList.map((name) => (
        <div onMouseEnter={() => alert("mouse entrou na área")} key={name}>
          <h1 onClick={() => alert(name)}>{name}</h1>
        </div>
      ))} */}

      {/* {nameList.map((name) => {
        const total = 10;
        return (
          <h1>
            {name}
            {total}
          </h1>
        );
      })} */}
    </>
  );
}

export default App;
