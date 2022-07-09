import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from './styles';

function Home() {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    updateProcesses();
  }, []);

  async function updateProcesses() {
    const response = await axios.get('http://0.0.0.0:3333/processes');
    console.log(response);
    setProcesses(response.data.processes);
  }

  return (
    <Container>
      {processes.map((process, idx) => {
        return (
          <div key={idx}>
            {process.apelido} - {process.registro}
          </div>
        );
      })}
    </Container>
  );
}

export default Home;
