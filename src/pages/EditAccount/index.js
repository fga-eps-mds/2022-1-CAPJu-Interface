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
  return (
    <>
      <Container>
        <span>Editar Conta</span>
      </Container>
    </>
  );
}

export default EditAccountPage;
