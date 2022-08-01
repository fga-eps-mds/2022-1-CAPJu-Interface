import { useEffect, useState } from 'react';
import { Container } from './styles';
import { Link } from 'react-router-dom';
import React from 'react';
import api from '../../services/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import Visibility from '@styled-icons/material/Visibility';

function Processes() {
  const [processes, setProcesses] = useState([]);

  const flow = location.state;

  useEffect(() => {
    updateProcesses();
  }, []);

  async function updateProcesses() {
    const response = await api.get('/processes');
    console.log(flow);
    setProcesses(response.data.processes);
  }

  return (
    <Container>
      <div className="processes">
        <h1>Processos</h1>
        {processes.length == 0 && 'Nenhum processo foi encontrado'}
        {processes.map((proc, idx) => {
          return (
            <div key={idx} className="process">
              {proc.apelido.length > 0
                ? `${proc.registro} - ${proc.apelido}`
                : `${proc.registro}`}
              {
                <Link to="showProcess" state={proc}>
                  <Visibility className="see-process"></Visibility>
                </Link>
              }
              {
                <Link to="editProcess" state={proc}>
                  <EditIcon className="edit-process"></EditIcon>
                </Link>
              }
              {
                <Link to="deleteProcess" state={proc}>
                  <DeleteForeverIcon className="delete-process"></DeleteForeverIcon>
                </Link>
              }
            </div>
          );
        })}
      </div>
      <Link to="registerProcess" state={flow} className="add-button">
        <AddIcon></AddIcon>
      </Link>
    </Container>
  );
}

export default Processes;
