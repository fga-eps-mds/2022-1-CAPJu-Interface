import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, AddCircle, AddTrash, Processo } from './styles';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Home() {
  const [processes, setProcesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    updateProcesses();
  }, []);

  async function updateProcesses() {
    const response = await axios.get('http://localhost:3333/processes');
    console.log(response);
    setProcesses(response.data.processes);
  }

  return (
    <Container>
      <h1>Processos</h1>
      {processes.length == 0 && 'Nenhum processo foi encontrado'}
      {processes.map((process, idx) => {
        return (
          <Processo key={idx}>
            {process.registro} - {process.apelido}
            <AddTrash size={20}></AddTrash>
          </Processo>
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
