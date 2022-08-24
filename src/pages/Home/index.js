import { useEffect, useState } from 'react';
import authConfig from '../../services/config.js';
import { Container, AddCircle, AddTrash, AddProcesso } from './styles';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import api from '../../services/api';

function Home() {
  const [processes, setProcesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    updateProcesses();
  }, []);

  async function updateProcesses() {
    const config = authConfig();
    const response = await api.get('/processes', config);
    console.log(response);
    setProcesses(response.data.processes);
  }

  async function deleteProcess(registro) {
    const config = authConfig();
    await api.delete(`/deleteProcess/${registro}`, config);
  }

  return (
    <Container>
      <h1>Processos</h1>
      {processes.length == 0 && 'Nenhum processo foi encontrado'}
      {processes.map((process, idx) => {
        return (
          <AddProcesso key={idx}>
            {process.registro} - {process.apelido}
            <AddTrash
              size={20}
              onClick={async () => {
                await deleteProcess(process.registro);
                await updateProcesses();
              }}
            ></AddTrash>
          </AddProcesso>
        );
      })}
      <AddCircle
        size={44}
        onClick={() => {
          navigate('registerProcess');
        }}
      ></AddCircle>
    </Container>
  );
}

export default Home;
