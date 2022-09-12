import React from 'react';
import { Container, ContainerMenu, UserIcon, ContainerTitle } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

function EditAccountPassword() {
  return (
    <Container>
      <ContainerTitle>
        <UserIcon />
        <h1>Editar Senha</h1>
      </ContainerTitle>
      <ContainerMenu>
        <TextInput placeholder={'Senha Atual'} />
        <TextInput placeholder={'Nova Senha'} />
        <TextInput placeholder={'Confirmar Senha'} />
      </ContainerMenu>
      <Button>Salvar</Button>
    </Container>
  );
}

export default EditAccountPassword;
