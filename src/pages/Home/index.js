import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from './styles';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [processos, setProcessos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    updateProcessos();
  }, []);

  async function updateProcessos() {
    const response = await axios.get('http://localhost:3333/processos');
    console.log(response);
    setProcessos(response.data.processos);
  }

  return (
    <Container>
      <Button
        onClick={() => {
          navigate('registrarProcesso');
        }}
      >
        Criar Processo
      </Button>
      {processos.length == 0 && 'Nenhum processo foi encontrado'}
      {processos.map((process, idx) => {
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
