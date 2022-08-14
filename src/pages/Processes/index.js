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
import TextInput from 'components/TextInput';

function Processes() {
  const [processes, setProcesses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [registro, setRegistro] = useState('');
  const [apelido, setApelido] = useState('');
  const [processId, setProcessesId] = useState('');
  const [editOrCreate, setEditOrCreate] = useState('');

  const location = useLocation();
  const flow = location.state;

  const customStyles = {
    content: {
      top: '50%',
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
    setEditModalIsOpen(false);
  }

  function openEditModal(proc) {
    if (proc) {
      setEditOrCreate('edit');
      setRegistro(proc.registro);
      setApelido(proc.apelido);
      setProcessesId(proc._id);
    } else setEditOrCreate('create');

    console.log(editOrCreate);
    console.log(proc);
    setEditModalIsOpen(true);
  }

  async function editProcess() {
    await api.put(`/updateProcess/${processId}`, {
      registro: registro,
      apelido: apelido
    });
  }
  async function createProcess() {}

  return (
    <Container>
      <div className="processes">
        <h1>
          Processos do fluxo <strong>{flow.name}</strong>
        </h1>
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

              <EditIcon
                className="edit-process"
                onClick={() => openEditModal(proc)}
              />

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
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="editar processo"
        >
          <ModalHeader close={closeModal}>
            {editOrCreate == 'edit' ? 'Editar Processo' : 'Criar Processo'}
          </ModalHeader>
          <ModalBody>
            <p> Registro </p>
            <TextInput value={registro} set={setRegistro} />
            <p> Apelido</p>
            <TextInput value={apelido} set={setApelido} />
            <Button
              onClick={async () => {
                if (editOrCreate == 'edit') await editProcess();
                else createProcess();
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
      <a className="add-button">
        <AddIcon onClick={openEditModal}></AddIcon>
      </a>
    </Container>
  );
}

export default Processes;
