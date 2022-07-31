import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container } from './styles';
import Button from '../../components/Button';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import React from 'react';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function ShowProcess() {
  const [process, setProcesses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const proc = location.state;
  console.log(proc);

  async function updateProcesses() {
    const response = await api.get('/showProcess');
    console.log(response);
    setProcesses(response.data.process);
  }

  return (
    <>
      <Container>
        <div className='processInfo'>
          <h1>{proc.apelido.length > 0 ? proc.apelido : `Processo ${proc.registro}`}</h1>
          <div className="process">
          {proc.apelido.length > 0 ? `${proc.registro} - ${proc.apelido}` : `${proc.registro}`}
          </div>
        </div>
        <Link to="">
          <SkipNextIcon/><span>Avançar etapa</span>
        </Link>
      </Container>
    </>
  );
}

export default ShowProcess;
