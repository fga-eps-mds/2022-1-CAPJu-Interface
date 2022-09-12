import React from 'react';
import { Container, ContainerMenu, UserIcon, ContainerTitle } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

function EditAccountEmail() {
  return (
    <Container>
      <ContainerTitle>
        <UserIcon />
        <h1>Editar Email</h1>
      </ContainerTitle>
      <ContainerMenu>
        <TextInput placeholder={'Email Atual'} />
        <TextInput placeholder={'Novo Email'} />
      </ContainerMenu>
      <Button>Salvar</Button>
    </Container>
  );
}

export default EditAccountEmail;
