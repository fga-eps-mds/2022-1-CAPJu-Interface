import React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Container,
  AddFlowButton,
  FlowsArea,
  FlowItem,
  Modal,
  Content,
  SelectorWrapper,
  StageName,
  SequencesWrapper,
  SequenceItem,
  ContentHeader,
  ModalDelete,
  ContentDelete,
  CloseModalDelete,
  FlowsButtons,
  CloseModalGeneral
} from './styles';
import { Link } from 'react-router-dom';

function EditAccountPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function getName() {
    const response = await api.get('/flows');
    setName(response.data.Flows);
  }

  async function getEmail() {
    const response = await api.get('/flows');
    setEmail(response.data.Flows);
  }

  async function getPassword() {
    const response = await api.get('/flows');
    setPassword(response.data.Flows);
  }

  return (
    <>
      <Container>
        <span>Editar Conta</span>
      </Container>
    </>
  );
}

export default EditAccountPage;
