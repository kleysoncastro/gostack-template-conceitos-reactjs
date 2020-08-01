import React, {useEffect, useState} from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

useEffect(()=>{
  api.get('repositories').then(res =>{
    setRepositories(res.data)
  })
},[])

  async function handleAddRepository() {
    
    const tech = {
      title: "github",
      url: "https://github.com/kleysoncastro/gostack-template-conceitos-nodejs",
      techs: "markdonw"
    }

    const response = await api.post('repositories', tech)

    setRepositories([...repositories, response.data])

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

     setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(project =>(

  <li key={project.id} id="idStyle" >
    
    {project.title}
    <button onClick={() => handleRemoveRepository(project.id)}>
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
