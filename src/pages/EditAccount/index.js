import React from 'react';
import { Container, ContainerMenu, UserIcon } from './styles';
import Button from '../../components/Button';

function EditAccount() {
  return (
    <>
      <Container>
        <ContainerMenu>
          <UserIcon />
          <span>Editar Conta</span>
        </ContainerMenu>
        <ContainerMenu>
          <Button>
            <span>Email</span>
          </Button>
          <Button>
            <span>Senha</span>
          </Button>
        </ContainerMenu>
      </Container>
    </>
  );
}

export default EditAccount;
