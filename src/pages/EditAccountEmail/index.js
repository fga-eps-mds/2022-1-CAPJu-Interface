import React from 'react';
import { Container, ContainerMenu, UserIcon } from './styles';
import TextInput from '../../components/TextInput';

function EditAccountEmail() {
  return (
    <>
      <Container>
        <ContainerMenu>
          <UserIcon />
          <span>Editar&nbsp;Conta</span>
        </ContainerMenu>
        <ContainerMenu>
          <TextInput placeholder={'Email'} />
        </ContainerMenu>
      </Container>
    </>
  );
}

export default EditAccountEmail;
