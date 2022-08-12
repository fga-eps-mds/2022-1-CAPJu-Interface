import { useEffect, useState } from 'react';
import { Container } from './styles';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import api from '../../services/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import Visibility from '@mui/icons-material/Visibility';
import Modal from 'react-modal';
import Button from 'components/Button';
import ModalHeader from 'components/ModalHeader';
import ModalBody from 'components/ModalBody';

function Processes() {
  const [processes, setProcesses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();
  const flow = location.state;

  const customStyles = {
    content: {
      top: '30%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '10px'
    }
  };

  useEffect(() => {
    updateProcesses();
    // eslint-disable-next-line
  }, []);

  async function updateProcesses() {
    const response = await api.get(`/processes/${flow._id}`);
    console.log(flow);
    setProcesses(response.data.processes);
  }

  async function deleteProcess(registro) {
    await api.delete(`/deleteProcess/${registro}`);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
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

              <DeleteForeverIcon
                className="delete-process"
                onClick={() => openModal()}
              />
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="excluir processo"
              >
                <ModalHeader close={closeModal}>Excluir Processo</ModalHeader>
                <p>
                  Tem certeza que deseja excluir o processo {proc.registro}?
                </p>
                <ModalBody>
                  <Button
                    onClick={async () => {
                      await deleteProcess(proc.registro);
                      await updateProcesses();
                      closeModal();
                    }}
                  >
                    Confirmar
                  </Button>
                  <Button onClick={closeModal} background="red">
                    Cancelar
                  </Button>
                </ModalBody>
              </Modal>
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
