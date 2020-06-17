import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";
import Axios from "axios";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const repository = await api.post('/repositories', {
      "title": "Desafio ReactJS",
      "url": "https://github.com/aaaa",
      "techs": ["rseact", "javascript"]
    });
    await setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repositoryIndex = await repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);
    await setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(response => (
          <li key={response.id}>
            {response.title}
            <button onClick={() => handleRemoveRepository(response.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
