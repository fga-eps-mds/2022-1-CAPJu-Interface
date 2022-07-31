import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../components/Button';
import {
  Container,
  AddCircle,
  AddTrash,
  AddProcesso,
  PencilButton
} from './styles';
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

  async function deleteProcess(registro) {
    await axios.delete(`http://localhost:3333/deleteProcess/${registro}`);
  }

  return (
    <Container>
      <h1>Processos</h1>
      {processes.length == 0 && 'Nenhum processo foi encontrado'}
      {processes.map((process, idx) => {
        return (
          <AddProcesso key={idx}>
            {process.registro} - {process.apelido}
            <PencilButton onClick={() => {}} />
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
