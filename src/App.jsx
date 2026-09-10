import { useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  function adicionarTarefa(e) {
    e.preventDefault();

    if (novaTarefa.trim() === "") return;

    setTarefas([
      ...tarefas,
      {
        id: Date.now(),
        texto: novaTarefa,
        concluida: false,
      },
    ]);

    setNovaTarefa("");
  }

  function concluirTarefa(id) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function removerTarefa(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Lista de Tarefas</h1>
        <p>Organize suas atividades de forma simples.</p>

        <form onSubmit={adicionarTarefa} className="formulario">
          <input
            type="text"
            placeholder="Digite uma nova tarefa..."
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
          />

          <button type="submit">Adicionar</button>
        </form>

        <div className="lista">
          {tarefas.length === 0 ? (
            <p className="vazio">Nenhuma tarefa adicionada.</p>
          ) : (
            tarefas.map((tarefa) => (
              <div
                key={tarefa.id}
                className={`tarefa ${tarefa.concluida ? "concluida" : ""}`}
              >
                <span onClick={() => concluirTarefa(tarefa.id)}>
                  {tarefa.texto}
                </span>

                <button onClick={() => removerTarefa(tarefa.id)}>
                  Remover
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;