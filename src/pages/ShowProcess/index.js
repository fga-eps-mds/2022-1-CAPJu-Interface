import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from './styles';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

function ShowProcess() {
  const [process, setProcesses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const proc = location.state;
  console.log(proc);

  async function updateProcesses() {
    const response = await axios.get('http://localhost:3333/showProcess');
    console.log(response);
    setProcesses(response.data.process);
  }

  return (
    <>
      <Container>
        <h1>{proc.registro}</h1>
        <div className="process">
          {proc.registro} - {proc.apelido}
        </div>
      </Container>
    </>
  );
}

export default ShowProcess;
