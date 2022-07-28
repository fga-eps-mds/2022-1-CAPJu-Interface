import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from './styles';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

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
      <Button
        onClick={() => {
          navigate('registerProcess');
        }}
      >
        Criar Processo
      </Button>
      {processes.length == 0 && 'Nenhum processo foi encontrado'}
      {processes.map((process, idx) => {
        return (
          <div key={idx}>
            {process.registro} - {process.apelido}
          </div>
        );
      })}
    </Container>
  );
}

export default Home;
