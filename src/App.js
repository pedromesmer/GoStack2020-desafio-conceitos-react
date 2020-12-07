import React, {useState, useEffect} from "react";

import "./styles.css";
import api from  './services/api'

function App() {
  /**
      Listar os repositórios da sua API: 
      Deve ser capaz de criar uma lista com o campo title de todos os repositórios que estão cadastrados na sua API. 

      Adicionar um repositório a sua API: 
      Deve ser capaz de adicionar um novo item na sua API através de um botão com o texto Adicionar e, após a criação, deve ser capaz de exibir o nome dele após o cadastro.

    Remover um repositório da sua API: 
    Para cada item da sua lista, deve possuir um botão com o texto Remover que, ao clicar, irá chamar uma função para remover esse item da lista do seu frontend e da sua API.
  */

  const [repositories, setRepositories] = useState([])

  // executado uma vez, ao abrir a página
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: Date.now() , 
      techs: ["Node", "Express", "TypeScript"],
      url: "https://github.com/Rocketseat/umbriel"
    })
    const repo = response.data
    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`)

    // const response = await api.get('repositories')
    setRepositories(repositories.filter(
      repo => repo.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ) ) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
