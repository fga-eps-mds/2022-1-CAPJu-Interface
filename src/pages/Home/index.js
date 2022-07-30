import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from './styles';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
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
      <Button
        onClick={() => {
          navigate('registerProcess');
        }}
      >
        Criar Processo
      </Button>
      {processes.length == 0 && 'Nenhum processo foi encontrado'}
      {processes.map((proc, idx) => {
        return (
          <div key={idx}>
            {proc.registro} - {proc.apelido} -{' '}
            {
              <Link to="showProcess" state={proc}>
                Detalhar
              </Link>
            }
          </div>
        );
      })}
    </Container>
  );
}

export default Home;